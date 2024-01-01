import { Avatar, Breadcrumb, Descriptions, Pagination, Table, Image } from "antd";
import { memo, useEffect, useMemo, useState } from "react";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { RequestParams } from "types/param.types";
import { useAppDispatch, useAppSelector } from "redux/store";
import { RootState } from "redux/root-reducer";
import { getTimeUTC } from "helpers/utils.helper";
import { TeachingPaths } from "features/teacher_teaching/constants/teaching.paths";
import { COLUMNS_TABLE_ONLINE_TEST_SCORES } from "features/teacher_teaching/constants/teaching.constants";
import { getAllOnlineTestScores } from "features/teacher_teaching/redux/teaching.slice";
import { unwrapResult } from "@reduxjs/toolkit";
import { getStudentById } from "features/teacher_users/redux/users.slice";
import styles from "./OnlineTestScoresScreen.module.scss";
import Title from "antd/es/typography/Title";

const OnlineTestScoresScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const pageSize = 20;

  const {
    teaching: { onlineTestScores },
  } = useAppSelector((state: RootState) => state);
  
  const {
    users: { student },
  } = useAppSelector((state: RootState) => state);

  const onlineTestScoreList = useMemo(() => {
    return onlineTestScores?.data?.map((onlineTestScore, index) => ({
      ...onlineTestScore,
      index: index + 1,
      created: getTimeUTC(onlineTestScore?.created),
    }));
  }, [onlineTestScores?.data]);

  useEffect(() => {
    const params: RequestParams = {
      page,
      pageSize,
      id: Number(id),
    };
    setIsLoading(true);
    dispatch(getAllOnlineTestScores(params));
    dispatch(getStudentById(Number(id)))
      .then(unwrapResult)
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch, id, page, pageSize]);

  return (
    <div className="pl-55 pt-30 pr-55 pb-40">
      <Breadcrumb className="font-18 pb-20">
        <Breadcrumb.Item>
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item
          className="cursor-pointer"
          onClick={() => navigate(TeachingPaths.CLASSES())}
        >
          Classes
        </Breadcrumb.Item>
        <Breadcrumb.Item>Student Online Test Scores</Breadcrumb.Item>
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
        </Descriptions>
      </div>
      <Table
        bordered
        rowKey="id"
        size="small"
        loading={isLoading}
        columns={COLUMNS_TABLE_ONLINE_TEST_SCORES()}
        dataSource={onlineTestScoreList}
        pagination={false}
        className="mt-20"
        scroll={{ y: 320, x: 400 }}
      />
      <Pagination
        className="flex-justify-center mt-20"
        current={onlineTestScores?.pageNumber}
        onChange={(newPage) => setPage(newPage)}
        total={Number(onlineTestScores?.totalPages) * 10}
      />
    </div>
  );
};

export default memo(OnlineTestScoresScreen);
