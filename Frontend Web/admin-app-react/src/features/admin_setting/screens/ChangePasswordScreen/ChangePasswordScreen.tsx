import { Input, Form, Modal, Breadcrumb } from "antd";
import { useForm } from "antd/es/form/Form";
import { SubmitButton } from "components/SubmitButton";
import {
  SettingPaths,
  changePassword,
} from "features/admin_setting/admin_setting";
import { passwordRules, requireRules } from "helpers/validations.helper";
import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import mess from "messages/messages.json";
import { useAppDispatch } from "redux/store";
import { HomeOutlined } from "@ant-design/icons";
import { TopPaths } from "features/admin_top/admin_top";

const ChangePasswordScreen = () => {
  const [form] = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChangePassword = () => {
    setIsSubmitting(true);
    dispatch(changePassword({ ...form.getFieldsValue() }))
      .unwrap()
      .then(() => navigate(SettingPaths.SETTING()))
      .catch((err) => console.log(err))
      .finally(() => {
        setIsSubmitting(false);
        setIsModalOpen(false);
      });
  };

  return (
    <div className="pl-55 pt-30">
      <Breadcrumb className="pb-50 font-18">
        <Breadcrumb.Item
          className="cursor-pointer"
          onClick={() => navigate(TopPaths.TOP())}
        >
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item
          className="cursor-pointer"
          onClick={() => navigate(SettingPaths.SETTING())}
        >
          Settings
        </Breadcrumb.Item>
        <Breadcrumb.Item>Change Password</Breadcrumb.Item>
      </Breadcrumb>

      <Form
        form={form}
        name="wrap"
        labelCol={{ flex: "150px" }}
        labelAlign="left"
        labelWrap
        wrapperCol={{ flex: 1 }}
        colon={false}
        style={{ maxWidth: 600 }}
        onFinish={() => setIsModalOpen(true)}
      >
        <Form.Item
          label="Old Password"
          name="oldPassword"
          rules={[...requireRules(mess.fe_1), ...passwordRules(mess.fe_4)]}
        >
          <Input.Password placeholder="Use at least 8 characters, 1 uppercase, 1 lowercase, 1 number" />
        </Form.Item>

        <Form.Item
          label="New Password"
          name="password"
          dependencies={["oldPassword"]}
          rules={[
            ...requireRules(mess.fe_1),
            ...passwordRules(mess.fe_4),
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("oldPassword") !== value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error(mess.fe_5 as string));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Use at least 8 characters, 1 uppercase, 1 lowercase, 1 number" />
        </Form.Item>

        <Form.Item
          label="Confirmation"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            ...requireRules(mess.fe_1),
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error(mess.fe_6 as string));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label=" ">
          <SubmitButton form={form} text="Submit" isSubmitting={isSubmitting} />
        </Form.Item>
      </Form>
      <Modal
        centered
        title="Are you sure you want to change password ?"
        open={isModalOpen}
        onOk={handleChangePassword}
        onCancel={() => setIsModalOpen(false)}
        okButtonProps={{
          disabled: isSubmitting,
        }}
      />
    </div>
  );
};
export default memo(ChangePasswordScreen);
