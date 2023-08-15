import { Avatar, Breadcrumb, Descriptions, Image } from "antd";
import { TopPaths } from "features/admin_top/admin_top";
import { memo, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HomeOutlined, UserOutlined, EditOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "redux/store";
import { RootState } from "redux/root-reducer";
import { unwrapResult } from "@reduxjs/toolkit";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import Title from "antd/es/typography/Title";
import { getTimeUTC } from "helpers/utils.helper";
import { UserPaths, getAdminById } from "features/admin_users/admin_users";
import styles from "./AdminDetailScreen.module.scss";

const AdminDetailScreen = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const {
    users: { admin },
  } = useAppSelector((state: RootState) => state);
  console.log(admin);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getAdminById(Number(id)))
      .then(unwrapResult)
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="pl-55 pt-30">
      <Breadcrumb className="pb-40 font-18">
        <Breadcrumb.Item
          className="cursor-pointer"
          onClick={() => navigate(TopPaths.TOP())}
        >
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item
          className="cursor-pointer"
          onClick={() => navigate(UserPaths.GET_ADMINS())}
        >
          Admins
        </Breadcrumb.Item>
        <Breadcrumb.Item>Admin Detail</Breadcrumb.Item>
      </Breadcrumb>
      <div className={styles.avatar}>
        {admin?.avatar ? (
          <Image
            preview={false}
            src={`data:${admin.avatar.mediaType};base64,${admin.avatar.data}`}
          />
        ) : (
          <Avatar size={200} icon={<UserOutlined />} />
        )}
      </div>
      <div className="ml-20">
        <Title title="edit" className="mt-30 mb-30 cursor-pointer" level={4}>
          Admin Information{" "}
          <span>
            <EditOutlined onClick={() => navigate(UserPaths.EDIT_ADMIN(Number(id)))} />
          </span>
        </Title>
        <Descriptions>
          <Descriptions.Item className="font-16" label="Id">
            {admin?.id}
          </Descriptions.Item>
          <Descriptions.Item label="My Role">{admin?.role}</Descriptions.Item>
          <Descriptions.Item label="Login Name">
            {admin?.loginName}
          </Descriptions.Item>
          <Descriptions.Item label="First Name">
            {admin?.firstName}
          </Descriptions.Item>
          <Descriptions.Item label="Last Name">
            {admin?.lastName}
          </Descriptions.Item>
          <Descriptions.Item label="Gender">
            {admin?.gender === 0 ? "Male" : "Female"}
          </Descriptions.Item>
          <Descriptions.Item label="Telephone">
            {admin?.phoneNumber}
          </Descriptions.Item>
          <Descriptions.Item label="Date Of Birth">
            {admin?.dateOfBirth}
          </Descriptions.Item>
          <Descriptions.Item label="Email">{admin?.email}</Descriptions.Item>
          <Descriptions.Item label="Address">
            {admin?.location}
          </Descriptions.Item>
          <Descriptions.Item label="Created At">
            {getTimeUTC(admin?.created)}
          </Descriptions.Item>
        </Descriptions>
      </div>
    </div>
  );
};

export default memo(AdminDetailScreen);
