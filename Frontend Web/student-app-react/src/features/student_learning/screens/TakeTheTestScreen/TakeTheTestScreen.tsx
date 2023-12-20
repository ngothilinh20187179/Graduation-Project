import { memo, useMemo, useState } from "react";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Divider, Modal, Radio, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "redux/store";
import { RootState } from "redux/root-reducer";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import { getQuiz } from "features/student_learning/redux/learning.slice";
import { LearningPaths } from "features/student_learning/student_learning";
import Title from "antd/es/typography/Title";

const TakeTheTestScreen = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);

  const {
    learning: { quiz },
  } = useAppSelector((state: RootState) => state);

  const handleGetTheTest = () => {
    setIsModalOpen(false);
    setIsLoading(true);
    dispatch(getQuiz(Number(id)))
      .unwrap()
      .then((body) => {
        console.log(body.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const questionList = useMemo(() => {
    return quiz?.data.questions?.map((question, index) => {
      return (
        <div key={question.id} className="pb-20" style={{ minWidth: 500, paddingRight: 60 }}>
          <Typography>
            {index + 1}. {question.questionText} ({question.point} point)
          </Typography>
          {question.answers.map((answer) => {
            return (
              <div>
                <Radio value={answer.id}>{answer.answerText}</Radio>
              </div>
            )
          })}
          {/* <Checkbox
            defaultChecked={checked}
            value={permission.id}
            disabled={isDisabled}
            onChange={(e: CheckboxChangeEvent) => {
              var checked = e.target.checked;
              if (checked) {
                if (!checkedPermissionIds.includes(permission.id)) {
                  setCheckedPermissionIds([
                    ...checkedPermissionIds,
                    permission.id,
                  ]);
                }
              } else {
                setCheckedPermissionIds(
                  checkedPermissionIds.filter((item) => item !== permission.id)
                );
              }
            }}
          >
            {permission.name}
          </Checkbox> */}
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
        <Breadcrumb.Item>Take The Test</Breadcrumb.Item>
      </Breadcrumb>
      {!isModalOpen && (
        <div>
          <div className="flex-space-between">
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
            <div>Duration</div>
          </div>
          <div>
            <Divider>List Questions</Divider>
            <div className="flex flex-wrap">
              {questionList}
            </div>
          </div>
          <Button type="primary" htmlType="submit">Submit</Button>
        </div>
      )}
      <Modal
        centered
        title="Are you sure?"
        open={isModalOpen}
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
    </div>
  );
};

export default memo(TakeTheTestScreen);
