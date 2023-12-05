import { Form, Input, Modal, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { SubmitButton } from "components/SubmitButton";
import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import mess from "messages/messages.json";
import { AxiosResponse } from "axios";
import {
  ClassesPaths,
  Subject,
  SubjectStatusType,
} from "features/staff_classes/staff_classes";
import TextArea from "antd/es/input/TextArea";
import { requireRules } from "helpers/validations.helper";

const FormCreateEditSubject = ({
  isEditScreen = false,
  subject,
  onSubmit,
}: {
  isEditScreen?: boolean;
  subject?: Subject | null;
  onSubmit: (data: Subject) => Promise<AxiosResponse<any, any>>;
}) => {
  const [form] = useForm();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isEditScreen) {
      form.setFieldsValue({
        ...subject,
      });
    }
  }, [form, subject, isEditScreen]);

  const handleSubmit = () => {
    setIsSubmitting(true);
    onSubmit({
      ...form.getFieldsValue(),
    })
      .then(() => navigate(ClassesPaths.SUBJECTS()))
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsModalOpen(false);
        setIsSubmitting(false);
      });
  };

  return (
    <div>
      <Form
        form={form}
        name="wrap"
        labelCol={{ flex: "150px" }}
        labelAlign="left"
        labelWrap
        wrapperCol={{ flex: 1 }}
        colon={false}
        style={{ maxWidth: 450 }}
        onFinish={() => setIsModalOpen(true)}
      >
        {isEditScreen && (
          <Form.Item label="Id:" name="id">
            <Input disabled />
          </Form.Item>
        )}
        <Form.Item
          label="Subject Name:"
          name="subjectName"
          rules={[...requireRules(mess.fe_12)]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description:"
          name="subjectDescription"
          rules={[...requireRules(mess.fe_13)]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Subject Status:" name="subjectStatus" required>
          <Select
            defaultValue={SubjectStatusType.Open}
            options={[
              { value: SubjectStatusType.Close, label: "Disable" },
              { value: SubjectStatusType.Open, label: "Enable" },
            ]}
          />
        </Form.Item>
        <Form.Item label="Note:" name="note">
          <TextArea />
        </Form.Item>
        <Form.Item label=" ">
          <SubmitButton form={form} text="Save" isSubmitting={isSubmitting} />
        </Form.Item>
      </Form>
      <Modal
        centered
        title={
          isEditScreen
            ? "Are you sure edit this subject ?"
            : "Are you sure create new subject ?"
        }
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

export default memo(FormCreateEditSubject);
