import { memo, useMemo, useState } from "react";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Divider, Modal, Radio, RadioChangeEvent, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "redux/store";
import { RootState } from "redux/root-reducer";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import {
  getQuiz,
  submitExam,
} from "features/student_learning/redux/learning.slice";
import {
  LearningPaths,
  QuestionResult,
  Questions,
  QuizSubmit,
} from "features/student_learning/student_learning";
import Title from "antd/es/typography/Title";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const TakeTheTestScreen = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmTakeTestModalOpen, setIsConfirmTakeTestModalOpen] =
    useState<boolean>(true);
  const [seconds, setSeconds] = useState<number>(0);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);
  const [questionAndAnswersSubmit, setQuestionAndAnswersSubmit] = useState<
    QuestionResult[]
  >([]);

  const {
    learning: { quiz },
  } = useAppSelector((state: RootState) => state);

  const handleGetTheTest = () => {
    setIsConfirmTakeTestModalOpen(false);
    setIsLoading(true);
    dispatch(getQuiz(Number(id)))
      .unwrap()
      .then((body) => {
        let time = body.data.duration;
        let arr = time.split(":");
        setSeconds(
          parseInt(arr[0]) * 3600 + parseInt(arr[1]) * 60 + parseInt(arr[2])
        );
        let listQuestions = body.data.questions;
        listQuestions.map((question: Questions) => {
          questionAndAnswersSubmit.push({ questionId: question.id, answerIds: [] });
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const updateQuestionAndAnswersSubmit = (questionId: number, answerId: number) => {
    const index = questionAndAnswersSubmit.findIndex((question) => question.questionId === questionId);
    questionAndAnswersSubmit[index] = {questionId, answerIds: [answerId]}
  };

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
          <Radio.Group onChange={(e: RadioChangeEvent) => {
            updateQuestionAndAnswersSubmit(question.id, e.target.value)
          }}>
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

  const children = (remainingTime: any) => {
    const hours = Math.floor(remainingTime / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = remainingTime % 60;
    return `${hours} : ${minutes} : ${seconds}`;
  };

  const handleSubmitTheTest = () => {
    setIsSubmitModalOpen(false);
    const data: QuizSubmit = {
      id: Number(id),
      questions: questionAndAnswersSubmit,
    };
    dispatch(submitExam(data))
      .unwrap()
      .finally(() => {
        navigate(LearningPaths.QUIZ_MARKS());
      });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="pl-65 pt-30 pr-70 pb-100">
      <Breadcrumb className="font-18">
        <Breadcrumb.Item>
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item>Take The Test</Breadcrumb.Item>
      </Breadcrumb>
      {!isConfirmTakeTestModalOpen && (
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
              <Typography style={{ color: "red", fontSize: 14 }}>
                Be careful not to click outside the test range (The test will be
                submitted if you do that)
              </Typography>
            </div>
            <div>
              <CountdownCircleTimer
                isPlaying
                duration={seconds}
                colors="#6497c0"
                size={120}
                onComplete={handleSubmitTheTest}
              >
                {({ remainingTime }) => children(remainingTime)}
              </CountdownCircleTimer>
            </div>
          </div>
          <div>
            <Divider>List Questions</Divider>
            <div className="flex flex-wrap">{questionList}</div>
          </div>
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => setIsSubmitModalOpen(true)}
          >
            Submit
          </Button>
        </div>
      )}
      <Modal
        centered
        title="Are you sure?"
        open={isConfirmTakeTestModalOpen}
        okText="Confirm"
        onCancel={() => {
          navigate(LearningPaths.MY_TESTS());
        }}
        maskClosable={false}
        onOk={handleGetTheTest}
      >
        <Typography>
          Do you really want to take this test? This process cannot be undone
        </Typography>
      </Modal>
      <Modal
        centered
        title="Are you sure?"
        open={isSubmitModalOpen}
        okText="Submit"
        onCancel={() => {
          setIsSubmitModalOpen(false);
        }}
        maskClosable={false}
        onOk={handleSubmitTheTest}
      >
        <Typography>
          Do you really want to submit this test? This process cannot be undone
        </Typography>
      </Modal>
    </div>
  );
};

export default memo(TakeTheTestScreen);
