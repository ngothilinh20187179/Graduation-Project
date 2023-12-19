import {
  HomeOutlined,
  EditOutlined,
  LockOutlined,
  UnlockOutlined,
  SnippetsOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Modal,
  Pagination,
  Table,
  Typography,
  Image,
} from "antd";
import { memo, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "redux/store";
import { useNavigate } from "react-router-dom";
import { TopPaths } from "features/admin_top/admin_top";
import Search from "antd/es/input/Search";
import { RootState } from "redux/root-reducer";
import DropdownButton from "components/DropdownButton/DropdownButton";
import { RequestParams } from "types/param.types";
import {
    COLUMNS_TABLE_ADMINS,
  GenderType,
  UserStatusType,
} from "features/admin_auth/admin_auth";
import {
  UserPaths,
  getStudents,
  restricteAccount,
} from "features/admin_users/admin_users";
import { unwrapResult } from "@reduxjs/toolkit";

const StudentScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [studentIdSelected, setStudentIdSelected] = useState<number | null>(null);
  const [studentStatusSelected, setStudentStatusSelected] =
    useState<UserStatusType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [triggerReload, setTriggerReload] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const pageSize = 20;
  const [search, setSearch] = useState<string>();

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
                onClick: () => navigate(UserPaths.GET_STUDENT(student.id))
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
                onClick: () => navigate(UserPaths.EDIT_STUDENT(student.id))
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

  useEffect(() => {
    const params: RequestParams = {
      page,
      pageSize,
      search,
    };
    setIsLoading(true);
    dispatch(getStudents(params))
      .unwrap()
      .finally(() => setIsLoading(false));
  }, [dispatch, triggerReload, page, pageSize, search]);

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

  return (
    <div className="pt-30 pl-55 pr-55">
      <Breadcrumb className="pb-20 font-18">
        <Breadcrumb.Item
          className="cursor-pointer"
          onClick={() => navigate(TopPaths.TOP())}
        >
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item>Students</Breadcrumb.Item>
      </Breadcrumb>
      <div className="flex-space-between-center">
        <Typography>Total: There are {students?.totalRecords} students</Typography>
        <Search
          placeholder="students's first name"
          allowClear
          enterButton
          size="large"
          onSearch={(value) => setSearch(value)}
          style={{ width: 350 }}
        />
        <Button
          type="primary"
          style={{ height: 40 }}
          onClick={() => navigate(UserPaths.CREATE_STUDENT())}
        >
          New Student
        </Button>
      </div>
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
  );
};

export default memo(StudentScreen);
