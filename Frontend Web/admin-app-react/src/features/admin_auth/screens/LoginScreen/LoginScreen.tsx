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

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [form] = useForm();
  
  const handleLogin = () => {
    dispatch(
      login({
        loginName: form.getFieldValue("loginName"),
        password: form.getFieldValue("password"),
      })
    )
      .unwrap()
      .then(() => {
        navigate(ROOT_ROUTE);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className={cx(styles.loginScreen)}>
      <div className={cx(styles.loginContent)}>
      <Typography className={cx(styles.title)}>Admin Login</Typography>
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
          <SubmitButton form={form} text="Login"/>
        </Form.Item>
      </Form>
      </div>
    </div>
  );
};

export default LoginScreen;
