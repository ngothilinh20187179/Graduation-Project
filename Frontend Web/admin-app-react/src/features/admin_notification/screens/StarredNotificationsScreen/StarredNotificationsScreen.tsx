import { memo } from "react";
import { Breadcrumb } from "antd";
import { useNavigate } from "react-router-dom";
import { NotificationPaths } from "features/admin_notification/admin_notification";
import { TopPaths } from "features/admin_top/admin_top";
import { HomeOutlined } from "@ant-design/icons";

const StarredNotificationsScreen = () => {
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
        <Breadcrumb.Item
          className="cursor-pointer"
          onClick={() => navigate(NotificationPaths.NOTIFICATION())}
        >
          Notifications
        </Breadcrumb.Item>
        <Breadcrumb.Item>Starred</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
};

export default memo(StarredNotificationsScreen);
