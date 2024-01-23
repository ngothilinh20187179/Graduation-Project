import { Badge, Breadcrumb, Button, Modal, Pagination, Table, Typography } from "antd";
import { memo, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "redux/store";
import { RequestParams } from "types/param.types";
import { RootState } from "redux/root-reducer";
import { HomeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import DropdownButton from "components/DropdownButton/DropdownButton";
import { numberWithCommas } from "helpers/utils.helper";
import {
  COLUMNS_TABLE_STAFF_SALARY,
  FinancePaths,
  deleteStaffSalary,
  getAllStaffSalaries,
} from "features/staff_finance/staff_finance";
import { useNavigate } from "react-router-dom";
import { StaffSalary } from "features/staff_finance/types/finance.types";
import { unwrapResult } from "@reduxjs/toolkit";

const StaffSalaryScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const pageSize = 20;
  const [salaryStatusFilter, setSalaryStatusFilter] = useState<boolean | null>(
    null
  );
  const [staffSalarySelected, setStaffSalarySelected] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [triggerReload, setTriggerReload] = useState<boolean>(false);

  const {
    finance: { staffSalaries },
  } = useAppSelector((state: RootState) => state);

  const salaryList = useMemo(() => {
    return staffSalaries?.data?.map((item: StaffSalary, index) => ({
      ...item,
      index: index + 1,
      staffName: `Id: ${item.staffId} - ${item.staffName}`,
      totalDaysWorked: `${item.totalDaysWorked} / ${item.workDaysInMonth} days`,
    //   createOn: getTimeUTC(item.createOn),
      bonus: `${numberWithCommas(item.bonus)} VNĐ`,
      total: `${numberWithCommas(item.total)} VNĐ`,
      isPaid:
        item.isPaid === true ? (
          <Badge status="success" text="Paid" />
        ) : (
          <Badge status="error" text="Not Paid" />
        ),
      action: (
        <DropdownButton
          menuProps={{
            items: [
              {
                key: "1",
                label: (
                  <>
                    <Typography>
                      <span>
                        <EditOutlined />
                      </span>{" "}
                      Edit
                    </Typography>
                  </>
                ),
                onClick: () => navigate(FinancePaths.EDIT_STAFF_SALARY(Number(item.id)))
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
                  setStaffSalarySelected(Number(item.id));
                },
              },
            ],
          }}
        >
          Action
        </DropdownButton>
      ),
    }));
  }, [staffSalaries?.data, navigate]);

  useEffect(() => {
    const params: RequestParams = {
      page,
      pageSize,
      isPaid: salaryStatusFilter,
    };
    setIsLoading(true);
    dispatch(getAllStaffSalaries(params))
      .unwrap()
      .finally(() => setIsLoading(false));
  }, [dispatch, page, pageSize, salaryStatusFilter, triggerReload]);

  const handleDeleteStaffSalary = () => {
    if (!staffSalarySelected) return;
    setIsSubmitting(true);
    setIsLoading(true);
    dispatch(deleteStaffSalary(staffSalarySelected))
      .then(unwrapResult)
      .then(() => {
        setTriggerReload(!triggerReload);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsSubmitting(false);
        setIsLoading(false);
        setStaffSalarySelected(null);
      });
  };

  return (
    <>
      <div className="pt-30 pl-30 pr-20">
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
          <Breadcrumb.Item>Staff Salary</Breadcrumb.Item>
        </Breadcrumb>
        <div className="flex-space-between-center">
          <Typography>Total: {staffSalaries?.totalRecords}</Typography>
          <div className="flex gap-20">
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
            <Button 
              type="primary"
              style={{ height: 38 }}
              onClick={() => navigate(FinancePaths.CREATE_STAFF_SALARY())}
            >
              Create New
            </Button>
          </div>
        </div>
        <Table
          bordered
          rowKey="id"
          size="small"
          loading={isLoading}
          columns={COLUMNS_TABLE_STAFF_SALARY()}
          dataSource={salaryList}
          pagination={false}
          className="mt-20"
          scroll={{ y: 320, x: 400 }}
        />
        <Pagination
          className="flex-justify-center mt-20"
          current={staffSalaries?.pageNumber}
          onChange={(newPage) => setPage(newPage)}
          total={Number(staffSalaries?.totalPages) * 10}
        />
        <Modal
          centered
          title="Are you sure you want to delete this staff's salary?"
          open={!!staffSalarySelected}
          cancelText="Cancel"
          okText="Delete"
          okType="danger"
          onCancel={() => setStaffSalarySelected(null)}
          onOk={handleDeleteStaffSalary}
          okButtonProps={{
            disabled: isSubmitting,
          }}
        />
      </div>
    </>
  );
};

export default memo(StaffSalaryScreen);
