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
import { TopPaths } from "features/staff_top/staff_top";
import { RequestParams } from "types/param.types";
import { RootState } from "redux/root-reducer";
import { HomeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  COLUMNS_TABLE_SPENDINGS,
  FinancePaths,
  SpendingStatusType,
  deleteSpending,
  getSpendings,
} from "features/staff_finance/staff_finance";
import { UserPaths } from "features/staff_users/staff_users";
import { numberWithCommas } from "helpers/utils.helper";
import DropdownButton from "components/DropdownButton/DropdownButton";
import { unwrapResult } from "@reduxjs/toolkit";

const SpendingScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const pageSize = 20;
  const [spendingStatusFilter, setSpendingStatusFilter] =
    useState<SpendingStatusType | null>(null);
  const [spendingSelected, setSpendingSelected] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [triggerReload, setTriggerReload] = useState<boolean>(false);

  const {
    finance: { spendings },
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
        spending.status === SpendingStatusType.Pending && spending.staffId === Number(userId) ? (
          <DropdownButton
            menuProps={{
              items: [
                {
                  key: "1",
                  label: (
                    <div>
                      <Typography>
                        <span>
                          <EditOutlined />
                        </span>{" "}
                        Edit
                      </Typography>
                    </div>
                  ),
                  onClick: () =>
                    navigate(FinancePaths.EDIT_SPENDING(Number(spending.id))),
                },
                {
                  key: "2",
                  label: (
                    <>
                      <Typography>
                        <span>
                          <DeleteOutlined />
                        </span>{" "}
                        Delete
                      </Typography>
                    </>
                  ),
                  onClick: () => {
                    setSpendingSelected(Number(spending.id));
                  },
                },
              ],
            }}
          >
            Action
          </DropdownButton>
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

  const handleDeleteSpending = () => {
    if (!spendingSelected) return;
    setIsSubmitting(true);
    setIsLoading(true);
    dispatch(deleteSpending(spendingSelected))
      .then(unwrapResult)
      .then(() => {
        setTriggerReload(!triggerReload);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsSubmitting(false);
        setIsLoading(false);
        setSpendingSelected(null);
      });
  };

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
          <Breadcrumb.Item
            className="cursor-pointer"
            onClick={() => navigate(FinancePaths.FINANCE())}
          >
            Finance
          </Breadcrumb.Item>
          <Breadcrumb.Item>Spendings</Breadcrumb.Item>
        </Breadcrumb>
        <div className="flex-space-between-center">
          <Typography>
            Total: There are {spendings?.totalRecords} spendings
          </Typography>
          <div className="flex">
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
                      setSpendingStatusFilter(null);
                    },
                  },
                ],
              }}
            >
              Status filter
            </DropdownButton>
            <Button
              type="primary"
              style={{ height: 38, marginLeft: 20 }}
              onClick={() => navigate(FinancePaths.CREATE_SPENDING())}
            >
              New Spending
            </Button>
          </div>
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
      </div>
      <Modal
        centered
        title="Are you sure you want to delete this spending?"
        open={!!spendingSelected}
        cancelText="Cancel"
        okText="Delete"
        okType="danger"
        onCancel={() => setSpendingSelected(null)}
        onOk={handleDeleteSpending}
        okButtonProps={{
          disabled: isSubmitting,
        }}
      />
    </>
  );
};

export default memo(SpendingScreen);
