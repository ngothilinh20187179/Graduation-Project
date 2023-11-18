import { Tooltip, Typography } from "antd";
import { NotificationPaths } from "features/admin_notification/admin_notification";
import { memo } from "react";
import { Link } from "react-router-dom";
import { PlusCircleOutlined } from '@ant-design/icons';
import styles from "./NotificationScreen.module.scss";
import cx from "classnames";

const NotificationScreen = () => {
  return (
    <div className="pl-55 pt-30">
      <Typography className="font-24">Notifications</Typography>
      <ul>
        <li className="pt-20 pb-20">
          <Link to={NotificationPaths.RECEIVED_NOTIFICATIONS()} className="text-link-blue">
            Inbox
          </Link>
        </li>
        <li className="pb-20">
          <Link to={NotificationPaths.SENT_NOTIFICATIONS()} className="text-link-blue">
            Sent
          </Link>
        </li>
        <li>
          <Link to={NotificationPaths.STARRED_NOTIFICATIONS()} className="text-link-blue">
            Starred
          </Link>
        </li>
      </ul>
      <Tooltip title="New">
        <PlusCircleOutlined className={cx(styles.addNotification)}/>
      </Tooltip>
    </div>
  );
};

export default memo(NotificationScreen);