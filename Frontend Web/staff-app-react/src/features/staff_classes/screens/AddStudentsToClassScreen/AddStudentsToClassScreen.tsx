import { Breadcrumb, Form, Input, Modal, Select, Spin } from "antd";
import { TopPaths } from "features/staff_top/staff_top";
import { memo, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import { useAppDispatch } from "redux/store";
import { ClassesPaths, addStudentsToClass } from "features/staff_classes/staff_classes";
import {
  UserIdAndName,
  getStudentsAvailable,
} from "features/staff_users/staff_users";
import { useForm } from "antd/es/form/Form";
import { SubmitButton } from "components/SubmitButton";

const AddStudentsToClassScreen = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { id } = useParams();
  const [form] = useForm();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [data, setData] = useState<UserIdAndName[]>([]);
  const [loadingStudents, setLoadingStudents] = useState(false);

  useEffect(() => {
    setLoadingStudents(true);
    dispatch(getStudentsAvailable(Number(id)))
      .unwrap()
      .then((body) => {
        setData(body.data);
      })
      .finally(() => {
        setLoadingStudents(false);
      });
  }, []);

  const handleSubmit = () => {
    setIsSubmitting(true);
    dispatch(
      addStudentsToClass({
        ...form.getFieldsValue(),
      })
    )
      .unwrap()
      .then(() => navigate(ClassesPaths.GET_CLASS(Number(id))))
      .finally(() => {
        setIsSubmitting(false);
        setIsModalOpen(false);
      });
  };

  return (
    <div className="pl-55 pt-30">
      <Breadcrumb className="pb-30 font-18">
        <Breadcrumb.Item
          className="cursor-pointer"
          onClick={() => navigate(TopPaths.TOP())}
        >
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item
          className="cursor-pointer"
          onClick={() => navigate(ClassesPaths.CLASSES())}
        >
          Classes
        </Breadcrumb.Item>
        <Breadcrumb.Item>Add Students</Breadcrumb.Item>
      </Breadcrumb>
      <Form
        form={form}
        name="wrap"
        labelCol={{ flex: "100px" }}
        labelAlign="left"
        labelWrap
        colon={false}
        style={{ maxWidth: 600 }}
        onFinish={() => setIsModalOpen(true)}
      >
        <Form.Item label="Class Id" name="classId" initialValue={Number(id)}>
          <Input disabled value={Number(id)}/>
        </Form.Item>
        <Form.Item
          label="Students"
          name="studentId"
          required
          rules={[
            {
              validator: async (_, students) => {
                if (!students || students.length < 1) {
                  return Promise.reject(new Error("At least 1 student"));
                }
              },
            },
          ]}
        >
          <Select
            mode="multiple"
            allowClear
            placeholder="Students available to add this class"
            notFoundContent={loadingStudents ? <Spin size="small" /> : null}
            maxTagCount={10}
          >
            {data.map((option) => (
              <Select.Option key={option.id} value={option.id}>
                Id: {option.id} - {option.firstName} {option.lastName}
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
        title="Are you sure to add these students to class?"
        open={isModalOpen}
        okText="Save"
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSubmit}
        okButtonProps={{
          disabled: isSubmitting,
        }}
      />
    </div>
  );
};

export default memo(AddStudentsToClassScreen);
