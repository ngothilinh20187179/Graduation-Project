import {
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Space,
  Tooltip,
  Typography,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { SubmitButton } from "components/SubmitButton";
import {
  CreateEditTeacherInfo,
  TeacherDetail,
  UserPaths,
} from "features/admin_users/admin_users";
import { getTimeUTC } from "helpers/utils.helper";
import {
  emailRules,
  passwordRules,
  phoneNumberRules,
  requireRule,
  requireRules,
} from "helpers/validations.helper";
import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import mess from "messages/messages.json";
import { AxiosResponse } from "axios";
import { GenderType } from "features/admin_auth/admin_auth";
import dayjs from "dayjs";

const FormTeacherInformation = ({
  isEditScreen = false,
  teacherInfo,
  onSubmit,
}: {
  isEditScreen?: boolean;
  teacherInfo?: TeacherDetail | null;
  onSubmit: (data: CreateEditTeacherInfo) => Promise<AxiosResponse<any, any>>;
}) => {
  const [form] = useForm();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    form.setFieldsValue({
      ...teacherInfo,
      created: getTimeUTC(teacherInfo?.createdOn),
      dateOfBirth: teacherInfo?.dateOfBirth
        ? dayjs(teacherInfo?.dateOfBirth)
        : null,
      graduationTime: teacherInfo?.graduationTime
        ? dayjs(teacherInfo?.graduationTime)
        : null,
    });
  }, [form, teacherInfo]);

  const handleSubmit = () => {
    setIsSubmitting(true);
    onSubmit({
      ...form.getFieldsValue(),
      password:
        form.getFieldValue("password") === undefined
          ? null
          : form.getFieldValue("password"),
      dateOfBirth: getTimeUTC(form.getFieldValue("dateOfBirth")),
      graduationTime: getTimeUTC(form.getFieldValue("graduationTime")),
    })
      .then(() => {
        if (isEditScreen) {
          navigate(UserPaths.GET_TEACHER(Number(teacherInfo?.id)));
        } else {
          navigate(UserPaths.GET_TEACHERS());
        }
      })
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
        layout="vertical"
        className="pl-30"
        onFinish={() => setIsModalOpen(true)}
      >
        {isEditScreen && (
          <Row gutter={[60, 0]}>
            <Col xs={24} xl={8} style={{ maxWidth: 320 }}>
              <Form.Item label="Id" name="id">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col xs={24} xl={8} style={{ maxWidth: 320 }}>
              <Form.Item label="Created On:" name="created">
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>
        )}
        <Row gutter={[60, 0]}>
          <Col xs={24} xl={8} style={{ maxWidth: 320 }}>
            <Form.Item
              label="Login Name:"
              name="loginName"
              rules={[...requireRules(mess.fe_0)]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} xl={8} style={{ maxWidth: 320 }}>
            {isEditScreen ? (
              <Form.Item
                label="Password"
                name="password"
                rules={[...passwordRules(mess.fe_4)]}
              >
                <Tooltip title="Enter if you want to change the teacher's password">
                  <Input.Password
                    allowClear
                    placeholder="Enter if you want to change the teacher's password"
                  />
                </Tooltip>
              </Form.Item>
            ) : (
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  ...requireRules(mess.fe_1),
                  ...passwordRules(mess.fe_4),
                ]}
              >
                <Input.Password allowClear />
              </Form.Item>
            )}
          </Col>
          <Col xs={24} xl={8} style={{ maxWidth: 320 }}>
            <Form.Item
              label="Telephone:"
              name="phoneNumber"
              rules={[
                ...requireRules(mess.fe_9),
                ...phoneNumberRules(mess.fe_11),
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[60, 0]}>
          <Col xs={24} xl={8} style={{ maxWidth: 320 }}>
            <Form.Item
              label="First Name:"
              name="firstName"
              rules={[...requireRules(mess.fe_7)]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} xl={8} style={{ maxWidth: 320 }}>
            <Form.Item
              label="Last Name:"
              name="lastName"
              rules={[...requireRules(mess.fe_8)]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} xl={8} style={{ maxWidth: 320 }}>
            <Form.Item label="Gender:" name="gender">
              <Select
                defaultValue={teacherInfo?.gender === 1 ? "Female" : "Male"}
                options={[
                  { value: GenderType.Male, label: "Male" },
                  { value: GenderType.Female, label: "Female" },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[60, 0]}>
          <Col xs={24} xl={8} style={{ maxWidth: 320 }}>
            <Form.Item
              label="Email:"
              name="email"
              rules={[...emailRules(mess.fe_10)]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} xl={8} style={{ maxWidth: 320 }}>
            <Form.Item label="Address:" name="location">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} xl={8} style={{ maxWidth: 320 }}>
            <Form.Item label="Date Of Birth:" name="dateOfBirth">
              <DatePicker
                disabledDate={(current) => {
                  return current && current.valueOf() > Date.now();
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[60, 0]}>
          <Col xs={24} xl={8} style={{ maxWidth: 320 }}>
            <Form.Item
              label="Graduate At:"
              name="graduateAt"
              required
              rules={[...requireRules(mess.fe_17)]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} xl={8} style={{ maxWidth: 320 }}>
            <Form.Item
              label="Graduation Time:"
              name="graduationTime"
              required
              rules={[...requireRule(mess.fe_18)]}
            >
              <DatePicker
                disabledDate={(current) => {
                  return current && current.valueOf() > Date.now();
                }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} xl={8} style={{ maxWidth: 320 }}>
            <Form.Item label="Hourly Salary:" name="hourlySalary" required 
              rules={[...requireRule(mess.fe_19)]}>
              <InputNumber min={0} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[60, 0]}>
          <Col xs={24} xl={8} style={{ maxWidth: 320 }}>
            <Form.Item label="Note:" name="note">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Form.Item>
            <Space>
              <SubmitButton
                form={form}
                text="Save"
                isSubmitting={isSubmitting}
              />
            </Space>
          </Form.Item>
        </Row>
      </Form>
      <Modal
        centered
        title="Are you sure?"
        open={isModalOpen}
        okText="Save"
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSubmit}
        okButtonProps={{
          disabled: isSubmitting,
        }}
      >
        <Typography>
          {isEditScreen
            ? " Do you really want to edit this teacher's information? This process cannot be undone"
            : " Do you really want to create new teacher? This process cannot be undone"}
        </Typography>
      </Modal>
    </div>
  );
};

export default memo(FormTeacherInformation);
