import { memo, useEffect, useMemo, useState } from "react";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Divider, Radio, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "redux/store";
import { RootState } from "redux/root-reducer";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import { getQuiz } from "features/teacher_teaching/redux/teaching.slice";
import Title from "antd/es/typography/Title";
import { TeachingPaths } from "features/teacher_teaching/teaching.types";

const QuizDetailScreen = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const {
    teaching: { quiz },
  } = useAppSelector((state: RootState) => state);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getQuiz(Number(id)))
      .unwrap()
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch]);

  const questionList = useMemo(() => {
    return quiz?.data.questions?.map((question, index) => {
      return (
        <div
          key={question.id}
          className="pb-20"
          style={{ minWidth: 500, paddingRight: 60 }}
        >
          <Typography>
            {index + 1}. {question.questionText} ({question.point} point)
          </Typography>
          <Radio.Group>
            {question.answers.map((answer) => {
              return (
                <div>
                  <Radio value={answer.id}>{answer.answerText}</Radio>
                </div>
              );
            })}
          </Radio.Group>
        </div>
      );
    });
  }, [quiz?.data]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="pl-65 pt-30 pr-70 pb-100">
      <Breadcrumb className="font-18">
        <Breadcrumb.Item>
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item
          className="cursor-pointer"
          onClick={() => navigate(TeachingPaths.QUIZZES())}
        >
          Quizzes
        </Breadcrumb.Item>
        <Breadcrumb.Item>Quizz Detail</Breadcrumb.Item>
      </Breadcrumb>
      <div>
        <div className="flex-space-between flex-align-center">
          <div>
            <Title level={5}>{quiz?.data.name}</Title>
            <Typography className="font-14">
              - Duration: {quiz?.data.duration}
            </Typography>
            <Typography className="font-14">
              - Total Questions: {quiz?.data.totalQuestion}
            </Typography>
            <Typography className="font-14">
              - Total Points: {quiz?.data.totalPoint}
            </Typography>
          </div>
        </div>
        <div>
          <Divider>List Questions</Divider>
          <div className="flex flex-wrap">{questionList}</div>
        </div>
      </div>
    </div>
  );
};

export default memo(QuizDetailScreen);
