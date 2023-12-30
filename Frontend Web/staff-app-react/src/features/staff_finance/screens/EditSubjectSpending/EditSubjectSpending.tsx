import { memo, useEffect } from "react";
import { Breadcrumb } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { TopPaths } from "features/staff_top/staff_top";
import { HomeOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "redux/store";
import { RootState } from "redux/root-reducer";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import { FinancePaths, getSpendingById, updateSpending } from "features/staff_finance/staff_finance";
import FormCreateEditSpending from "features/staff_finance/components/FormCreateEditSpending/FormCreateEditSpending";
import { CreateEditSpending } from "features/staff_finance/types/finance.types";

const EditSubjectSpending = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    finance: { spending },
  } = useAppSelector((state: RootState) => state);

  useEffect(() => {
    dispatch(getSpendingById(Number(id)));
  }, [dispatch, id]);

  const handleEditSpending = (data: CreateEditSpending) => {
    return dispatch(updateSpending(data)).unwrap();
  };

  if (!spending) return <LoadingSpinner />;

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
          onClick={() => navigate(FinancePaths.SPENDING())}
        >
          Spendings
        </Breadcrumb.Item>

        <Breadcrumb.Item>Edit</Breadcrumb.Item>
      </Breadcrumb>
      <FormCreateEditSpending
        isEditScreen
        onSubmit={handleEditSpending}
        spending={spending}
      />
    </div>
  );
};
export default memo(EditSubjectSpending);
