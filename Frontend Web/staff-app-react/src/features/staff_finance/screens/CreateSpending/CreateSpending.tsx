import { memo } from "react";
import { Breadcrumb } from "antd";
import { useNavigate } from "react-router-dom";
import { TopPaths } from "features/staff_top/staff_top";
import { HomeOutlined } from "@ant-design/icons";
import { useAppDispatch } from "redux/store";
import { FinancePaths, createSpending } from "features/staff_finance/staff_finance";
import FormCreateEditSpending from "features/staff_finance/components/FormCreateEditSpending/FormCreateEditSpending";
import { CreateEditSpending } from "features/staff_finance/types/spending.types";

const CreateSpending = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCreateSpending = (data: CreateEditSpending) => {
    return dispatch(createSpending(data)).unwrap();
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
          onClick={() => navigate(FinancePaths.SPENDING())}
        >
          Spendings
        </Breadcrumb.Item>

        <Breadcrumb.Item>Create</Breadcrumb.Item>
      </Breadcrumb>
      <FormCreateEditSpending onSubmit={handleCreateSpending} />
    </div>
  );
};
export default memo(CreateSpending);
