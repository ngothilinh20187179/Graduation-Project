import {
  Avatar,
  Breadcrumb,
  Descriptions,
  Image,
  Typography,
} from "antd";
import { memo, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "redux/store";
import { RootState } from "redux/root-reducer";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import Title from "antd/es/typography/Title";
import { numberWithCommas } from "helpers/utils.helper";
import { BasicTeacherInfo, ClassSchedules, DayOfWeek, LearningPaths } from "features/student_learning/student_learning";
import { getClass } from "features/student_learning/redux/notification.slice";

const ClassDetailScreen = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [classSchedules, setClassSchedules] = useState<ClassSchedules[]>([]);
  const [teachers, setTeachers] = useState<BasicTeacherInfo[]>([]);

  const {
    learning: { classDetail },
  } = useAppSelector((state: RootState) => state);

  const classSchedulesList = useMemo(() => {
    return classSchedules?.map((classSchedule) => (
      <>
        <Descriptions className="ml-20">
          <Descriptions.Item label="Day Of Week">{DayOfWeek[Number(classSchedule?.dayOfWeek)]}</Descriptions.Item>
          <Descriptions.Item label="Period">{classSchedule?.period}</Descriptions.Item>
          <Descriptions.Item label="Room Name">{classSchedule?.roomName}</Descriptions.Item>
        </Descriptions>
      </>
    ));
  }, [classSchedules]);

  const teachersList = useMemo(() => {
    return teachers?.map((teacher) => (
      <div className="ml-20 flex gap-10">
        <div>
          {teacher?.avatar ? (
            <Image
            width={40}
            preview={false}
            src={`data:${teacher.avatar.mediaType};base64,${teacher.avatar.data}`}
          />
          ) : (
            <Avatar size={40} icon={<UserOutlined />} />
          )}
        </div>
        <div>
          <Typography className="font-14">Id: {teacher.id}</Typography>
          <Typography className="font-14">{teacher.lastName} {teacher.firstName}</Typography>
        </div>
      </div>
    ));
  }, [teachers]);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getClass(Number(id)))
      .unwrap()
      .then((body) => {
        setClassSchedules(body.data.classSchedules);
        setTeachers(body.data.teachers);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch, id]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="pl-55 pt-30">
      <Breadcrumb className="pb-30 font-18">
        <Breadcrumb.Item>
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item
          className="cursor-pointer"
          onClick={() => navigate(LearningPaths.CLASSES())}
        >
          Classes
        </Breadcrumb.Item>
        <Breadcrumb.Item>Class Detail</Breadcrumb.Item>
      </Breadcrumb>
      <Descriptions className="ml-20" title="Subject Of Class">
        <Descriptions.Item label="Id">
          {classDetail?.data.subject.id}
        </Descriptions.Item>
        <Descriptions.Item label="Name">
          {classDetail?.data.subject.subjectName}
        </Descriptions.Item>
        <Descriptions.Item label="Description">
          {classDetail?.data.subject.subjectDescription}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions title="Basic Class Info" className="ml-20">
        <Descriptions.Item label="Id">{classDetail?.data.id}</Descriptions.Item>
        <Descriptions.Item label="Classname">
          {classDetail?.data.className}
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          {classDetail?.data.classStatus === 0
            ? "Not Start"
            : classDetail?.data.classStatus === 1
            ? "In Progress"
            : classDetail?.data.classStatus === 2
            ? "Stop"
            : classDetail?.data.classStatus === 3
            ? "End"
            : ""}
        </Descriptions.Item>
        <Descriptions.Item label="Class's Start Date">
          {classDetail?.data.classStartDate}
        </Descriptions.Item>
        <Descriptions.Item label="Class's End Date">
          {classDetail?.data.classEndDate}
        </Descriptions.Item>
        <Descriptions.Item label="Sessions">
          {classDetail?.data.numberOfSessions}
        </Descriptions.Item>
        <Descriptions.Item label="Max Students">
          {classDetail?.data.numberOfStudents}
        </Descriptions.Item>
        <Descriptions.Item label="Credit">
          {numberWithCommas(Number(classDetail?.data.credit))} VNĐ
        </Descriptions.Item>
        <Descriptions.Item label="Note">
          {classDetail?.data.note}
        </Descriptions.Item>
      </Descriptions>
      <div className="pb-20">
        <Title className="ml-20 mt-20" level={5}>
          Class Schedules
        </Title>
        {classSchedulesList}
      </div>
      <div>
        {teachersList.length !== 0 ? (
          <Title className="ml-20 mt-20 pb-10" level={5}>
            Teachers In Class
          </Title>
        ) : ("")}
        <div className="flex gap-190">
        {teachersList}
        </div>
      </div>
    </div>
  );
};

export default memo(ClassDetailScreen);
