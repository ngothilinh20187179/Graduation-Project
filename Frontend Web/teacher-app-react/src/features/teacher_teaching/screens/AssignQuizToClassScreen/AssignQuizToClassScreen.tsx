import { memo, useEffect, useState } from "react";
import { HomeOutlined } from "@ant-design/icons";
import {
  Breadcrumb,
  Form,
  Input,
  Modal,
  Radio,
  Select,
  Spin,
  Typography,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "redux/store";
import {
  ClassNameAndId,
  TeachingPaths,
} from "features/teacher_teaching/teaching.types";
import { useForm } from "antd/es/form/Form";
import { SubmitButton } from "components/SubmitButton";
import { unwrapResult } from "@reduxjs/toolkit";
import { assignClasses, getAssignableClasses } from "features/teacher_teaching/redux/teaching.slice";

const AssignQuizToClassScreen = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [form] = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ClassNameAndId[]>([]);

  useEffect(() => {
    setLoading(true);
    dispatch(getAssignableClasses(Number(id)))
      .then(unwrapResult)
      .then((body) => {
        setData(body.data);
        setLoading(false);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [dispatch]);

  const handleSendNotification = () => {
    dispatch(
      assignClasses({
        ...form.getFieldsValue(),
        quizId: Number(id),
      })
    )
      .unwrap()
      .then(() => navigate(TeachingPaths.QUIZZES()))
      .finally(() => {
        setIsSubmitting(false);
        setIsModalOpen(false);
      });
  };

  return (
    <div className="pl-65 pt-30 pr-70 pb-100">
      <Breadcrumb className="pb-30 font-18">
        <Breadcrumb.Item>
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item
          className="cursor-pointer"
          onClick={() => navigate(TeachingPaths.QUIZZES())}
        >
          Quizzes
        </Breadcrumb.Item>
        <Breadcrumb.Item>Assign Quiz</Breadcrumb.Item>
      </Breadcrumb>

      <Form
        form={form}
        name="wrap"
        labelCol={{ flex: "200px" }}
        labelAlign="left"
        labelWrap
        colon={false}
        style={{ maxWidth: 600 }}
        onFinish={() => setIsModalOpen(true)}
      >
        <Form.Item required label="Quiz Id" name="quizId">
          <Input disabled value={Number(id)} />
        </Form.Item>

        <Form.Item
          label="Assignable Classes"
          name="classId"
          required
          rules={[{ required: true, message: "Please select class!" }]}
        >
          <Select
            mode="multiple"
            allowClear
            placeholder="Please select classes"
            notFoundContent={loading ? <Spin size="small" /> : null}
          >
            {data.map((option) => (
              <Select.Option key={option.id} value={option.id}>
                Id: {option.id} - ClassName: {option.className}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label=" ">
          <SubmitButton form={form} text="Submit" isSubmitting={isSubmitting} />
        </Form.Item>
      </Form>
      <Modal
        centered
        title="Are you sure you want to assign this quiz to these classes ?"
        open={isModalOpen}
        onOk={handleSendNotification}
        onCancel={() => setIsModalOpen(false)}
        okButtonProps={{
          disabled: isSubmitting,
        }}
      />
    </div>
  );
};

export default memo(AssignQuizToClassScreen);
