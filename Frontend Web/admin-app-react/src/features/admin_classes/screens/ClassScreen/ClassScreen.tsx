import { HomeOutlined, SnippetsOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Pagination, Table, Typography } from "antd";
import { memo, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "redux/store";
import { useNavigate } from "react-router-dom";
import { TopPaths } from "features/admin_top/admin_top";
import Search from "antd/es/input/Search";
import { RootState } from "redux/root-reducer";
import { RequestParams } from "types/param.types";
import {
  COLUMNS_TABLE_CLASSES,
  ClassesPaths,
  getClasses,
} from "features/admin_classes/admin_classes";

const ClassScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [search, setSearch] = useState<string>();

  const {
    classes: { classes },
  } = useAppSelector((state: RootState) => state);

  const classList = useMemo(() => {
    return classes?.data?.map((item, index) => ({
      ...item,
      index: index + 1,
      credit: `${item.credit} (VNĐ)`,
      action: (
        <Button
          onClick={() => navigate(ClassesPaths.GET_CLASS(Number(item.id)))}
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
    <div className="pt-30 pl-55 pr-55">
      <Breadcrumb className="pb-20 font-18">
        <Breadcrumb.Item
          className="cursor-pointer"
          onClick={() => navigate(TopPaths.TOP())}
        >
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

export default memo(ClassScreen);
