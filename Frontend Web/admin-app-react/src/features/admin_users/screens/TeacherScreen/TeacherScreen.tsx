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
    getTeachers,
    restricteAccount,
  } from "features/admin_users/admin_users";
  import { unwrapResult } from "@reduxjs/toolkit";
  
  const TeacherScreen = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [teacherIdSelected, setTeacherIdSelected] = useState<number | null>(null);
    const [teacherStatusSelected, setTeacherStatusSelected] =
      useState<UserStatusType | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [triggerReload, setTriggerReload] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(20);
    const [search, setSearch] = useState<string>();
  
    const {
      users: { teachers },
    } = useAppSelector((state: RootState) => state);
    
    const teacherList = useMemo(() => {
      return teachers?.data?.map((teacher, index) => ({
        ...teacher,
        index: index + 1,
        avatar: teacher?.avatar ? (
          <Image
            width={40}
            preview={false}
            src={`data:${teacher.avatar.mediaType};base64,${teacher.avatar.data}`}
          />
        ) : (
          <Avatar size={40} icon={<UserOutlined />} />
        ),
        userStatus:
          teacher.userStatus === UserStatusType.UnLock ? (
            <Badge status="success" text="UnLock" />
          ) : (
            <Badge status="error" text="Lock" />
          ),
        gender:
          teacher.gender === GenderType.Female
            ? "Female"
            : teacher.gender === GenderType.Male
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
                  onClick: () => navigate(UserPaths.GET_TEACHER(teacher.id))
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
                  onClick: () => navigate(UserPaths.EDIT_TEACHER(teacher.id))
                },
                {
                  key: "3",
                  label: (
                    <>
                      {teacher.userStatus === UserStatusType.UnLock ? (
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
                    setTeacherIdSelected(Number(teacher.id));
                    setTeacherStatusSelected(teacher.userStatus);
                  },
                },
              ],
            }}
          >
            Action
          </DropdownButton>
        ),
      }));
    }, [teachers?.data, navigate]);
  
    useEffect(() => {
      const params: RequestParams = {
        page,
        pageSize,
        search,
      };
      setIsLoading(true);
      dispatch(getTeachers(params))
        .unwrap()
        .finally(() => setIsLoading(false));
    }, [dispatch, triggerReload, page, pageSize, search]);
  
    const handleLockOrUnLock = () => {
      if (teacherIdSelected === null || teacherStatusSelected === null) return;
      setIsSubmitting(true);
      setIsLoading(true);
      let userStatusType =
          teacherStatusSelected === UserStatusType.Lock
          ? UserStatusType.UnLock
          : UserStatusType.Lock;
      dispatch(
        restricteAccount({
          id: teacherIdSelected,
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
          setTeacherIdSelected(null);
          setTeacherStatusSelected(null);
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
          <Breadcrumb.Item>Teachers</Breadcrumb.Item>
        </Breadcrumb>
        <div className="flex-space-between-center">
          <Typography>Total: There are {teachers?.totalRecords} teachers</Typography>
          <Search
            placeholder="teachers's first name"
            allowClear
            enterButton
            size="large"
            onSearch={(value) => setSearch(value)}
            style={{ width: 350 }}
          />
          <Button
            type="primary"
            style={{ height: 40 }}
            onClick={() => navigate(UserPaths.CREATE_TEACHER())}
          >
            New Teacher
          </Button>
        </div>
        <Table
          bordered
          rowKey="id"
          size="small"
          loading={isLoading}
          columns={COLUMNS_TABLE_ADMINS()}
          dataSource={teacherList}
          pagination={false}
          className="mt-20"
          scroll={{ y: 320, x: 400 }}
        />
        <Pagination
          className="flex-justify-center mt-20"
          current={teachers?.pageNumber}
          onChange={(newPage) => setPage(newPage)}
          total={Number(teachers?.totalPages) * 10}
        />
        <Modal
          centered
          title={
              teacherStatusSelected === UserStatusType.UnLock
              ? "Are you sure you want to lock this teacher?"
              : "Are you sure you want to unlock this teacher?"
          }
          open={!!teacherIdSelected}
          onCancel={() => {
            setTeacherIdSelected(null);
            setTeacherStatusSelected(null);
          }}
          onOk={handleLockOrUnLock}
          okButtonProps={{
            disabled: isSubmitting,
          }}
        />
      </div>
    );
  };
  
  export default memo(TeacherScreen);
  