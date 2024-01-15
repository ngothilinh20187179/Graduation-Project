import { memo, useEffect, useState } from "react";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Descriptions } from "antd";
import { useAppDispatch, useAppSelector } from "redux/store";
import { unwrapResult } from "@reduxjs/toolkit";
import { RootState } from "redux/root-reducer";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import Title from "antd/es/typography/Title";
import Typography from "antd/es/typography/Typography";
import { DayOfWeek } from "features/student_learning/constants/learning.contants";
import { getMyLearningSchedule } from "features/student_learning/redux/learning.slice";

const MyLearningScheduleScreen = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    learning: { myLearningSchedule },
  } = useAppSelector((state: RootState) => state);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getMyLearningSchedule())
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
        <Breadcrumb.Item>My Learning Schedule</Breadcrumb.Item>
      </Breadcrumb>
      <div>
        {myLearningSchedule &&
          myLearningSchedule?.data.map((schedule) => {
            return (
              <div key={schedule.id}>
                <Title level={5}>{schedule.className}</Title>
                <Typography className="ml-7 mb-10">Class Schedules:</Typography>
                {schedule.schedules.map((classSchedule) => {
                  return (
                    <>
                      <Descriptions className="ml-20">
                        <Descriptions.Item label="Day Of Week">
                          {DayOfWeek[Number(classSchedule?.dayOfWeek)]}
                        </Descriptions.Item>
                        <Descriptions.Item label="Period">
                          {classSchedule?.period}{" "}
                          {classSchedule?.period === 1
                            ? "(8h-10h)"
                            : classSchedule?.period === 2
                            ? "(10h-12h)"
                            : classSchedule?.period === 3
                            ? "(12h-14h)"
                            : classSchedule?.period === 4
                            ? "(14h-16h)"
                            : classSchedule?.period === 5
                            ? "(16h-18h)"
                            : classSchedule?.period === 6
                            ? "(18h-20h)"
                            : classSchedule?.period === 7
                            ? "(20h-22h)"
                            : ""}
                        </Descriptions.Item>
                        <Descriptions.Item label="Room Name">
                          {classSchedule?.roomName}
                        </Descriptions.Item>
                      </Descriptions>
                    </>
                  );
                })}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default memo(MyLearningScheduleScreen);
