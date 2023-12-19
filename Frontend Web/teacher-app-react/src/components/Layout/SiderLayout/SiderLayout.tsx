import { Menu, MenuProps, Typography } from "antd";
import Sider from "antd/es/layout/Sider";
import { memo, useEffect, useState } from "react";
import styles from "./SiderLayout.module.scss";
import cx from "classnames";
import {
  DingdingOutlined,
  BellOutlined,
  DollarOutlined,
  BookOutlined,
  ScheduleOutlined,
  FormOutlined,
  FileDoneOutlined
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { TopPaths } from "features/teacher_top/teacher_top";
import { NotificationPaths } from "features/teacher_notification/teacher_notification";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuProps["items"] = [
  getItem("Schedule", "/schedule", <ScheduleOutlined />),
  getItem("Classes", "/classes", <BookOutlined />),
  getItem("Tests", "/test", <FormOutlined />),
  getItem("Assign Test", "/assign-test", <FileDoneOutlined />),
  getItem("Salary", "/salary", <DollarOutlined />),
  getItem("Notifications", NotificationPaths.NOTIFICATION(), <BellOutlined />),
];

const SiderLayout = ({ collapsed }: { collapsed: boolean }) => {
  const navigate = useNavigate();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const location = useLocation();

  useEffect(() => {
    const firstPathName = `/${location.pathname.split("/")[1]}`;
    setSelectedKeys([firstPathName]);
    navigate(firstPathName);
  }, []);

  const onClickMenuItem: MenuProps["onClick"] = (e) => {
    setSelectedKeys([e.key]);
    navigate(e.key);
  };

  const handleClickLogo = () => {
    setSelectedKeys([]);
    navigate(TopPaths.TOP());
  };

  return (
    <Sider
      className={cx(styles.sliderLayout)}
      collapsible
      collapsed={collapsed}
      trigger={null}
    >
      <div
        className="pl-24 pt-15 pb-40 cursor-pointer"
        onClick={handleClickLogo}
      >
        <DingdingOutlined className="font-40" style={{ color: "white" }} />
        <Typography style={{ color: "white" }}>EnglishEZ</Typography>
      </div>
      <Menu
        onClick={onClickMenuItem}
        defaultSelectedKeys={[]}
        selectedKeys={selectedKeys}
        mode="inline"
        items={items}
        theme="dark"
      />
    </Sider>
  );
};

export default memo(SiderLayout);