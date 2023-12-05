import { memo } from "react";
import { Breadcrumb } from "antd";
import { useNavigate } from "react-router-dom";
import { NotificationPaths } from "features/staff_notification/staff_notification";
import { TopPaths } from "features/staff_top/staff_top";
import { HomeOutlined } from "@ant-design/icons";
import ListReceivedNotifications from "features/staff_notification/components/ListReceivedNotifications";

const ReceivedNotificationsScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="pl-55 pt-30 pr-55">
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
        <Breadcrumb.Item>Inbox</Breadcrumb.Item>
      </Breadcrumb>
      <div>
        <ListReceivedNotifications />
      </div>
    </div>
  );
};

export default memo(ReceivedNotificationsScreen);
