import { Typography, Image, Avatar } from "antd";
import { Header } from "antd/es/layout/layout";
import DropdownButton from "components/DropdownButton/DropdownButton";
import { memo, useEffect } from "react";
import cx from "classnames";
import styles from "./HeaderLayout.module.scss";
import { useAppDispatch, useAppSelector } from "redux/store";
import { RootState } from "redux/root-reducer";
import {
  UserOutlined,
  LogoutOutlined,
  AuditOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { logout } from "features/admin_auth/redux/auth.slice";
import { AuthPathsEnum } from "features/admin_auth/admin_auth";
import { useNavigate } from "react-router-dom";
import { getMyAvatar } from "features/admin_users/admin_users";
import { SettingPaths } from "features/admin_setting/admin_setting";

const HeaderLayout = ({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { avatar } = useAppSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(getMyAvatar());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        navigate(AuthPathsEnum.LOGIN);
      })
      .catch(err => console.log(err));
  };

  return (
    <Header className={cx(styles.header, "flex-space-between-center gap-20")}>
      {collapsed ? (
        <MenuUnfoldOutlined
          className="font-25"
          onClick={() => setCollapsed(!collapsed)}
        />
      ) : (
        <MenuFoldOutlined
          className="font-25"
          onClick={() => setCollapsed(!collapsed)}
        />
      )}
      <DropdownButton
        menuProps={{
          items: [
            {
              key: "1",
              label: "My Profile",
              icon: <AuditOutlined />,
              onClick: () => navigate(SettingPaths.MY_PROFILE()),
            },
            {
              key: "2",
              label: "Logout",
              icon: <LogoutOutlined />,
              onClick: () => handleLogout(),
            },
          ],
        }}
      >
        {avatar?.data ? (
          <Image
            width={30}
            src={`data:${avatar.mediaType};base64,${avatar.data}`}
          />
        ) : (
          <Avatar icon={<UserOutlined />} />
        )}
        <Typography>Welcome back!</Typography>
      </DropdownButton>
    </Header>
  );
};

export default memo(HeaderLayout);
