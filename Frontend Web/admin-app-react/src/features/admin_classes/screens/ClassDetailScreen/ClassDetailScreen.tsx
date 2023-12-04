import {
  Avatar,
  Badge,
  Breadcrumb,
  Descriptions,
  Image,
  Modal,
  Pagination,
  Table,
  Typography,
} from "antd";
import { TopPaths } from "features/admin_top/admin_top";
import { memo, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  HomeOutlined,
  UserOutlined,
  SnippetsOutlined,
  EditOutlined,
  LockOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "redux/store";
import { RootState } from "redux/root-reducer";
import { unwrapResult } from "@reduxjs/toolkit";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import {
  BasicTeacherInfo,
  ClassSchedules,
  ClassesPaths,
  DayOfWeek,
  getClass,
} from "features/admin_classes/admin_classes";
import Title from "antd/es/typography/Title";
import {
  UserPaths,
  getStudentsInClass,
  restricteAccount,
} from "features/admin_users/admin_users";
import {
  GenderType,
  UserStatusType,
  COLUMNS_TABLE_ADMINS,
} from "features/admin_auth/admin_auth";
import DropdownButton from "components/DropdownButton/DropdownButton";

const ClassDetailScreen = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [studentIdSelected, setStudentIdSelected] = useState<number | null>(
    null
  );
  const [studentStatusSelected, setStudentStatusSelected] =
    useState<UserStatusType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [triggerReload, setTriggerReload] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [classSchedules, setClassSchedules] = useState<ClassSchedules[]>([]);
  const [teachers, setTeachers] = useState<BasicTeacherInfo[]>([]);

  const {
    classes: { classDetail },
  } = useAppSelector((state: RootState) => state);

  const {
    users: { students },
  } = useAppSelector((state: RootState) => state);

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
      action: (
        <DropdownButton
          menuProps={{
            items: [
              {
                key: "1",
                label: (
                  <>
                    <Typography>
                      <span>
                        <SnippetsOutlined />
                      </span>{" "}
                      Detail
                    </Typography>
                  </>
                ),
                onClick: () => navigate(UserPaths.GET_STUDENT(student.id)),
              },
              {
                key: "2",
                label: (
                  <>
                    <Typography>
                      <span>
                        <EditOutlined />
                      </span>{" "}
                      Edit
                    </Typography>
                  </>
                ),
                onClick: () => navigate(UserPaths.EDIT_STUDENT(student.id)),
              },
              {
                key: "3",
                label: (
                  <>
                    {student.userStatus === UserStatusType.UnLock ? (
                      <Typography>
                        <span>
                          <LockOutlined />
                        </span>{" "}
                        Lock
                      </Typography>
                    ) : (
                      <Typography>
                        <span>
                          <UnlockOutlined />
                        </span>{" "}
                        UnLock
                      </Typography>
                    )}
                  </>
                ),
                onClick: () => {
                  setStudentIdSelected(Number(student.id));
                  setStudentStatusSelected(student.userStatus);
                },
              },
            ],
          }}
        >
          Action
        </DropdownButton>
      ),
    }));
  }, [students?.data, navigate]);

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
      });
    dispatch(getStudentsInClass(Number(id)))
      .then(unwrapResult)
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch, triggerReload, page, pageSize]);

  const handleLockOrUnLock = () => {
    if (studentIdSelected === null || studentStatusSelected === null) return;
    setIsSubmitting(true);
    setIsLoading(true);
    let userStatusType =
      studentStatusSelected === UserStatusType.Lock
        ? UserStatusType.UnLock
        : UserStatusType.Lock;
    dispatch(
      restricteAccount({
        id: studentIdSelected,
        userStatusType: userStatusType,
      })
    )
      .then(unwrapResult)
      .then(() => {
        setTriggerReload(!triggerReload);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsSubmitting(false);
        setIsLoading(false);
        setStudentIdSelected(null);
        setStudentStatusSelected(null);
      });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="pl-55 pt-30">
      <Breadcrumb className="pb-30 font-18">
        <Breadcrumb.Item
          className="cursor-pointer"
          onClick={() => navigate(TopPaths.TOP())}
        >
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item
          className="cursor-pointer"
          onClick={() => navigate(ClassesPaths.CLASSES())}
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
          {classDetail?.data.credit} VNĐ
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
        <Title className="ml-20 mt-20 pb-10" level={5}>
          Teachers In Class
        </Title>
        <div className="flex gap-190">
        {teachersList}
        </div>
      </div>
      <div className="ml-20 mt-20 mr-30">
        <Title level={5}>Students In Class</Title>
        <Table
          bordered
          rowKey="id"
          size="small"
          loading={isLoading}
          columns={COLUMNS_TABLE_ADMINS()}
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
        <Modal
          centered
          title={
            studentStatusSelected === UserStatusType.UnLock
              ? "Are you sure you want to lock this student?"
              : "Are you sure you want to unlock this student?"
          }
          open={!!studentIdSelected}
          onCancel={() => {
            setStudentIdSelected(null);
            setStudentStatusSelected(null);
          }}
          onOk={handleLockOrUnLock}
          okButtonProps={{
            disabled: isSubmitting,
          }}
        />
      </div>
    </div>
  );
};

export default memo(ClassDetailScreen);
