import { Form, Input, InputNumber, Modal, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { SubmitButton } from "components/SubmitButton";
import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import mess from "messages/messages.json";
import { AxiosResponse } from "axios";
import TextArea from "antd/es/input/TextArea";
import { requireRules } from "helpers/validations.helper";
import { ClassesPaths, Room, RoomStatusType } from "features/staff_classes/staff_classes";

const FormCreateEditRoom = ({
  isEditScreen = false,
  room,
  onSubmit,
}: {
  isEditScreen?: boolean;
  room?: Room | null;
  onSubmit: (data: Room) => Promise<AxiosResponse<any, any>>;
}) => {
  const [form] = useForm();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isEditScreen) {
      form.setFieldsValue({
        ...room,
      });
    }
  }, [form, room, isEditScreen]);

  const handleSubmit = () => {
    setIsSubmitting(true);
    onSubmit({
      ...form.getFieldsValue(),
    })
      .then(() => navigate(ClassesPaths.ROOMS()))
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
          label="Room Name:"
          name="name"
          rules={[...requireRules(mess.fe_14)]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Room Status:" name="roomStatus" required>
          <Select
            defaultValue={RoomStatusType.CanUse}
            options={[
              { value: RoomStatusType.CanUse, label: "Can Use" },
              { value: RoomStatusType.CanNotUse, label: "Can Not Use" },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="Size:"
          name="size"
        >
          <InputNumber min={1} max={100} />
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
            ? "Are you sure edit this room ?"
            : "Are you sure create new room ?"
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

export default memo(FormCreateEditRoom);
