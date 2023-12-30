import { Breadcrumb } from "antd";
import { memo } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { TopPaths } from "features/staff_top/staff_top";
import { HomeOutlined } from "@ant-design/icons";
import { FinancePaths } from "features/staff_finance/staff_finance";

const FinanceScreen = () => {
  const navigate = useNavigate();
  return (
    <div className="pl-55 pt-30">
      <Breadcrumb className="font-18">
        <Breadcrumb.Item
          className="cursor-pointer"
          onClick={() => navigate(TopPaths.TOP())}
        >
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item>Finance</Breadcrumb.Item>
      </Breadcrumb>
      <ul>
        <li className="pt-20 pb-20">
          <Link
            to={FinancePaths.SPENDING()}
            className="text-link-blue"
          >
            Spending
          </Link>
        </li>
        <li className="pb-20">
          <Link
            to={FinancePaths.TUITION()}
            className="text-link-blue"
          >
            Student Tuition
          </Link>
        </li>
        <li className="pb-20">
          <Link
            to={FinancePaths.MY_SALARY()}
            className="text-link-blue"
          >
            My Salary
          </Link>
        </li>
        <li className="pb-20">
          <Link
            to={FinancePaths.SPENDING()}
            className="text-link-blue"
          >
            Teacher Salary
          </Link>
        </li>
        <li className="pb-20">
          <Link
            to={FinancePaths.SPENDING()}
            className="text-link-blue"
          >
            Staff Salary
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default memo(FinanceScreen);
