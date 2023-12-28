import {
  HomeOutlined,
  SnippetsOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Pagination,
  Table,
  Typography,
  Image,
} from "antd";
import { memo, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "redux/store";
import { useNavigate } from "react-router-dom";
import { TopPaths } from "features/staff_top/staff_top";
import Search from "antd/es/input/Search";
import { RootState } from "redux/root-reducer";
import { RequestParams } from "types/param.types";
import {
  UserPaths,
  getStaffs,
  COLUMNS_TABLE_STAFFS,
  GenderType,
  UserStatusType,
} from "features/staff_users/staff_users";

const StaffScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const pageSize = 20;
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
        <Button
          onClick={() => navigate(UserPaths.GET_STAFF(staff.id))}
        >
          <Typography>
            <span>
              <SnippetsOutlined />
            </span>{" "}
            Detail
          </Typography>
        </Button>
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
  }, [dispatch, page, pageSize, search]);

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
      <div className="flex gap-150">
        <Typography>Total: There are {staffs?.totalRecords} staffs</Typography>
        <Search
          placeholder="staffs's first name"
          allowClear
          enterButton
          size="large"
          onSearch={(value) => setSearch(value)}
          style={{ width: 350 }}
        />
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
    </div>
  );
};

export default memo(StaffScreen);
