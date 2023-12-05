import { Tooltip, Typography } from "antd";
import { NotificationPaths } from "features/staff_notification/staff_notification";
import { memo } from "react";
import { Link } from "react-router-dom";
import { PlusCircleOutlined } from "@ant-design/icons";
import styles from "./NotificationScreen.module.scss";
import cx from "classnames";
import { useNavigate } from "react-router-dom";

const NotificationScreen = () => {
  const navigate = useNavigate();
  return (
    <div className="pl-55 pt-30">
      <Typography className="font-24">Notifications</Typography>
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
