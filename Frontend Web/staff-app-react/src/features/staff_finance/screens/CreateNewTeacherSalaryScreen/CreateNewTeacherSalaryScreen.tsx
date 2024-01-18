import { memo } from "react";
import { Breadcrumb } from "antd";
import { useNavigate } from "react-router-dom";
import { TopPaths } from "features/staff_top/staff_top";
import { HomeOutlined } from "@ant-design/icons";
import { useAppDispatch } from "redux/store";
import { FinancePaths, createTeacherSalary } from "features/staff_finance/staff_finance";
import { CreateEditTeacherSalary } from "features/staff_finance/types/finance.types";
import FormCreateEditTeacherSalary from "features/staff_finance/components/FormCreateEditTeacherSalary/FormCreateEditTeacherSalary";

const CreateNewTeacherSalaryScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCreateTeacherSalary = (data: CreateEditTeacherSalary) => {
    return dispatch(createTeacherSalary(data)).unwrap();
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
          onClick={() => navigate(FinancePaths.TEACHER_SALARY())}
        >
          Teacher Salary
        </Breadcrumb.Item>

        <Breadcrumb.Item>Create</Breadcrumb.Item>
      </Breadcrumb>
      <FormCreateEditTeacherSalary onSubmit={handleCreateTeacherSalary} />
    </div>
  );
};
export default memo(CreateNewTeacherSalaryScreen);
