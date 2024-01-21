import { Breadcrumb, Progress, Space, Tooltip } from "antd";
import { TopPaths } from "features/admin_top/constants/top.paths";
import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "redux/store";
import { HomeOutlined } from "@ant-design/icons";
import { RootState } from "redux/root-reducer";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import { getGenderStudentStatistical } from "features/admin_setting/redux/setting.slice";
import Title from "antd/es/typography/Title";

const StatisticalScreen = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    setting: { genderStudentStatistical },
  } = useAppSelector((state: RootState) => state);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getGenderStudentStatistical())
      .unwrap()
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  if (isLoading) return <LoadingSpinner />;

  console.log(genderStudentStatistical);

  return (
    <div className="pt-30 pl-55 pr-55">
      <Breadcrumb className="pb-20 font-18">
        <Breadcrumb.Item
          className="cursor-pointer"
          onClick={() => navigate(TopPaths.TOP())}
        >
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item>Statistical</Breadcrumb.Item>
      </Breadcrumb>
      <div>
        <Title className="mt-10" level={5}>
          Student gender statistics
        </Title>
        <Space className="ml-10 mt-10" wrap>
          <Tooltip className="mr-20" title="3 done / 3 in progress / 4 to do">
            <Progress
              percent={100}
              success={{ percent: genderStudentStatistical?.girlPercents }}
              type="circle"
            />
          </Tooltip>
          <div>
            <div className="mb-7">
              Total number of students:{" "}
              {genderStudentStatistical?.totalNumberOfStudents}
            </div>
            <div className="mb-7">
              Number of boys: {genderStudentStatistical?.numberOfBoys}
            </div>
            <div className="mb-7">
              Number of girls: {genderStudentStatistical?.numberOfGirls}
            </div>
            <div className="mb-7">
              Boy percents: {genderStudentStatistical?.boyPercents} %
            </div>
            <div className="mb-7">
              Girl percents: {genderStudentStatistical?.girlPercents} %
            </div>
          </div>
        </Space>
      </div>
    </div>
  );
};

export default memo(StatisticalScreen);
