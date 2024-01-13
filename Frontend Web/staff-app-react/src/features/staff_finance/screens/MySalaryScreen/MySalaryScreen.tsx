import { Badge, Breadcrumb, Pagination, Table, Typography } from "antd";
import { memo, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "redux/store";
import { RequestParams } from "types/param.types";
import { RootState } from "redux/root-reducer";
import { HomeOutlined } from "@ant-design/icons";
import DropdownButton from "components/DropdownButton/DropdownButton";
import { getTimeUTC, numberWithCommas } from "helpers/utils.helper";
import { COLUMNS_TABLE_SALARY, FinancePaths, getMySalary } from "features/staff_finance/staff_finance";
import { useNavigate } from "react-router-dom";

const MySalaryScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const pageSize = 20;
  const [salaryStatusFilter, setSalaryStatusFilter] = useState<boolean | null>(
    null
  );

  const {
    finance: { salary },
  } = useAppSelector((state: RootState) => state);

  const salaryList = useMemo(() => {
    return salary?.data?.map((item, index) => ({
      ...item,
      index: index + 1,
      createOn: getTimeUTC(item.createOn),
      bonus: `${numberWithCommas(item.bonus)} VNĐ`,
      total: `${numberWithCommas(item.total)} VNĐ`,
      isPaid:
        item.isPaid === true ? (
          <Badge status="success" text="Paid" />
        ) : (
          <Badge status="error" text="Not Paid" />
        ),
    }));
  }, [salary?.data]);

  useEffect(() => {
    const params: RequestParams = {
      page,
      pageSize,
      isPaid: salaryStatusFilter,
    };
    setIsLoading(true);
    dispatch(getMySalary(params))
      .unwrap()
      .finally(() => setIsLoading(false));
  }, [dispatch, page, pageSize, salaryStatusFilter]);

  return (
    <>
      <div className="pt-20 pl-55 pr-20">
        <Breadcrumb className="pb-20 font-18">
          <Breadcrumb.Item>
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item
            className="cursor-pointer"
            onClick={() => navigate(FinancePaths.FINANCE())}
          >
            Finance
          </Breadcrumb.Item>
          <Breadcrumb.Item>Salary</Breadcrumb.Item>
        </Breadcrumb>
        <div className="flex-space-between-center">
          <Typography>Total: {salary?.totalRecords}</Typography>
          <div className="flex">
            <DropdownButton
              menuProps={{
                items: [
                  {
                    key: "1",
                    label: "Paid",
                    onClick: () => {
                      setSalaryStatusFilter(true);
                    },
                  },
                  {
                    key: "2",
                    label: "Not Paid",
                    onClick: () => {
                      setSalaryStatusFilter(false);
                    },
                  },
                  {
                    key: "3",
                    label: "All status",
                    onClick: () => {
                      setSalaryStatusFilter(null);
                    },
                  },
                ],
              }}
            >
              Status filter
            </DropdownButton>
          </div>
        </div>
        <Table
          bordered
          rowKey="id"
          size="small"
          loading={isLoading}
          columns={COLUMNS_TABLE_SALARY()}
          dataSource={salaryList}
          pagination={false}
          className="mt-20"
          scroll={{ y: 320, x: 400 }}
        />
        <Pagination
          className="flex-justify-center mt-20"
          current={salary?.pageNumber}
          onChange={(newPage) => setPage(newPage)}
          total={Number(salary?.totalPages) * 10}
        />
      </div>
    </>
  );
};

export default memo(MySalaryScreen);
