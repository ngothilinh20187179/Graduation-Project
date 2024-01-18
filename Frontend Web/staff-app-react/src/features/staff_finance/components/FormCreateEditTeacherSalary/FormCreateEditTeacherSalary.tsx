import { Form, Input, InputNumber, Modal, Select, Spin } from "antd";
import { useForm } from "antd/es/form/Form";
import { SubmitButton } from "components/SubmitButton";
import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import mess from "messages/messages.json";
import { AxiosResponse } from "axios";
import TextArea from "antd/es/input/TextArea";
import { requireRule } from "helpers/validations.helper";
import { CreateEditTeacherSalary, TeacherSalary } from "features/staff_finance/types/finance.types";
import { FinancePaths } from "features/staff_finance/staff_finance";
import { UserIdAndName } from "features/staff_users/types/users.types";
import { useAppDispatch } from "redux/store";
import { getTeachersList } from "features/staff_users/redux/users.slice";

const FormCreateEditTeacherSalary = ({
  isEditScreen = false,
  teacherSalary,
  onSubmit,
}: {
  isEditScreen?: boolean;
  teacherSalary?: TeacherSalary | null;
  onSubmit: (data: CreateEditTeacherSalary) => Promise<AxiosResponse<any, any>>;
}) => {
  const [form] = useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [teacherList, setTeacherList] = useState<UserIdAndName[]>([]);

  useEffect(() => {
    setLoading(true);
    dispatch(getTeachersList())
      .unwrap()
      .then()
      .then((body) => {
        setTeacherList(body.data);
        setLoading(false);
      })
      .finally(() => setLoading(false));
    if (isEditScreen) {
      form.setFieldsValue({
        ...teacherSalary,
      });
    }
  }, [dispatch, form, teacherSalary, isEditScreen]);

  const handleSubmit = () => {
    setIsSubmitting(true);
    onSubmit({
      ...form.getFieldsValue(),
    })
      .then(() => navigate(FinancePaths.TEACHER_SALARY()))
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
        <Form.Item label="Teacher" name="teacherId" required 
          rules={[...requireRule(mess.fe_35)]}>
            <Select
              allowClear
              placeholder="Please select teacher"
              notFoundContent={loading ? <Spin size="small" /> : null}
            >
              {teacherList.map((option) => (
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
              defaultValue={teacherSalary?.isPaid === true ? "Paid" : "Not Paid"}
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
            ? "Are you sure edit this teacher's salary ?"
            : "Are you sure create new teacher's salary ?"
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

export default memo(FormCreateEditTeacherSalary);
