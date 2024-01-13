import { memo, useEffect, useMemo, useState } from "react";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Breadcrumb,
  Pagination,
  Table,
  Image,
  Descriptions,
  Button,
  Modal,
  Typography,
  Form,
  Input,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "redux/store";
import { RootState } from "redux/root-reducer";
import { RequestParams } from "types/param.types";
import { getTimeUTC } from "helpers/utils.helper";
import { TeachingPaths } from "features/teacher_teaching/constants/teaching.paths";
import { COLUMNS_TABLE_OFFLINE_TEST_SCORES } from "features/teacher_teaching/constants/teaching.constants";
import { getAllOfflineTestScores, updateMark } from "features/teacher_teaching/redux/teaching.slice";
import { getStudentById } from "features/teacher_users/teacher_users";
import { unwrapResult } from "@reduxjs/toolkit";
import styles from "./OnlineTestScoresScreen.module.scss";
import Title from "antd/es/typography/Title";
import { SubmitButton } from "components/SubmitButton";
import { useForm } from "antd/es/form/Form";
import { requireRules } from "helpers/validations.helper";
import mess from "messages/messages.json";
import { ToastNotification } from "components/ToastNotification";

const OfflineTestScoresScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = useForm();

  const [page, setPage] = useState<number>(1);
  const pageSize = 20;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [markId, setMarkId] = useState<number | null>(null);
  const [point, setPoint] = useState<number>(0);
  const [maxPoint, setMaxPoint] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [triggerReload, setTriggerReload] = useState<boolean>(false);

  const {
    teaching: { offlineTestScores },
  } = useAppSelector((state: RootState) => state);

  const {
    users: { student },
  } = useAppSelector((state: RootState) => state);

  const offlineTestScoreList = useMemo(() => {
    return offlineTestScores?.data?.map((offlineTestScore, index) => ({
      ...offlineTestScore,
      index: index + 1,
      created: getTimeUTC(offlineTestScore?.created),
      action: (
        <Button
          onClick={() => {
            setMarkId(offlineTestScore.id);
            setPoint(offlineTestScore.point);
            setMaxPoint(offlineTestScore.totalPoint);
            setIsModalOpen(true);
          }}
        >
          Edit Test Score
        </Button>
      ),
    }));
  }, [offlineTestScores?.data]);

  useEffect(() => {
    const params: RequestParams = {
      page,
      pageSize,
      id: Number(id),
    };
    setIsLoading(true);
    dispatch(getAllOfflineTestScores(params));
    dispatch(getStudentById(Number(id)))
      .then(unwrapResult)
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch, id, page, pageSize, triggerReload]);

  const handleEditMark = () => {
    console.log(form.getFieldValue("point"));
    var newPoint = form.getFieldValue("point")
    if (markId === null) return
    if (newPoint > maxPoint) {
      return ToastNotification({
        type: "error",
        message: "This score is greater than the maximum score",
      });
    }
    setIsSubmitting(true);
    dispatch(updateMark({ 
      point: newPoint,
      id: markId
     }))
      .unwrap()
      .then(() => {
        setTriggerReload(!triggerReload);
      })
      .finally(() => {
        setIsSubmitting(false);
        setIsModalOpen(false);
      });
  };

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
        <Breadcrumb.Item>Student Offline Test Scores</Breadcrumb.Item>
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
        </Descriptions>
      </div>
      <Table
        bordered
        rowKey="id"
        size="small"
        loading={isLoading}
        columns={COLUMNS_TABLE_OFFLINE_TEST_SCORES()}
        dataSource={offlineTestScoreList}
        pagination={false}
        className="mt-20"
        scroll={{ y: 320, x: 400 }}
      />
      <Pagination
        className="flex-justify-center mt-20"
        current={offlineTestScores?.pageNumber}
        onChange={(newPage) => setPage(newPage)}
        total={Number(offlineTestScores?.totalPages) * 10}
      />
      <Modal
        centered
        title="Edit offline test score?"
        open={isModalOpen}
        footer={null}
        onCancel={() => {
          setIsModalOpen(false);
        }}
      >
        <div className="flex-justify-center gap-20 mt-30">
          <Form form={form} onFinish={handleEditMark}>
            <Form.Item className="pl-12" name="point" rules={requireRules(mess.fe_14)}>
              <Input type="number" defaultValue={point}/>
            </Form.Item>
            <Form.Item label=" ">
              <SubmitButton
                form={form}
                text="Save"
                isSubmitting={isSubmitting}
              />
            </Form.Item>
          </Form>
          <Typography>Max Point: {maxPoint}</Typography>
        </div>
      </Modal>
    </div>
  );
};

export default memo(OfflineTestScoresScreen);
