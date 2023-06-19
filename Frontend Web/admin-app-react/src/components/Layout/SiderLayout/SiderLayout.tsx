import { Menu, MenuProps, Typography } from "antd";
import Sider from "antd/es/layout/Sider";
import { memo, useState } from "react";
import styles from "./SiderLayout.module.scss";
import cx from "classnames";
import {
  DingdingOutlined,
  SettingOutlined,
  UserOutlined,
  DollarOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { SettingPaths } from "features/admin_setting/admin_setting";
import { TopPaths } from "features/admin_top/admin_top";
import { UserPaths } from "features/admin_users/admin_users";

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
  getItem("Users", "manageUsersKey", <UserOutlined />, [
    getItem("All Users", UserPaths.GET_ALL_USER()),
    getItem("Staffs", "/staffs"),
    getItem("Teachers", "/teachers"),
    getItem("Students", "/students"),
  ]),
  getItem("Classes", "manageClassesKey", <BookOutlined />, [
    getItem("Subjects", "/subjects"),
    getItem("Rooms", "/rooms"),
    getItem("Classes", "/classes"),
  ]),
  getItem("Finances", "manageFinancesKey", <DollarOutlined />, [
    getItem("Salary", "/salary"),
  ]),
  getItem("Setting", SettingPaths.SETTING(), <SettingOutlined />),
];

const SiderLayout = ({ collapsed }: { collapsed: boolean }) => {
  const navigate = useNavigate();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

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
