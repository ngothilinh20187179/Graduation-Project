import { Menu, MenuProps, Typography } from "antd";
import Sider from "antd/es/layout/Sider";
import { memo, useEffect, useState } from "react";
import styles from "./SiderLayout.module.scss";
import cx from "classnames";
import {
  DingdingOutlined,
  ApartmentOutlined,
  UserOutlined,
  BellOutlined,
  BookOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { TopPaths } from "features/admin_top/admin_top";
import { UserPaths } from "features/admin_users/admin_users";
import { ClassesPaths } from "features/admin_classes/admin_classes";
import { NotificationPaths } from "features/admin_notification/admin_notification";
import { PositionPaths } from "features/admin_position/admin_position";

// TODO: còn 1 vđ là khi navigate ở các screen khác thì sider ko update

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
    getItem("Admins", UserPaths.GET_ADMINS()),
    getItem("Staffs", UserPaths.GET_STAFFS()),
    getItem("Teachers", UserPaths.GET_TEACHERS()),
    getItem("Students", UserPaths.GET_STUDENTS()),
  ]),
  getItem("Classes", "manageClassesKey", <BookOutlined />, [
    getItem("Subjects", ClassesPaths.SUBJECTS()),
    getItem("Rooms", ClassesPaths.ROOMS()),
    getItem("Classes", ClassesPaths.CLASSES()),
  ]),
  getItem("Statistical", "statisticalKey", <BarChartOutlined />),
  getItem("Position", PositionPaths.POSITIONS(), <ApartmentOutlined />),
  // getItem("Settings", SettingPaths.SETTING(), <SettingOutlined />),
];

const SiderLayout = ({ collapsed }: { collapsed: boolean }) => {
  const navigate = useNavigate();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const location = useLocation();

  useEffect(() => {
    const firstPathName = `/${location.pathname.split('/')[1]}`
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
  }

  return (
    <Sider
      className={cx(styles.sliderLayout)}
      collapsible
      collapsed={collapsed}
      trigger={null}
    >
      <div className="pl-24 pt-15 pb-40 cursor-pointer" onClick={handleClickLogo}>
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
