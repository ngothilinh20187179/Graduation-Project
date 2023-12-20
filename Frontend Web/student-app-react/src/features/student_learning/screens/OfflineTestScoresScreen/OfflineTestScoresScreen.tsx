import { memo, useEffect, useMemo, useState } from "react";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Pagination, Table } from "antd";
import { COLUMNS_TABLE_OFFLINE_TEST_SCORES, LearningPaths } from "features/student_learning/student_learning";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "redux/store";
import { RootState } from "redux/root-reducer";
import { RequestParams } from "types/param.types";
import { getAllOfflineTestScores } from "features/student_learning/redux/learning.slice";
import { getTimeUTC } from "helpers/utils.helper";

const OfflineTestScoresScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const pageSize = 20;
  
  const {
    learning: { offlineTestScores },
  } = useAppSelector((state: RootState) => state);

  const offlineTestScoreList = useMemo(() => {
    return offlineTestScores?.data?.map((offlineTestScore, index) => ({
      ...offlineTestScore,
      index: index + 1,
      created: getTimeUTC(offlineTestScore?.created)
    }));
  }, [offlineTestScores?.data]);

  useEffect(() => {
    const params: RequestParams = {
      page,
      pageSize,
    };
    setIsLoading(true);
    dispatch(getAllOfflineTestScores(params))
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
        <Breadcrumb.Item>Test scores in class</Breadcrumb.Item>
      </Breadcrumb>
      <Table
        bordered
        rowKey="id"
        size="small"
        loading={isLoading}
        columns={COLUMNS_TABLE_OFFLINE_TEST_SCORES()}
        dataSource={offlineTestScoreList}
        pagination={false}
        className="mt-20"
        scroll={{ y: 320, x: 400 }}
      />
      <Pagination
        className="flex-justify-center mt-20"
        current={offlineTestScores?.pageNumber}
        onChange={(newPage) => setPage(newPage)}
        total={Number(offlineTestScores?.totalPages) * 10}
      />
    </div>
  );
};

export default memo(OfflineTestScoresScreen);
