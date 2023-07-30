import {
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { SubmitButton } from "components/SubmitButton";
import { SettingPaths } from "features/admin_setting/admin_setting";
import {
  EditInformationRequestBody,
  UserProfile,
} from "features/admin_users/admin_users";
import { getTimeUTC } from "helpers/utils.helper";
import {
  emailRules,
  phoneNumberRules,
  requireRules,
} from "helpers/validations.helper";
import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import mess from "messages/messages.json";
import { AxiosResponse } from "axios";
import { GenderType } from "features/admin_auth/admin_auth";
import dayjs from "dayjs";

const FormInformation = ({
  isEditScreen = false,
  myProfile,
  onSubmit,
}: {
  isEditScreen?: boolean;
  myProfile?: UserProfile | null;
  onSubmit: (
    data: EditInformationRequestBody
  ) => Promise<AxiosResponse<any, any>>;
}) => {
  const [form] = useForm();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    form.setFieldsValue({
      ...myProfile,
      created: getTimeUTC(myProfile?.created),
      dateOfBirth: myProfile?.dateOfBirth ? dayjs(myProfile?.dateOfBirth) : null,
    });
  }, [form, myProfile]);

  const handleSubmit = () => {
    setIsSubmitting(true);
    onSubmit({
      ...form.getFieldsValue(),
      dateOfBirth: getTimeUTC(form.getFieldValue("dateOfBirth")),
    })
      .then(() => navigate(SettingPaths.MY_PROFILE()))
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
        <Row gutter={[60, 0]}>
          <Col xs={24} xl={8} style={{ maxWidth: 360 }}>
            <Form.Item label="Id" name="id">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col xs={24} xl={8} style={{ maxWidth: 360 }}>
            <Form.Item
              label="Login Name:"
              name="loginName"
              rules={[...requireRules(mess.fe_0)]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[60, 0]}>
          <Col xs={24} xl={8} style={{ maxWidth: 360 }}>
            <Form.Item
              label="First Name:"
              name="firstName"
              rules={[...requireRules(mess.fe_7)]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} xl={8} style={{ maxWidth: 360 }}>
            <Form.Item
              label="Last Name:"
              name="lastName"
              rules={[...requireRules(mess.fe_8)]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[60, 0]}>
          <Col xs={24} xl={8} style={{ maxWidth: 360 }}>
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
          <Col xs={24} xl={8} style={{ maxWidth: 360 }}>
            <Form.Item label="Gender:" name="gender">
              <Select
                defaultValue={myProfile?.gender === 1 ? "Female" : "Male"}
                options={[
                  { value: GenderType.Male, label: "Male" },
                  { value: GenderType.Female, label: "Female" },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[60, 0]}>
          <Col xs={24} xl={8} style={{ maxWidth: 360 }}>
            <Form.Item label="Date Of Birth:" name="dateOfBirth">
              <DatePicker
                disabledDate={(current) => {
                  return current && current.valueOf() > Date.now();
                }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} xl={8} style={{ maxWidth: 360 }}>
            <Form.Item
              label="Email:"
              name="email"
              rules={[...emailRules(mess.fe_10)]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[60, 0]}>
          <Col xs={24} xl={8} style={{ maxWidth: 360 }}>
            <Form.Item label="Address:" name="location">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} xl={8} style={{ maxWidth: 360 }}>
            <Form.Item label="Created At:" name="created">
              <Input disabled />
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
          Do you really want to edit your information? This process cannot be
          undone
        </Typography>
      </Modal>
    </div>
  );
};

export default memo(FormInformation);
