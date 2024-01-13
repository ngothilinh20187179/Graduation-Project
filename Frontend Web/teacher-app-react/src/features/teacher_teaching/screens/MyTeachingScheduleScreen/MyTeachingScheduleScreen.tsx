import { memo, useEffect, useState } from "react";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { useAppDispatch, useAppSelector } from "redux/store";
import { unwrapResult } from "@reduxjs/toolkit";
import { getMyTeachingSchedule } from "features/teacher_teaching/redux/teaching.slice";
import { RootState } from "redux/root-reducer";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";

const MyTeachingScheduleScreen = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const {
    teaching: { myTeachingSchedule },
  } = useAppSelector((state: RootState) => state);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getMyTeachingSchedule())
      .then(unwrapResult)
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="pl-55 pt-30 pr-55 pb-40">
      <Breadcrumb className="font-18 pb-20">
        <Breadcrumb.Item>
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item>My Teaching Schedule</Breadcrumb.Item>
      </Breadcrumb>
      {/* <Table
        bordered
        rowKey="id"
        size="small"
        loading={isLoading}
        columns={COLUMNS_TABLE_OFFLINE_TEST_SCORES()}
        dataSource={offlineTestScoreList}
        pagination={false}
        className="mt-20"
        scroll={{ y: 320, x: 400 }}
      /> */}
    </div>
  );
};

export default memo(MyTeachingScheduleScreen);
