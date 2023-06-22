import {
  Avatar,
  Breadcrumb,
  Descriptions,
  Image,
  Modal,
  Typography,
} from "antd";
import { TopPaths } from "features/admin_top/admin_top";
import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {
  SettingPaths,
  changeAvatar,
  deleteAvatar,
  getMyProfile,
} from "features/admin_setting/admin_setting";
import { useAppDispatch, useAppSelector } from "redux/store";
import { RootState } from "redux/root-reducer";
import { unwrapResult } from "@reduxjs/toolkit";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import cx from "classnames";
import styles from "./MyProfileScreen.module.scss";
import Title from "antd/es/typography/Title";
import { getTimeUTC } from "helpers/utils.helper";
import Upload from "antd/es/upload/Upload";
import { getMyAvatar } from "features/admin_users/admin_users";

const MyProfileScreen = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    setting: { myProfile },
  } = useAppSelector((state: RootState) => state);

  const [isLoading, setIsLoading] = useState(false);
  const [triggerReload, setTriggerReload] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getMyProfile())
      .then(unwrapResult)
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch, triggerReload]);

  const handleUploadImage = async (options: any) => {
    const { file } = options;
    const formData = new FormData();
    formData.append("formFile", file);
    setIsLoading(true);
    dispatch(changeAvatar(formData))
      .then(unwrapResult)
      .then(() => {
        setTriggerReload(!triggerReload);
        dispatch(getMyAvatar());
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDeleteAvatar = () => {
    setIsSubmitting(true);
    setIsLoading(true);
    dispatch(deleteAvatar())
      .then(unwrapResult)
      .then(() => {
        setTriggerReload(!triggerReload);
        dispatch(getMyAvatar());
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsSubmitting(false);
        setIsLoading(false);
        setIsModalOpen(false)
      });
  };

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
      <div className="position-relative">
        <div className={cx(styles.avatar, "position-relative")}>
          <Upload
            className="cursor-pointer"
            accept="image/*"
            customRequest={handleUploadImage}
          >
            <div className={cx(styles.changeAvatarText, "position-center")}>
              <div className="position-center">
                {myProfile?.avatar ? "Change " : "Upload "}
                <span>
                  <EditOutlined />
                </span>
              </div>
            </div>
            {myProfile?.avatar ? (
              <Image
                preview={false}
                src={`data:${myProfile.avatar.mediaType};base64,${myProfile.avatar.data}`}
              />
            ) : (
              <Avatar size={200} icon={<UserOutlined />} />
            )}
          </Upload>
        </div>
        {myProfile?.avatar && (
          <DeleteOutlined
            className={cx(styles.removeAvatarIcon, "font-20 cursor-pointer")}
            onClick={() => setIsModalOpen(true)}
          />
        )}
      </div>
      <div className="ml-20">
        <Title title="edit" className="mt-50 mb-30 cursor-pointer" level={3}>
          My Information{" "}
          <span>
            <EditOutlined
              onClick={() => navigate(SettingPaths.CHANGE_INFORMATION())}
            />
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
            {getTimeUTC(myProfile?.created)}
          </Descriptions.Item>
        </Descriptions>
      </div>
      <Modal
        centered
        title="Are you sure?"
        open={isModalOpen}
        okText="Delete"
        okType="danger"
        onCancel={() => setIsModalOpen(false)}
        onOk={handleDeleteAvatar}
        okButtonProps={{
          disabled: isSubmitting,
        }}
      >
        <Typography>
          Do you really want to delete this avatar? This process cannot be
          undone
        </Typography>
      </Modal>
    </div>
  );
};

export default memo(MyProfileScreen);
