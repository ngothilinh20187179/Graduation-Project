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
  COLUMNS_TABLE_STAFFS,
  GenderType,
  UserStatusType,
} from "features/admin_auth/admin_auth";
import {
  UserPaths,
  getStaffs,
  restricteAccount,
} from "features/admin_users/admin_users";
import { unwrapResult } from "@reduxjs/toolkit";

const StaffScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [staffIdSelected, setStaffIdSelected] = useState<number | null>(null);
  const [staffStatusSelected, setStaffStatusSelected] =
    useState<UserStatusType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [triggerReload, setTriggerReload] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [search, setSearch] = useState<string>();

  const {
    users: { staffs },
  } = useAppSelector((state: RootState) => state);
  
  const staffList = useMemo(() => {
    return staffs?.data?.map((staff, index) => ({
      ...staff,
      index: index + 1,
      avatar: staff?.avatar ? (
        <Image
          width={40}
          preview={false}
          src={`data:${staff.avatar.mediaType};base64,${staff.avatar.data}`}
        />
      ) : (
        <Avatar size={40} icon={<UserOutlined />} />
      ),
      userStatus:
        staff.userStatus === UserStatusType.UnLock ? (
          <Badge status="success" text="UnLock" />
        ) : (
          <Badge status="error" text="Lock" />
        ),
      gender:
        staff.gender === GenderType.Female
          ? "Female"
          : staff.gender === GenderType.Male
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
                onClick: () => navigate(UserPaths.GET_STAFF(staff.id))
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
                onClick: () => navigate(UserPaths.EDIT_STAFF(staff.id))
              },
              {
                key: "3",
                label: (
                  <>
                    {staff.userStatus === UserStatusType.UnLock ? (
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
                  setStaffIdSelected(Number(staff.id));
                  setStaffStatusSelected(staff.userStatus);
                },
              },
            ],
          }}
        >
          Action
        </DropdownButton>
      ),
    }));
  }, [staffs?.data, navigate]);

  useEffect(() => {
    const params: RequestParams = {
      page,
      pageSize,
      search,
    };
    setIsLoading(true);
    dispatch(getStaffs(params))
      .unwrap()
      .finally(() => setIsLoading(false));
  }, [dispatch, triggerReload, page, pageSize, search]);

  const handleLockOrUnLock = () => {
    if (staffIdSelected === null || staffStatusSelected === null) return;
    setIsSubmitting(true);
    setIsLoading(true);
    let userStatusType =
        staffStatusSelected === UserStatusType.Lock
        ? UserStatusType.UnLock
        : UserStatusType.Lock;
    dispatch(
      restricteAccount({
        id: staffIdSelected,
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
        setStaffIdSelected(null);
        setStaffStatusSelected(null);
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
        <Breadcrumb.Item>Staffs</Breadcrumb.Item>
      </Breadcrumb>
      <div className="flex-space-between-center">
        <Typography>Total: There are {staffs?.totalRecords} staffs</Typography>
        <Search
          placeholder="staffs's first name"
          allowClear
          enterButton
          size="large"
          onSearch={(value) => setSearch(value)}
          style={{ width: 350 }}
        />
        <Button
          type="primary"
          style={{ height: 40 }}
          onClick={() => navigate(UserPaths.CREATE_STAFF())}
        >
          New Staff
        </Button>
      </div>
      <Table
        bordered
        rowKey="id"
        size="small"
        loading={isLoading}
        columns={COLUMNS_TABLE_STAFFS()}
        dataSource={staffList}
        pagination={false}
        className="mt-20"
        scroll={{ y: 320, x: 400 }}
      />
      <Pagination
        className="flex-justify-center mt-20"
        current={staffs?.pageNumber}
        onChange={(newPage) => setPage(newPage)}
        total={Number(staffs?.totalPages) * 10}
      />
      <Modal
        centered
        title={
            staffStatusSelected === UserStatusType.UnLock
            ? "Are you sure you want to lock this staff?"
            : "Are you sure you want to unlock this staff?"
        }
        open={!!staffIdSelected}
        onCancel={() => {
          setStaffIdSelected(null);
          setStaffStatusSelected(null);
        }}
        onOk={handleLockOrUnLock}
        okButtonProps={{
          disabled: isSubmitting,
        }}
      />
    </div>
  );
};

export default memo(StaffScreen);
