import {
  Breadcrumb,
  Pagination,
  Table,
  Typography,
  Image,
  Avatar,
  Badge,
} from "antd";
import { memo, useEffect, useMemo, useState } from "react";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { TeachingPaths } from "features/teacher_teaching/teaching.types";
import { useAppDispatch, useAppSelector } from "redux/store";
import { RootState } from "redux/root-reducer";
import { useNavigate, useParams } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  COLUMNS_TABLE_STUDENTS,
  GenderType,
  UserStatusType,
} from "features/teacher_users/constants/users.constants";
import { getStudentsInClass } from "features/teacher_users/teacher_users";

const ListStudentsInClassScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [page, setPage] = useState<number>(1);
  const pageSize = 20;
  const [isLoading, setIsLoading] = useState(false);

  const {
    users: { students },
  } = useAppSelector((state: RootState) => state);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getStudentsInClass(Number(id)))
      .then(unwrapResult)
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch, page, pageSize]);

  const studentList = useMemo(() => {
    return students?.data?.map((student, index) => ({
      ...student,
      index: index + 1,
      avatar: student?.avatar ? (
        <Image
          width={40}
          preview={false}
          src={`data:${student.avatar.mediaType};base64,${student.avatar.data}`}
        />
      ) : (
        <Avatar size={40} icon={<UserOutlined />} />
      ),
      userStatus:
        student.userStatus === UserStatusType.UnLock ? (
          <Badge status="success" text="UnLock" />
        ) : (
          <Badge status="error" text="Lock" />
        ),
      gender:
        student.gender === GenderType.Female
          ? "Female"
          : student.gender === GenderType.Male
          ? "Male"
          : "Unknown",
    }));
  }, [students?.data]);

  return (
    <div className="pt-30 pl-50 pr-50">
      <Breadcrumb className="pb-20 font-18">
        <Breadcrumb.Item>
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item
          className="cursor-pointer"
          onClick={() => navigate(TeachingPaths.CLASSES())}
        >
          Classes
        </Breadcrumb.Item>
        <Breadcrumb.Item>List Students</Breadcrumb.Item>
      </Breadcrumb>
      <div className="flex-align-center">
        <Typography className="mr-150">
          Total: There are {students?.totalRecords} students in class
        </Typography>
      </div>
      <Table
        bordered
        rowKey="id"
        size="small"
        loading={isLoading}
        columns={COLUMNS_TABLE_STUDENTS()}
        dataSource={studentList}
        pagination={false}
        className="mt-20"
        scroll={{ y: 320, x: 400 }}
      />
      <Pagination
        className="flex-justify-center mt-20"
        current={students?.pageNumber}
        onChange={(newPage) => setPage(newPage)}
        total={Number(students?.totalPages) * 10}
      />
    </div>
  );
};

export default memo(ListStudentsInClassScreen);
