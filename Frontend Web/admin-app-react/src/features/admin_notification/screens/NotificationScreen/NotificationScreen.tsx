import { Breadcrumb, Tooltip } from "antd";
import { NotificationPaths } from "features/admin_notification/admin_notification";
import { memo } from "react";
import { Link } from "react-router-dom";
import { PlusCircleOutlined } from "@ant-design/icons";
import styles from "./NotificationScreen.module.scss";
import cx from "classnames";
import { useNavigate } from "react-router-dom";
import { TopPaths } from "features/admin_top/admin_top";
import { HomeOutlined } from "@ant-design/icons";

const NotificationScreen = () => {
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
        <Breadcrumb.Item>Notifications</Breadcrumb.Item>
      </Breadcrumb>
      <ul>
        <li className="pt-20 pb-20">
          <Link
            to={NotificationPaths.RECEIVED_NOTIFICATIONS()}
            className="text-link-blue"
          >
            Inbox
          </Link>
        </li>
        <li className="pb-20">
          <Link
            to={NotificationPaths.SENT_NOTIFICATIONS()}
            className="text-link-blue"
          >
            Sent
          </Link>
        </li>
        <li>
          <Link
            to={NotificationPaths.STARRED_NOTIFICATIONS()}
            className="text-link-blue"
          >
            Starred
          </Link>
        </li>
      </ul>
      <Tooltip title="New">
        <PlusCircleOutlined
          className={cx(styles.addNotification)}
          onClick={() => navigate(NotificationPaths.CREATE_NOTIFICATIONS())}
        />
      </Tooltip>
    </div>
  );
};

export default memo(NotificationScreen);
