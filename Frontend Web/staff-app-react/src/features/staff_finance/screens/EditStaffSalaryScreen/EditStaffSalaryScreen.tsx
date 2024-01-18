import { memo, useEffect } from "react";
import { Breadcrumb } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { TopPaths } from "features/staff_top/staff_top";
import { HomeOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "redux/store";
import { FinancePaths, editStaffSalary, getStaffSalaryById } from "features/staff_finance/staff_finance";
import { CreateEditStaffSalary } from "features/staff_finance/types/finance.types";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import { RootState } from "redux/root-reducer";
import FormCreateEditStaffSalary from "features/staff_finance/components/FormCreateEditStaffSalary/FormCreateEditStaffSalary";

const EditStaffSalaryScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    finance: { staffSalaryDetail },
  } = useAppSelector((state: RootState) => state);

  useEffect(() => {
    dispatch(getStaffSalaryById(Number(id)));
  }, [dispatch, id]);

  const handleEditStaffSalary = (data: CreateEditStaffSalary) => {
    return dispatch(editStaffSalary(data)).unwrap();
  };

  if (!staffSalaryDetail) return <LoadingSpinner />;

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

        <Breadcrumb.Item>Edit</Breadcrumb.Item>
      </Breadcrumb>
      <FormCreateEditStaffSalary
        onSubmit={handleEditStaffSalary}
        isEditScreen
        staffSalary={staffSalaryDetail}
      />
    </div>
  );
};
export default memo(EditStaffSalaryScreen);
