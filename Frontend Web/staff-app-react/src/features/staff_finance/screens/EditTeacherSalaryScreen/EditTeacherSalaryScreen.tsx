import { memo, useEffect } from "react";
import { Breadcrumb } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { TopPaths } from "features/staff_top/staff_top";
import { HomeOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "redux/store";
import { FinancePaths, editTeacherSalary, getTeacherSalaryById } from "features/staff_finance/staff_finance";
import { CreateEditTeacherSalary } from "features/staff_finance/types/finance.types";
import FormCreateEditTeacherSalary from "features/staff_finance/components/FormCreateEditTeacherSalary/FormCreateEditTeacherSalary";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import { RootState } from "redux/root-reducer";

const EditTeacherSalaryScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    finance: { teacherSalaryDetail },
  } = useAppSelector((state: RootState) => state);

  useEffect(() => {
    dispatch(getTeacherSalaryById(Number(id)));
  }, [dispatch, id]);

  const handleEditTeacherSalary = (data: CreateEditTeacherSalary) => {
    return dispatch(editTeacherSalary(data)).unwrap();
  };

  if (!teacherSalaryDetail) return <LoadingSpinner />;

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

        <Breadcrumb.Item>Edit</Breadcrumb.Item>
      </Breadcrumb>
      <FormCreateEditTeacherSalary
        onSubmit={handleEditTeacherSalary}
        isEditScreen
        teacherSalary={teacherSalaryDetail}
      />
    </div>
  );
};
export default memo(EditTeacherSalaryScreen);
