import {
  HomeOutlined,
  SnippetsOutlined,
  TeamOutlined,
  CheckOutlined,
  FontColorsOutlined
} from "@ant-design/icons";
import { Badge, Breadcrumb, Pagination, Table, Typography } from "antd";
import { memo, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "redux/store";
import { useNavigate } from "react-router-dom";
import Search from "antd/es/input/Search";
import { RootState } from "redux/root-reducer";
import { RequestParams } from "types/param.types";
import { numberWithCommas } from "helpers/utils.helper";
import {
  COLUMNS_TABLE_CLASSES,
  ClassStatusType,
  TeachingPaths,
} from "features/teacher_teaching/teaching.types";
import { getClasses } from "features/teacher_teaching/redux/teaching.slice";
import DropdownButton from "components/DropdownButton/DropdownButton";

const ClassesScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const pageSize = 20;
  const [search, setSearch] = useState<string>();

  const {
    teaching: { classes },
  } = useAppSelector((state: RootState) => state);

  const classList = useMemo(() => {
    return classes?.data?.map((item, index) => ({
      ...item,
      index: index + 1,
      credit: `${numberWithCommas(item.credit)} (VNĐ)`,
      classStatus:
        item.classStatus === ClassStatusType.InProgress ? (
          <Badge status="processing" text="In Progress" />
        ) : item.classStatus === ClassStatusType.End ? (
          <Badge status="success" text="End" />
        ) : item.classStatus === ClassStatusType.Stop ? (
          <Badge status="error" text="Stop" />
        ) : (
          <Badge status="default" text="Not Start" />
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
                  navigate(TeachingPaths.GET_CLASS(Number(item.id)));
                },
              },
              {
                key: "2",
                label: (
                  <>
                    <Typography>
                      <span>
                        <TeamOutlined />
                      </span>{" "}
                      List Students
                    </Typography>
                  </>
                ),
                onClick: () => {
                  navigate(TeachingPaths.LIST_STUDENTS(Number(item.id)));
                },
              },
              {
                key: "3",
                label: (
                  <>
                    <Typography>
                      <span>
                        <CheckOutlined />
                      </span>{" "}
                      Take Attendance
                    </Typography>
                  </>
                ),
                onClick: () => {
                  navigate(TeachingPaths.TAKE_ATTENDANCE(Number(item.id)));
                },
              },
              {
                key: "4",
                label: (
                  <>
                    <Typography>
                      <span>
                        <FontColorsOutlined />
                      </span>{" "}
                      Enter Transcript
                    </Typography>
                  </>
                ),
                onClick: () => {
                  navigate(TeachingPaths.ENTER_TRANSCRIPT(Number(item.id)));
                },
              },
            ],
          }}
        >
          Action
        </DropdownButton>
      ),
    }));
  }, [classes?.data, navigate]);

  useEffect(() => {
    const params: RequestParams = {
      page,
      pageSize,
      search,
    };
    setIsLoading(true);
    dispatch(getClasses(params))
      .unwrap()
      .finally(() => setIsLoading(false));
  }, [dispatch, page, pageSize, search]);

  return (
    <div className="pt-30 pl-40 pr-30">
      <Breadcrumb className="pb-20 font-18">
        <Breadcrumb.Item>
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item>Classes</Breadcrumb.Item>
      </Breadcrumb>
      <div className="flex-align-center">
        <Typography className="mr-150">
          Total: There are {classes?.totalRecords} classes
        </Typography>
        <Search
          placeholder="classname"
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
        columns={COLUMNS_TABLE_CLASSES()}
        dataSource={classList}
        pagination={false}
        className="mt-20"
        scroll={{ y: 320, x: 400 }}
      />
      <Pagination
        className="flex-justify-center mt-20"
        current={classes?.pageNumber}
        onChange={(newPage) => setPage(newPage)}
        total={Number(classes?.totalPages) * 10}
      />
    </div>
  );
};

export default memo(ClassesScreen);
