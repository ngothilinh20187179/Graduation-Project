import { memo, useEffect, useMemo, useState } from "react";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Pagination, Table, Typography } from "antd";
import {
  COLUMNS_TABLE_TESTS,
  LearningPaths,
} from "features/student_learning/student_learning";
import { useAppDispatch, useAppSelector } from "redux/store";
import { RootState } from "redux/root-reducer";
import { RequestParams } from "types/param.types";
import { getMyTests } from "features/student_learning/redux/learning.slice";
import { getTimeUTC } from "helpers/utils.helper";
import Search from "antd/es/input/Search";
import { useNavigate } from "react-router-dom";

const MyTestsScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const pageSize = 20;
  const [search, setSearch] = useState<string>();

  const {
    learning: { myTests },
  } = useAppSelector((state: RootState) => state);

  const myTestList = useMemo(() => {
    return myTests?.data?.map((myTest, index) => ({
      ...myTest,
      index: index + 1,
      created: getTimeUTC(myTest?.created),
      action: (
        <Button
          onClick={() => navigate(LearningPaths.GET_QUIZ(Number(myTest.id)))}
        >
          Begin Test
        </Button>
      ),
    }));
  }, [myTests?.data, navigate]);

  useEffect(() => {
    const params: RequestParams = {
      page,
      pageSize,
    };
    setIsLoading(true);
    dispatch(getMyTests(params))
      .unwrap()
      .finally(() => setIsLoading(false));
  }, [dispatch, page, pageSize, search]);

  return (
    <div className="pl-55 pt-30 pr-55">
      <Breadcrumb className="pb-20 font-18">
        <Breadcrumb.Item>
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item>My Tests</Breadcrumb.Item>
      </Breadcrumb>
      <div className="flex-align-center">
        <Typography className="mr-150">
          Total: There are {myTests?.totalRecords} tests
        </Typography>
        <Search
          placeholder="test name"
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
        columns={COLUMNS_TABLE_TESTS()}
        dataSource={myTestList}
        pagination={false}
        className="mt-20"
        scroll={{ y: 320, x: 400 }}
      />
      <Pagination
        className="flex-justify-center mt-20"
        current={myTests?.pageNumber}
        onChange={(newPage) => setPage(newPage)}
        total={Number(myTests?.totalPages) * 10}
      />
    </div>
  );
};

export default memo(MyTestsScreen);
