import { Breadcrumb } from "antd";
import { TopPaths } from "features/admin_top/constants/top.paths";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "redux/store";
import { HomeOutlined } from "@ant-design/icons";

const StatisticalScreen = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <div className="pt-30 pl-55 pr-55">
      <Breadcrumb className="pb-20 font-18">
        <Breadcrumb.Item
          className="cursor-pointer"
          onClick={() => navigate(TopPaths.TOP())}
        >
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item>Statistical</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
};

export default memo(StatisticalScreen);
