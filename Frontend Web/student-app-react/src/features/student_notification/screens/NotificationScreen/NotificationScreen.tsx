import { Breadcrumb } from "antd";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { TopPaths } from "features/student_top/student_top";
import { HomeOutlined } from "@ant-design/icons";
import ListReceivedNotifications from "features/student_notification/components/ListReceivedNotifications";

const NotificationScreen = () => {
  const navigate = useNavigate();
  return (
    <div className="pl-55 pt-30">
      <Breadcrumb className="pb-30 font-18">
        <Breadcrumb.Item
          className="cursor-pointer"
          onClick={() => navigate(TopPaths.TOP())}
        >
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item>Notifications</Breadcrumb.Item>
      </Breadcrumb>
      <ListReceivedNotifications />
    </div>
  );
};

export default memo(NotificationScreen);
