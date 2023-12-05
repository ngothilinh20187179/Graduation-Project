import { Menu, MenuProps, Typography } from "antd";
import Sider from "antd/es/layout/Sider";
import { memo, useEffect, useState } from "react";
import styles from "./SiderLayout.module.scss";
import cx from "classnames";
import {
  DingdingOutlined,
  UserOutlined,
  BellOutlined,
  DollarOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { TopPaths } from "features/staff_top/staff_top";
import { ClassesPaths } from "features/staff_classes/staff_classes";
import { UserPaths } from "features/staff_users/staff_users";
import { NotificationPaths } from "features/staff_notification/staff_notification";

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
  getItem("Notifications", NotificationPaths.NOTIFICATION(), <BellOutlined />),
  getItem("Users", "manageUsersKey", <UserOutlined />, [
    getItem("Staffs", UserPaths.GET_STAFFS()),
    getItem("Teachers", UserPaths.GET_TEACHERS()),
    getItem("Students", UserPaths.GET_STUDENTS()),
  ]),
  getItem("Classes", "manageClassesKey", <BookOutlined />, [
    getItem("Subjects", ClassesPaths.SUBJECTS()),
    getItem("Rooms", ClassesPaths.ROOMS()),
    getItem("Classes", ClassesPaths.CLASSES()),
  ]),
  getItem("Finances", "/finances", <DollarOutlined />),
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
