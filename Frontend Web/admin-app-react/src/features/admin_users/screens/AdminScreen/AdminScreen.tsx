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
  getAdmins,
  restricteAccount,
} from "features/admin_users/admin_users";
import { unwrapResult } from "@reduxjs/toolkit";
import { SettingPaths } from "features/admin_setting/admin_setting";

// TODO: 
// Test khi lock someone -> đang ko redirect tới login, login lại ko tbao là bị lock
// add search, page, pageSize on url

const AdminScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [adminIdSelected, setAdminIdSelected] = useState<number | null>(null);
  const [adminStatusSelected, setAdminStatusSelected] =
    useState<UserStatusType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [triggerReload, setTriggerReload] = useState<boolean>(false);

  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [search, setSearch] = useState<string>();

  const {
    users: { admins },
  } = useAppSelector((state: RootState) => state);

  const adminList = useMemo(() => {
    return admins?.data?.map((admin, index) => ({
      ...admin,
      index: index + 1,
      avatar: admin?.avatar ? (
        <Image
          width={40}
          preview={false}
          src={`data:${admin.avatar.mediaType};base64,${admin.avatar.data}`}
        />
      ) : (
        <Avatar size={40} icon={<UserOutlined />} />
      ),
      userStatus:
        admin.userStatus === UserStatusType.UnLock ? (
          <Badge status="success" text="UnLock" />
        ) : (
          <Badge status="error" text="Lock" />
        ),
      gender:
        admin.gender === GenderType.Female ? (
          "Female"
        ) : admin.gender === GenderType.Male ? (
          "Male"
        ) : (
          "Unknown"
        ),
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
                onClick: () => {
                  if(admin.id === Number(userId)) {
                    navigate(SettingPaths.MY_PROFILE())
                  }
                  else {
                    navigate(UserPaths.GET_ADMIN(admin.id))
                  }
                },
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
                onClick: () => {
                  if(admin.id === Number(userId)) {
                    navigate(SettingPaths.CHANGE_INFORMATION())
                  }
                  else {
                    navigate(UserPaths.EDIT_ADMIN(admin.id))
                  }
                },
              },
              {
                key: "3",
                label: (
                  <>
                    {admin.userStatus === UserStatusType.UnLock ? (
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
                  setAdminIdSelected(Number(admin.id));
                  setAdminStatusSelected(admin.userStatus);
                },
              },
            ],
          }}
        >
          Action
        </DropdownButton>
      ),
    }));
  }, [admins?.data, navigate, userId]);

  useEffect(() => {
    const params: RequestParams = {
      page,
      pageSize,
      search,
    };
    setIsLoading(true);
    dispatch(getAdmins(params))
      .unwrap()
      .finally(() => setIsLoading(false));
  }, [dispatch, triggerReload, page, pageSize, search]);

  const handleLockOrUnLock = () => {
    if (adminIdSelected == null || adminStatusSelected == null) return;
    setIsSubmitting(true);
    setIsLoading(true);
    let userStatusType = adminStatusSelected === UserStatusType.Lock ? UserStatusType.UnLock : UserStatusType.Lock;
    dispatch(
      restricteAccount({
        id: adminIdSelected,
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
        setAdminIdSelected(null);
        setAdminStatusSelected(null);
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
        <Breadcrumb.Item>Admins</Breadcrumb.Item>
      </Breadcrumb>
      <div className="flex-space-between-center">
        <Typography>Total: There are {admins?.totalRecords} admins</Typography>
        <Search
          placeholder="admin's last name"
          allowClear
          enterButton
          size="large"
          onSearch={(value) => setSearch(value)}
          style={{ width: 350 }}
        />
        <Button
          type="primary"
          style={{ height: 40 }}
          onClick={() => navigate(UserPaths.CREATE_ADMIN())}
        >
          New Admin
        </Button>
      </div>
      <Table
        bordered
        rowKey="id"
        size="small"
        loading={isLoading}
        columns={COLUMNS_TABLE_ADMINS()}
        dataSource={adminList}
        pagination={false}
        className="mt-20"
        scroll={{ y: 320, x: 400 }}
      />
      <Pagination
        className="flex-justify-center mt-20"
        current={admins?.pageNumber}
        onChange={(newPage) => setPage(newPage)}
        total={Number(admins?.totalPages) * 10}
      />
      <Modal
        centered
        title={
          adminStatusSelected === UserStatusType.UnLock
            ? "Are you sure you want to lock this admin?"
            : "Are you sure you want to unlock this admin?"
        }
        open={!!adminIdSelected}
        onCancel={() => {
          setAdminIdSelected(null);
          setAdminStatusSelected(null);
        }}
        onOk={handleLockOrUnLock}
        okButtonProps={{
          disabled: isSubmitting,
        }}
      />
    </div>
  );
};

export default memo(AdminScreen);
