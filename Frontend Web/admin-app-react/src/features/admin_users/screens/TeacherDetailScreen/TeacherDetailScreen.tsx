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
import { getTimeUTC, numberWithCommas } from "helpers/utils.helper";
import { UserPaths, getStaffById, getTeacherById } from "features/admin_users/admin_users";
import styles from "./TeacherDetailScreen.module.scss";

const TeacherDetailScreen = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const {
    users: { teacher },
  } = useAppSelector((state: RootState) => state);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getTeacherById(Number(id)))
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
          onClick={() => navigate(UserPaths.GET_TEACHERS())}
        >
          Teachers
        </Breadcrumb.Item>
        <Breadcrumb.Item>Teacher Detail</Breadcrumb.Item>
      </Breadcrumb>
      <div className={styles.avatar}>
        {teacher?.avatar ? (
          <Image
            preview={false}
            src={`data:${teacher.avatar.mediaType};base64,${teacher.avatar.data}`}
          />
        ) : (
          <Avatar size={200} icon={<UserOutlined />} />
        )}
      </div>
      <div className="ml-20">
        <Title title="edit" className="mt-30 mb-30 cursor-pointer" level={4}>
          Teacher Information{" "}
          <span>
            <EditOutlined onClick={() => navigate(UserPaths.EDIT_TEACHER(Number(id)))} />
          </span>
        </Title>
        <Descriptions>
          <Descriptions.Item className="font-16" label="Id">
            {teacher?.id}
          </Descriptions.Item>
          <Descriptions.Item label="Login Name">
            {teacher?.loginName}
          </Descriptions.Item>
          <Descriptions.Item label="First Name">
            {teacher?.firstName}
          </Descriptions.Item>
          <Descriptions.Item label="Last Name">
            {teacher?.lastName}
          </Descriptions.Item>
          <Descriptions.Item label="Gender">
            {teacher?.gender === 0 ? "Male" : "Female"}
          </Descriptions.Item>
          <Descriptions.Item label="Date Of Birth">
            {teacher?.dateOfBirth}
          </Descriptions.Item>
          <Descriptions.Item label="Telephone">
            {teacher?.phoneNumber}
          </Descriptions.Item>
          <Descriptions.Item label="Address">
            {teacher?.location}
          </Descriptions.Item>
          <Descriptions.Item label="Email">{teacher?.email}</Descriptions.Item>
          <Descriptions.Item label="Graduate At">
            {teacher?.graduateAt}
          </Descriptions.Item>
          <Descriptions.Item label="Graduation Time">
            {teacher?.graduationTime}
          </Descriptions.Item>
          <Descriptions.Item label="Note">
            {teacher?.note}
          </Descriptions.Item>
          <Descriptions.Item label="Hour Salary">
            {numberWithCommas(Number(teacher?.hourlySalary))} VNĐ/h
          </Descriptions.Item>
          <Descriptions.Item label="Created On">
            {getTimeUTC(teacher?.createdOn)}
          </Descriptions.Item>
        </Descriptions>
      </div>
    </div>
  );
};

export default memo(TeacherDetailScreen);
