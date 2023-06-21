import { Avatar, Breadcrumb, Descriptions, Image } from "antd";
import { TopPaths } from "features/admin_top/admin_top";
import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HomeOutlined, UserOutlined, EditOutlined } from "@ant-design/icons";
import {
  SettingPaths,
  getMyProfile,
} from "features/admin_setting/admin_setting";
import { useAppDispatch, useAppSelector } from "redux/store";
import { RootState } from "redux/root-reducer";
import { unwrapResult } from "@reduxjs/toolkit";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import cx from "classnames";
import styles from "./MyProfileScreen.module.scss";
import Title from "antd/es/typography/Title";

const MyProfileScreen = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { myProfile } = useAppSelector((state: RootState) => state.setting);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getMyProfile())
      .then(unwrapResult)
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <Breadcrumb className="pb-50 font-18">
        <Breadcrumb.Item
          className="cursor-pointer"
          onClick={() => navigate(TopPaths.TOP())}
        >
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item
          className="cursor-pointer"
          onClick={() => navigate(SettingPaths.SETTING())}
        >
          Settings
        </Breadcrumb.Item>
        <Breadcrumb.Item>My Profile</Breadcrumb.Item>
      </Breadcrumb>
      <div className={cx(styles.avatar)}>
        {myProfile?.avatar ? (
          <Image
            src={`data:${myProfile.avatar.mediaType};base64,${myProfile.avatar.data}`}
          />
        ) : (
          <Avatar icon={<UserOutlined />} />
        )}
      </div>
      <div className="ml-20">
        <Title className="mt-50 mb-30" level={3}>
          My Information{" "}
          <span className="cursor-pointer">
            <EditOutlined />
          </span>
        </Title>
        <Descriptions>
          <Descriptions.Item className="font-16" label="My Id">
            {myProfile?.id}
          </Descriptions.Item>
          <Descriptions.Item label="My Role">
            {myProfile?.role}
          </Descriptions.Item>
          <Descriptions.Item label="Login Name">
            {myProfile?.loginName}
          </Descriptions.Item>
          <Descriptions.Item label="First Name">
            {myProfile?.firstName}
          </Descriptions.Item>
          <Descriptions.Item label="Last Name">
            {myProfile?.lastName}
          </Descriptions.Item>
          <Descriptions.Item label="Gender">
            {myProfile?.gender === 0 ? "Male" : "Female"}
          </Descriptions.Item>
          <Descriptions.Item label="Telephone">
            {myProfile?.phoneNumber}
          </Descriptions.Item>
          <Descriptions.Item label="Date Of Birth">
            {myProfile?.dateOfBirth}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {myProfile?.email}
          </Descriptions.Item>
          <Descriptions.Item label="Address">
            {myProfile?.location}
          </Descriptions.Item>
          <Descriptions.Item label="Created At">
            {myProfile?.created}
          </Descriptions.Item>
        </Descriptions>
      </div>
    </div>
  );
};

export default memo(MyProfileScreen);
