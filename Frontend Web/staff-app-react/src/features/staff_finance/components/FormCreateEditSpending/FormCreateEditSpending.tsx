import { Form, Input, InputNumber, Modal, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { SubmitButton } from "components/SubmitButton";
import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import mess from "messages/messages.json";
import { AxiosResponse } from "axios";
import TextArea from "antd/es/input/TextArea";
import { requireRule, requireRules } from "helpers/validations.helper";
import { CreateEditSpending, Spending } from "features/staff_finance/types/finance.types";
import { FinancePaths } from "features/staff_finance/staff_finance";

const FormCreateEditSpending = ({
  isEditScreen = false,
  spending,
  onSubmit,
}: {
  isEditScreen?: boolean;
  spending?: Spending | null;
  onSubmit: (data: CreateEditSpending) => Promise<AxiosResponse<any, any>>;
}) => {
  const [form] = useForm();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isEditScreen) {
      form.setFieldsValue({
        ...spending,
      });
    }
  }, [form, spending, isEditScreen]);

  const handleSubmit = () => {
    setIsSubmitting(true);
    onSubmit({
      ...form.getFieldsValue(),
    })
      .then(() => navigate(FinancePaths.SPENDING()))
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
          label="Spend On:"
          name="spendOn"
          rules={[...requireRules(mess.fe_26)]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Budget:"
          name="budget"
          required
          rules={[...requireRule(mess.fe_27)]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item label="Description:" name="description">
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
            ? "Are you sure edit this spending ?"
            : "Are you sure create new spending ?"
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

export default memo(FormCreateEditSpending);
