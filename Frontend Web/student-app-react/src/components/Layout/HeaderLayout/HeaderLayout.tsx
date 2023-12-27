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
  KeyOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { SettingPaths } from "features/student_setting/student_setting";
import { AuthPathsEnum } from "features/student_auth/student_auth";
import { getMyAvatar } from "features/student_users/student_users";
import { logout } from "features/student_auth/redux/auth.slice";
import { TopPaths } from "features/student_top/student_top";
import Title from "antd/es/typography/Title";

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
      .catch((err) => console.log(err));
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
      <Title level={4} className="mb-25">Student</Title>
      <DropdownButton
        menuProps={{
          items: [
            {
              key: "1",
              label: "My Profile",
              icon: <AuditOutlined />,
              onClick: () => navigate(TopPaths.TOP()),
            },
            {
              key: "2",
              label: "Change Password",
              icon: <KeyOutlined />,
              onClick: () => navigate(SettingPaths.CHANGE_PASSWORD()),
            },
            {
              key: "3",
              label: "Logout",
              icon: <LogoutOutlined />,
              onClick: () => handleLogout(),
            },
          ],
        }}
      >
        {avatar?.data ? (
          <Image
            preview={false}
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
