import {
  NotificationPaths,
  createNotification,
  getReceiversNotification,
} from "features/admin_notification/admin_notification";
import { HomeOutlined } from "@ant-design/icons";
import {
  Input,
  Form,
  Modal,
  Breadcrumb,
  Select,
  Spin,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { SubmitButton } from "components/SubmitButton";
import { requireRules } from "helpers/validations.helper";
import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import mess from "messages/messages.json";
import { useAppDispatch } from "redux/store";
import { TopPaths } from "features/admin_top/admin_top";
import TextArea from "antd/es/input/TextArea";
import { ReceiverNotification } from "features/admin_notification/types/notification.types";

const CreateNotificationScreen = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [form] = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ReceiverNotification[]>([]);

  useEffect(() => {
    setLoading(true);
    dispatch(getReceiversNotification())
      .unwrap()
      .then()
      .then((body) => {
        setData(body.data);
        setLoading(false);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSendNotification = () => {
    setIsSubmitting(true);
    dispatch(createNotification({ ...form.getFieldsValue() }))
      .unwrap()
      .then(() => navigate(NotificationPaths.SENT_NOTIFICATIONS()))
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
          onClick={() => navigate(NotificationPaths.NOTIFICATION())}
        >
          Notifications
        </Breadcrumb.Item>
        <Breadcrumb.Item>Create New Notification</Breadcrumb.Item>
      </Breadcrumb>
      <Form
        form={form}
        name="wrap"
        labelCol={{ flex: "150px" }}
        labelAlign="left"
        labelWrap
        colon={false}
        style={{ maxWidth: 600 }}
        onFinish={() => setIsModalOpen(true)}
      >
        <Form.Item label="Title" name="title" rules={requireRules(mess.fe_15)}>
          <Input placeholder="Title" />
        </Form.Item>

        <Form.Item
          label="Content"
          name="content"
          rules={requireRules(mess.fe_16)}
        >
          <TextArea placeholder="Content" />
        </Form.Item>

        <Form.Item label="Receivers" name="receivers" required>
            <Select
              mode="multiple"
              allowClear
              placeholder="Please select receivers"
              notFoundContent={loading ? <Spin size="small" /> : null}
            >
              {data.map((option) => (
                <Select.Option key={option.id} value={option.id}>
                  {option.firstName} {option.lastName} - Id: {option.id} - Role:{" "}
                  {option.role === 1
                    ? "Student"
                    : option.role === 2
                    ? "Teacher"
                    : option.role === 3
                    ? "Staff"
                    : option.role === 4
                    ? "Admin"
                    : ""}
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
        title="Are you sure you want to send this notification ?"
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

export default memo(CreateNotificationScreen);
