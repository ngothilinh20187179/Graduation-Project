import { useAppDispatch } from "redux/store";
import { useNavigate } from "react-router-dom";
import { Form, Input, Typography } from "antd";
import cx from "classnames";
import styles from "./LoginScreen.module.scss";
import { useForm } from "antd/es/form/Form";
import { ROOT_ROUTE } from "routes/routes.config";
import { requireRules } from "helpers/validations.helper";
import { SubmitButton } from "components/SubmitButton";
import mess from "messages/messages.json";
import { login } from "features/admin_auth/redux/auth.slice";
import { memo, useState } from "react";
import { RoleType } from "features/admin_auth/constants/auth.constants";

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form] = useForm();
  
  const handleLogin = () => {
    setIsSubmitting(true);
    dispatch(
      login({
        loginName: form.getFieldValue("loginName"),
        password: form.getFieldValue("password"),
        role: RoleType.Admin
      })
    )
      .unwrap()
      .then(() => {
        navigate(ROOT_ROUTE);
      })
      .catch(err => console.log(err))
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div className={cx(styles.loginScreen, "flex-center full-height")}>
      <div className={cx(styles.loginContent, "pt-30 pr-60 pb-6 pl-15")}>
      <Typography className={cx(styles.title, "font-30")}>Admin Login</Typography>
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        className={cx(styles.form)}
        onFinish={handleLogin}
      >
        <Form.Item
          label="Login Name"
          name="loginName"
          rules={[...requireRules(mess.fe_0)]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[...requireRules(mess.fe_1)]}
        >
          <Input.Password />
        </Form.Item>
        
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <SubmitButton form={form} text="Login" isSubmitting={isSubmitting}/>
        </Form.Item>
      </Form>
      </div>
    </div>
  );
};

export default memo(LoginScreen);
