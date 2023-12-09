import { Form, Input, InputNumber, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import { SubmitButton } from "components/SubmitButton";
import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import mess from "messages/messages.json";
import { AxiosResponse } from "axios";
import { requireRule, requireRules } from "helpers/validations.helper";
import { Position, PositionPaths } from "features/admin_position/admin_position";

const FormCreateEditPosition = ({
  isEditScreen = false,
  position,
  onSubmit,
}: {
  isEditScreen?: boolean;
  position?: Position | null;
  onSubmit: (data: Position) => Promise<AxiosResponse<any, any>>;
}) => {
  const [form] = useForm();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isEditScreen) {
      form.setFieldsValue({
        ...position,
      });
    }
  }, [form, position, isEditScreen]);

  const handleSubmit = () => {
    setIsSubmitting(true);
    onSubmit({
      ...form.getFieldsValue(),
    })
      .then(() => navigate(PositionPaths.POSITIONS()))
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
          label="Position Name:"
          name="name"
          rules={[...requireRules(mess.fe_22)]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Salary Min:"
          name="salaryMin"
          required
          rules={[...requireRule(mess.fe_23)]}
        >
          <InputNumber style={{width: 150}} placeholder="VNĐ/month" min={0} />
        </Form.Item>
        <Form.Item
          label="Salary Max:"
          name="salaryMax"
          required
          rules={[...requireRule(mess.fe_24)]}
        >
          <InputNumber style={{width: 150}} placeholder="VNĐ/month" min={0} />
        </Form.Item>
        <Form.Item
          label="Hourly Rate:"
          name="hourlyRate"
          required
          rules={[...requireRule(mess.fe_25)]}
        >
          <InputNumber style={{width: 150}} placeholder="VNĐ/hour" min={0} />
        </Form.Item>
        <Form.Item label=" ">
          <SubmitButton form={form} text="Save" isSubmitting={isSubmitting} />
        </Form.Item>
      </Form>
      <Modal
        centered
        title={
          isEditScreen
            ? "Are you sure edit this position ?"
            : "Are you sure create new position ?"
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

export default memo(FormCreateEditPosition);
