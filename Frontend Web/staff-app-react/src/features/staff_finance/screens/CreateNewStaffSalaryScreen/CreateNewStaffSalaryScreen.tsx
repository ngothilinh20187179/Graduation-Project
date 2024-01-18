import { memo } from "react";
import { Breadcrumb } from "antd";
import { useNavigate } from "react-router-dom";
import { TopPaths } from "features/staff_top/staff_top";
import { HomeOutlined } from "@ant-design/icons";
import { useAppDispatch } from "redux/store";
import { FinancePaths, createStaffSalary } from "features/staff_finance/staff_finance";
import { CreateEditStaffSalary } from "features/staff_finance/types/finance.types";
import FormCreateEditStaffSalary from "features/staff_finance/components/FormCreateEditStaffSalary/FormCreateEditStaffSalary";

const CreateNewStaffSalaryScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCreateSpending = (data: CreateEditStaffSalary) => {
    return dispatch(createStaffSalary(data)).unwrap();
  }

  return (
    <div className="pt-30 pl-55">
      <Breadcrumb className="pb-50 font-18">
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
        <Breadcrumb.Item
          className="cursor-pointer"
          onClick={() => navigate(FinancePaths.STAFF_SALARY())}
        >
          Staff Salary
        </Breadcrumb.Item>

        <Breadcrumb.Item>Create</Breadcrumb.Item>
      </Breadcrumb>
      <FormCreateEditStaffSalary onSubmit={handleCreateSpending} />
    </div>
  );
};
export default memo(CreateNewStaffSalaryScreen);
