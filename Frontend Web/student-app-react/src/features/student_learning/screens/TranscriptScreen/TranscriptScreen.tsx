import { Breadcrumb } from "antd";
import { memo } from "react";
import { Link } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import { LearningPaths } from "features/student_learning/student_learning";

const TranscriptScreen = () => {
  return (
    <div className="pl-55 pt-30">
      <Breadcrumb className="font-18">
        <Breadcrumb.Item>
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item>Transcript</Breadcrumb.Item>
      </Breadcrumb>
      <ul>
        <li className="pt-20 pb-20">
          <Link
            to={LearningPaths.QUIZ_MARKS()}
            className="text-link-blue"
          >
            Online test scores
          </Link>
        </li>
        <li className="pb-20">
          <Link
            to={LearningPaths.MARKS()}
            className="text-link-blue"
          >
            Test scores in class
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default memo(TranscriptScreen);
