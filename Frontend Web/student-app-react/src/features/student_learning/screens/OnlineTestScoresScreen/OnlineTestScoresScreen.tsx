import { Breadcrumb, Pagination, Table } from "antd";
import { memo, useEffect, useMemo, useState } from "react";
import { HomeOutlined } from "@ant-design/icons";
import { COLUMNS_TABLE_ONLINE_TEST_SCORES, LearningPaths } from "features/student_learning/student_learning";
import { useNavigate } from "react-router-dom";
import { RequestParams } from "types/param.types";
import { useAppDispatch, useAppSelector } from "redux/store";
import { RootState } from "redux/root-reducer";
import { getAllOnlineTestScores } from "features/student_learning/redux/notification.slice";
import { getTimeUTC } from "helpers/utils.helper";

const OnlineTestScoresScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const pageSize = 20;
  
  const {
    learning: { onlineTestScores },
  } = useAppSelector((state: RootState) => state);

  const onlineTestScoreList = useMemo(() => {
    return onlineTestScores?.data?.map((onlineTestScore, index) => ({
      ...onlineTestScore,
      index: index + 1,
      created: getTimeUTC(onlineTestScore?.created),
    }));
  }, [onlineTestScores?.data]);

  useEffect(() => {
    const params: RequestParams = {
      page,
      pageSize,
    };
    setIsLoading(true);
    dispatch(getAllOnlineTestScores(params))
      .unwrap()
      .finally(() => setIsLoading(false));
  }, [dispatch, page, pageSize]);

  return (
    <div className="pl-55 pt-30 pr-55">
      <Breadcrumb className="font-18">
        <Breadcrumb.Item>
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item
          className="cursor-pointer"
          onClick={() => navigate(LearningPaths.TRANSCRIPT())}>
            Transcript
        </Breadcrumb.Item>
        <Breadcrumb.Item>Online test scores</Breadcrumb.Item>
      </Breadcrumb>
      <Table
          bordered
          rowKey="id"
          size="small"
          loading={isLoading}
          columns={COLUMNS_TABLE_ONLINE_TEST_SCORES()}
          dataSource={onlineTestScoreList}
          pagination={false}
          className="mt-20"
          scroll={{ y: 320, x: 400 }}
        />
        <Pagination
          className="flex-justify-center mt-20"
          current={onlineTestScores?.pageNumber}
          onChange={(newPage) => setPage(newPage)}
          total={Number(onlineTestScores?.totalPages) * 10}
        />
    </div>
  );
};

export default memo(OnlineTestScoresScreen);
