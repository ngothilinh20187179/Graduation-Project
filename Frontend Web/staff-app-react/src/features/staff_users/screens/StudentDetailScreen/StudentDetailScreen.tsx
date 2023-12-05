import { Avatar, Breadcrumb, Descriptions, Image } from "antd";
import { TopPaths } from "features/staff_top/staff_top";
import { memo, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "redux/store";
import { RootState } from "redux/root-reducer";
import { unwrapResult } from "@reduxjs/toolkit";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import Title from "antd/es/typography/Title";
import { getTimeUTC } from "helpers/utils.helper";
import { UserPaths, getStudentById } from "features/staff_users/staff_users";
import styles from "./StudentDetailScreen.module.scss";

const StudentDetailScreen = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const {
    users: { student },
  } = useAppSelector((state: RootState) => state);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getStudentById(Number(id)))
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
          onClick={() => navigate(UserPaths.GET_STUDENTS())}
        >
          Students
        </Breadcrumb.Item>
        <Breadcrumb.Item>Student Detail</Breadcrumb.Item>
      </Breadcrumb>
      <div className={styles.avatar}>
        {student?.avatar ? (
          <Image
            preview={false}
            src={`data:${student.avatar.mediaType};base64,${student.avatar.data}`}
          />
        ) : (
          <Avatar size={200} icon={<UserOutlined />} />
        )}
      </div>
      <div className="ml-20">
        <Title title="edit" className="mt-30 mb-30 cursor-pointer" level={4}>
          Student Information{" "}
          <span>
            {/* <EditOutlined onClick={() => navigate(UserPaths.EDIT_STUDENT(Number(id)))} /> */}
          </span>
        </Title>
        <Descriptions>
          <Descriptions.Item className="font-16" label="Id">
            {student?.id}
          </Descriptions.Item>
          <Descriptions.Item label="Login Name">
            {student?.loginName}
          </Descriptions.Item>
          <Descriptions.Item label="First Name">
            {student?.firstName}
          </Descriptions.Item>
          <Descriptions.Item label="Last Name">
            {student?.lastName}
          </Descriptions.Item>
          <Descriptions.Item label="Gender">
            {student?.gender === 0 ? "Male" : "Female"}
          </Descriptions.Item>
          <Descriptions.Item label="Date Of Birth">
            {student?.dateOfBirth}
          </Descriptions.Item>
          <Descriptions.Item label="Telephone">
            {student?.phoneNumber}
          </Descriptions.Item>
          <Descriptions.Item label="Address">
            {student?.location}
          </Descriptions.Item>
          <Descriptions.Item label="Email">{student?.email}</Descriptions.Item>
          <Descriptions.Item label="Parents Name">
            {student?.parentsName}
          </Descriptions.Item>
          <Descriptions.Item label="Parent's Phone Number">
            {student?.parentPhoneNumber}
          </Descriptions.Item>
          <Descriptions.Item label="Note">
            {student?.note}
          </Descriptions.Item>
          <Descriptions.Item label="Created On">
            {getTimeUTC(student?.createdOn)}
          </Descriptions.Item>
        </Descriptions>
      </div>
    </div>
  );
};

export default memo(StudentDetailScreen);
