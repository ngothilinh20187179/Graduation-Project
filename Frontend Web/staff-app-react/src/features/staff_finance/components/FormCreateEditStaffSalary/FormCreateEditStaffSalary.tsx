import { Form, Input, InputNumber, Modal, Select, Spin } from "antd";
import { useForm } from "antd/es/form/Form";
import { SubmitButton } from "components/SubmitButton";
import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import mess from "messages/messages.json";
import { AxiosResponse } from "axios";
import TextArea from "antd/es/input/TextArea";
import { requireRule } from "helpers/validations.helper";
import { CreateEditStaffSalary, StaffSalary } from "features/staff_finance/types/finance.types";
import { FinancePaths } from "features/staff_finance/staff_finance";
import { UserIdAndName } from "features/staff_users/types/users.types";
import { useAppDispatch } from "redux/store";
import { getStaffsList } from "features/staff_users/staff_users";

const FormCreateEditStaffSalary = ({
  isEditScreen = false,
  staffSalary,
  onSubmit,
}: {
  isEditScreen?: boolean;
  staffSalary?: StaffSalary | null;
  onSubmit: (data: CreateEditStaffSalary) => Promise<AxiosResponse<any, any>>;
}) => {
  const [form] = useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [staffList, setStaffList] = useState<UserIdAndName[]>([]);

  useEffect(() => {
    setLoading(true);
    dispatch(getStaffsList())
      .unwrap()
      .then()
      .then((body) => {
        setStaffList(body.data);
        setLoading(false);
      })
      .finally(() => setLoading(false));
    if (isEditScreen) {
      form.setFieldsValue({
        ...staffSalary,
      });
    }
  }, [dispatch, form, staffSalary, isEditScreen]);

  const handleSubmit = () => {
    setIsSubmitting(true);
    onSubmit({
      ...form.getFieldsValue(),
    })
      .then(() => navigate(FinancePaths.STAFF_SALARY()))
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
        <Form.Item label="Staff" name="staffId" required 
          rules={[...requireRule(mess.fe_35)]}>
            <Select
              allowClear
              placeholder="Please select staff"
              notFoundContent={loading ? <Spin size="small" /> : null}
            >
              {staffList.map((option) => (
                <Select.Option key={option.id} value={option.id}>
                  Id: {option.id} - {option.lastName} {option.firstName}
                </Select.Option>
              ))}
            </Select>
        </Form.Item>
        <Form.Item
          label="Month:"
          name="month"
          rules={[...requireRule(mess.fe_31)]}
        >
          <InputNumber placeholder="1 to 13" min={1} max={13}/>
        </Form.Item>
        <Form.Item
          label="Work Days/Month:"
          name="workDaysInMonth"
          required
          rules={[...requireRule(mess.fe_36)]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          label="Staff's Worked Days:"
          name="totalDaysWorked"
          required
          rules={[...requireRule(mess.fe_37)]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          label="Total Hours:"
          name="totalHoursWorked"
          required
          rules={[...requireRule(mess.fe_32)]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          label="Bonus:"
          name="bonus"
          required
          rules={[...requireRule(mess.fe_33)]}
        >
          <InputNumber min={0} placeholder="VNĐ"/>
        </Form.Item>
        <Form.Item
          label="Total:"
          name="total"
          required
          rules={[...requireRule(mess.fe_34)]}
        >
          <InputNumber min={0} placeholder="VNĐ"/>
        </Form.Item>
        <Form.Item label="Status:" name="isPaid">
            <Select
              defaultValue={staffSalary?.isPaid === true ? "Paid" : "Not Paid"}
              options={[
                { value: true, label: "Paid" },
                { value: false, label: "Not Paid" },
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
            ? "Are you sure edit this staff's salary ?"
            : "Are you sure create new staff's salary ?"
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

export default memo(FormCreateEditStaffSalary);
