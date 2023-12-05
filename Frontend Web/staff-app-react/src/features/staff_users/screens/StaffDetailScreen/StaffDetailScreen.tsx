import { Avatar, Breadcrumb, Descriptions, Image } from "antd";
import { TopPaths } from "features/staff_top/staff_top";
import { memo, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HomeOutlined, UserOutlined, EditOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "redux/store";
import { RootState } from "redux/root-reducer";
import { unwrapResult } from "@reduxjs/toolkit";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import Title from "antd/es/typography/Title";
import { getTimeUTC } from "helpers/utils.helper";
import { UserPaths, getStaffById } from "features/staff_users/staff_users";
import styles from "./StaffDetailScreen.module.scss";

const StaffDetailScreen = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const {
    users: { staff },
  } = useAppSelector((state: RootState) => state);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getStaffById(Number(id)))
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
          onClick={() => navigate(UserPaths.GET_STAFFS())}
        >
          Staffs
        </Breadcrumb.Item>
        <Breadcrumb.Item>Staff Detail</Breadcrumb.Item>
      </Breadcrumb>
      <div className={styles.avatar}>
        {staff?.avatar ? (
          <Image
            preview={false}
            src={`data:${staff.avatar.mediaType};base64,${staff.avatar.data}`}
          />
        ) : (
          <Avatar size={200} icon={<UserOutlined />} />
        )}
      </div>
      <div className="ml-20">
        <Title title="edit" className="mt-30 mb-30 cursor-pointer" level={4}>
          Staff Information
        </Title>
        <Descriptions>
          <Descriptions.Item className="font-16" label="Id">
            {staff?.id}
          </Descriptions.Item>
          <Descriptions.Item label="Position">
            {staff?.positionName}
          </Descriptions.Item>
          <Descriptions.Item label="First Name">
            {staff?.firstName}
          </Descriptions.Item>
          <Descriptions.Item label="Last Name">
            {staff?.lastName}
          </Descriptions.Item>
          <Descriptions.Item label="Gender">
            {staff?.gender === 0 ? "Male" : "Female"}
          </Descriptions.Item>
          <Descriptions.Item label="Date Of Birth">
            {staff?.dateOfBirth}
          </Descriptions.Item>
          <Descriptions.Item label="Telephone">
            {staff?.phoneNumber}
          </Descriptions.Item>
          <Descriptions.Item label="Address">
            {staff?.location}
          </Descriptions.Item>
          <Descriptions.Item label="Email">{staff?.email}</Descriptions.Item>
          <Descriptions.Item label="Graduate At">
            {staff?.graduateAt}
          </Descriptions.Item>
          <Descriptions.Item label="Graduation Time">
            {staff?.graduationTime}
          </Descriptions.Item>
          <Descriptions.Item label="Note">
            {staff?.note}
          </Descriptions.Item>
          <Descriptions.Item label="Hired Date">
            {staff?.hireDate}
          </Descriptions.Item>
          <Descriptions.Item label="Years Of Working">
            {staff?.yearsOfWorking}
          </Descriptions.Item>
          <Descriptions.Item label="Created On">
            {getTimeUTC(staff?.createdOn)}
          </Descriptions.Item>
        </Descriptions>
      </div>
    </div>
  );
};

export default memo(StaffDetailScreen);
