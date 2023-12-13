import {
  Badge,
  Breadcrumb,
  Button,
  Modal,
  Pagination,
  Table,
  Typography,
} from "antd";
import { memo, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "redux/store";
import { useNavigate } from "react-router-dom";
import { TopPaths } from "features/admin_top/admin_top";
import { RequestParams } from "types/param.types";
import { RootState } from "redux/root-reducer";
import { HomeOutlined } from "@ant-design/icons";
import {
  COLUMNS_TABLE_SPENDINGS,
  SpendingStatusType,
  acceptOrRejectSpending,
  getSpendings,
} from "features/admin_spending/admin_spending";
import { UserPaths } from "features/admin_users/admin_users";
import { numberWithCommas } from "helpers/utils.helper";
import DropdownButton from "components/DropdownButton/DropdownButton";
import { unwrapResult } from "@reduxjs/toolkit";

const SpendingScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const pageSize = 20;
  const [spendingStatusFilter, setSpendingStatusFilter] = useState<SpendingStatusType>();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [triggerReload, setTriggerReload] = useState<boolean>(false);
  const [isAccept, setIsAccept] = useState<boolean>(false);
  const [spendingIdSelected, setSpendingIdSelected] = useState<number | null>(null);
  const [spendingStatusSelected, setSpendingStatusSelected] =
    useState<SpendingStatusType | null>(null);

  const {
    spending: { spendings },
  } = useAppSelector((state: RootState) => state);

  const spendingList = useMemo(() => {
    return spendings?.data?.map((spending, index) => ({
      ...spending,
      index: index + 1,
      author: (
        <div
          className="cursor-pointer"
          onClick={() => navigate(UserPaths.GET_STAFF(spending.staffId))}
        >
          {spending.author}
        </div>
      ),
      budget: `${numberWithCommas(spending.budget)} VNĐ`,
      status:
        spending.status === SpendingStatusType.Approval ? (
          <Badge status="success" text="Approval" />
        ) : spending.status === SpendingStatusType.Reject ? (
          <Badge status="error" text="Reject" />
        ) : (
          <Badge status="processing" text="Pending" />
        ),
      action:
        spending.status === SpendingStatusType.Pending ? (
          <div>
            <Button
              type="primary"
              className="mr-10"
              onClick={() => {
                setSpendingIdSelected(Number(spending.id));
                setSpendingStatusSelected(SpendingStatusType.Approval);
                setIsAccept(true)}}
            >
              Accept
            </Button>
            <Button type="primary" danger onClick={() => {
                setSpendingIdSelected(Number(spending.id));
                setSpendingStatusSelected(SpendingStatusType.Reject);
                setIsAccept(false)}}>
              Reject
            </Button>
          </div>
        ) : (
          ""
        ),
    }));
  }, [spendings?.data, navigate]);

  useEffect(() => {
    const params: RequestParams = {
      page,
      pageSize,
      spendingStatus: spendingStatusFilter,
    };
    setIsLoading(true);
    dispatch(getSpendings(params))
      .unwrap()
      .finally(() => setIsLoading(false));
  }, [dispatch, page, pageSize, spendingStatusFilter, triggerReload]);

  const handleAcceptOrReject = () => {
    if (spendingIdSelected === null || spendingStatusSelected === null) return;
    setIsSubmitting(true);
    setIsLoading(true);
    dispatch(
      acceptOrRejectSpending({
        id: spendingIdSelected,
        status: spendingStatusSelected,
      })
    )
      .then(unwrapResult)
      .then(() => {
        setTriggerReload(!triggerReload);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsSubmitting(false);
        setIsLoading(false);
        setSpendingIdSelected(null);
        setSpendingStatusSelected(null);
      });
  }

  return (
    <>
      <div className="pt-30 pl-55 pr-20">
        <Breadcrumb className="pb-20 font-18">
          <Breadcrumb.Item
            className="cursor-pointer"
            onClick={() => navigate(TopPaths.TOP())}
          >
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item>Spendings</Breadcrumb.Item>
        </Breadcrumb>
        <div className="flex-space-between-center">
          <Typography>
            Total: There are {spendings?.totalRecords} spendings
          </Typography>
          <DropdownButton
            menuProps={{
              items: [
                {
                  key: "1",
                  label: "Pending",
                  onClick: () => {
                    setSpendingStatusFilter(SpendingStatusType.Pending);
                  },
                },
                {
                  key: "2",
                  label: "Approval",
                  onClick: () => {
                    setSpendingStatusFilter(SpendingStatusType.Approval);
                  },
                },
                {
                  key: "3",
                  label: "Reject",
                  onClick: () => {
                    setSpendingStatusFilter(SpendingStatusType.Reject);
                  },
                },
                {
                  key: "4",
                  label: "All status",
                  onClick: () => {
                    setSpendingStatusFilter(undefined);
                  },
                },
              ],
            }}
          >
            Status filter
          </DropdownButton>
        </div>
        <Table
          bordered
          rowKey="id"
          size="small"
          loading={isLoading}
          columns={COLUMNS_TABLE_SPENDINGS()}
          dataSource={spendingList}
          pagination={false}
          className="mt-20"
          scroll={{ y: 320, x: 400 }}
        />
        <Pagination
          className="flex-justify-center mt-20"
          current={spendings?.pageNumber}
          onChange={(newPage) => setPage(newPage)}
          total={Number(spendings?.totalPages) * 10}
        />
        <Modal
          centered
          title={
            isAccept
              ? "Are you sure you want to accept this spending?"
              : "Are you sure you want to reject this spending?"
          }
          open={!!spendingIdSelected}
          onCancel={() => {
            setSpendingIdSelected(null);
            setSpendingStatusSelected(null);
          }}
          onOk={handleAcceptOrReject}
          okButtonProps={{
            disabled: isSubmitting,
          }}
        />
      </div>
    </>
  );
};

export default memo(SpendingScreen);
