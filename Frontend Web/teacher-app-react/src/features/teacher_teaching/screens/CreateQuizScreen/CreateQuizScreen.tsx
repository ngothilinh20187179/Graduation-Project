import { HomeOutlined, CloseOutlined } from "@ant-design/icons";
import { memo, useState } from "react";
import { useAppDispatch } from "redux/store";
import { useNavigate } from "react-router-dom";
import { TeachingPaths } from "features/teacher_teaching/teaching.types";
import { useForm } from "antd/es/form/Form";
import {
  Breadcrumb,
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Space,
  TimePicker,
  Typography,
} from "antd";
import { SubmitButton } from "components/SubmitButton";
import { createQuiz } from "features/teacher_teaching/redux/teaching.slice";
import { formatTimeUTC } from "helpers/utils.helper";

const CreateQuizScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form] = useForm();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleCreateQuiz = () => {
    dispatch(createQuiz({ 
        ...form.getFieldsValue(),
        duration: formatTimeUTC(form.getFieldValue("duration"))
       }))
        .unwrap()
        .then(() => navigate(TeachingPaths.QUIZZES()))
        .finally(() => {
          setIsSubmitting(false);
          setIsModalOpen(false);
        });
  };

  return (
    <div className="pt-30 pl-40 pr-30">
      <Breadcrumb className="pb-20 font-18">
        <Breadcrumb.Item>
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item
          className="cursor-pointer"
          onClick={() => navigate(TeachingPaths.QUIZZES())}
        >
          Quizzes
        </Breadcrumb.Item>
        <Breadcrumb.Item>Create Quiz</Breadcrumb.Item>
      </Breadcrumb>
      <Form
        form={form}
        style={{ maxWidth: 600 }}
        autoComplete="off"
        initialValues={{ items: [{}] }}
        layout="vertical"
        className="pl-30"
        onFinish={() => setIsModalOpen(true)}
      >
        <Row gutter={[40, 0]}>
          <Col xs={24} xl={8} style={{ maxWidth: 600 }}>
            <Form.Item
              label="Name of quiz"
              name="name"
              rules={[{ required: true, message: "Missing name of quiz" }]}
            >
              <Input style={{ minWidth: 365 }} />
            </Form.Item>
          </Col>
          <Col xs={24} xl={8} style={{ maxWidth: 500 }}>
            <Form.Item
              label="Time:"
              name="duration"
              rules={[{ required: true, message: "Missing time of quiz" }]}
            >
              <TimePicker />
            </Form.Item>
          </Col>
        </Row>
        <Form.List
          name="questions"
          rules={[
            {
              validator: async (_, questions) => {
                if (!questions || questions.length < 1) {
                  return Promise.reject(new Error("At least 1 question"));
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }) => (
            <div
              style={{ display: "flex", rowGap: 16, flexDirection: "column" }}
            >
              {fields.map((field) => (
                <Card
                  size="small"
                  title={`Question ${field.name + 1}`}
                  key={field.key}
                  extra={
                    <CloseOutlined
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  }
                >
                  <div className="flex-space-between">
                    <Form.Item
                      label="Question Text"
                      name={[field.name, "questionText"]}
                      rules={[
                        { required: true, message: "Missing question text" },
                      ]}
                    >
                      <Input style={{ minWidth: 355 }} />
                    </Form.Item>
                    <Form.Item
                      label="Point"
                      name={[field.name, "point"]}
                      rules={[{ required: true, message: "Missing point of question" }]}
                    >
                      <InputNumber min={1} style={{ minWidth: 150 }} />
                    </Form.Item>
                  </div>

                  {/* Nest Form.List */}
                  <Form.Item label="Answers" required>
                    <Form.List
                      name={[field.name, "answers"]}
                      rules={[
                        {
                          validator: async (_, answers) => {
                            if (!answers || answers.length < 1) {
                              return Promise.reject(
                                new Error("At least 1 answer")
                              );
                            }
                          },
                        },
                      ]}
                    >
                      {(subFields, subOpt) => (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            rowGap: 16,
                          }}
                        >
                          {subFields.map((subField) => (
                            <Space key={subField.key}>
                              <Form.Item
                                noStyle
                                name={[subField.name, "isCorrect"]}
                                valuePropName="checked"
                                initialValue={false}
                              >
                                <Checkbox></Checkbox>
                              </Form.Item>
                              <Form.Item
                                noStyle
                                name={[subField.name, "answerText"]}
                                rules={[{ required: true, message: "Missing answer text" }]}
                              >
                                <Input
                                  placeholder="Answer text"
                                  style={{ minWidth: 355 }}
                                />
                              </Form.Item>
                              <CloseOutlined
                                onClick={() => {
                                  subOpt.remove(subField.name);
                                }}
                              />
                            </Space>
                          ))}
                          <Button
                            type="dashed"
                            onClick={() => subOpt.add()}
                            block
                          >
                            + Add Answer
                          </Button>
                        </div>
                      )}
                    </Form.List>
                  </Form.Item>
                </Card>
              ))}

              <Button type="dashed" onClick={() => add()} block>
                + Add Question
              </Button>
            </div>
          )}
        </Form.List>

        {/* <Form.Item noStyle shouldUpdate>
          {() => (
            <Typography>
              <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
            </Typography>
          )}
        </Form.Item> */}
        <Row className="pt-20">
          <Form.Item>
            <Space>
              <SubmitButton
                form={form}
                text="Save"
                isSubmitting={isSubmitting}
              />
            </Space>
          </Form.Item>
        </Row>
      </Form>
      <Modal
        centered
        title="Are you sure to create this quiz?"
        open={isModalOpen}
        okText="Save"
        onCancel={() => setIsModalOpen(false)}
        onOk={handleCreateQuiz}
        okButtonProps={{
          disabled: isSubmitting,
        }}
      />
    </div>
  );
};

export default memo(CreateQuizScreen);
