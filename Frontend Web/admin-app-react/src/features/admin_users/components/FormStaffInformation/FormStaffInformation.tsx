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
  Spin,
  Tooltip,
  Typography,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { SubmitButton } from "components/SubmitButton";
import {
  CreateEditStaffInfo,
  PositionList,
  StaffDetail,
  UserPaths,
  getPositionList,
} from "features/admin_users/admin_users";
import { getTimeUTC } from "helpers/utils.helper";
import {
  emailRules,
  passwordRules,
  phoneNumberRules,
  requireRules,
} from "helpers/validations.helper";
import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import mess from "messages/messages.json";
import { AxiosResponse } from "axios";
import { GenderType } from "features/admin_auth/admin_auth";
import dayjs from "dayjs";
import { useAppDispatch } from "redux/store";

const FormStaffInformation = ({
  isEditScreen = false,
  staffInfo,
  onSubmit,
}: {
  isEditScreen?: boolean;
  staffInfo?: StaffDetail | null;
  onSubmit: (data: CreateEditStaffInfo) => Promise<AxiosResponse<any, any>>;
}) => {
  const [form] = useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [data, setData] = useState<PositionList[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isEditScreen) {
      setLoading(true);
      dispatch(getPositionList())
        .unwrap()
        .then()
        .then((body) => {
          setData(body.data);
          setLoading(false);
        })
        .finally(() => setLoading(false));
    }
    form.setFieldsValue({
      ...staffInfo,
      created: getTimeUTC(staffInfo?.createdOn),
      dateOfBirth: staffInfo?.dateOfBirth
        ? dayjs(staffInfo?.dateOfBirth)
        : null,
      graduationTime: staffInfo?.graduationTime
        ? dayjs(staffInfo?.graduationTime)
        : null,
      hireDate: staffInfo?.hireDate ? dayjs(staffInfo?.hireDate) : null,
    });
  }, [form, staffInfo]);

  const handleSubmit = () => {
    setIsSubmitting(true);
    onSubmit({
      ...form.getFieldsValue(),
      password:
        form.getFieldValue("password") === undefined
          ? null
          : form.getFieldValue("password"),
      dateOfBirth: getTimeUTC(form.getFieldValue("dateOfBirth")),
      hireDate: getTimeUTC(form.getFieldValue("hireDate")),
      graduationTime: getTimeUTC(form.getFieldValue("graduationTime")),
    })
      .then(() => {
        if (isEditScreen) {
          navigate(UserPaths.GET_STAFF(Number(staffInfo?.id)));
        } else {
          navigate(UserPaths.GET_STAFFS());
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
            <Col xs={24} xl={8} style={{ maxWidth: 320 }}>
              <Form.Item label="Position Name:" name="positionName">
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
                <Tooltip title="Enter if you want to change the staff's password">
                  <Input.Password
                    allowClear
                    placeholder="Enter if you want to change the staff's password"
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
                defaultValue={staffInfo?.gender === 1 ? "Female" : "Male"}
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
            <Form.Item label="Graduate At:" name="graduateAt" required>
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} xl={8} style={{ maxWidth: 320 }}>
            <Form.Item label="Graduation Time:" name="graduationTime" required>
              <DatePicker
                disabledDate={(current) => {
                  return current && current.valueOf() > Date.now();
                }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} xl={8} style={{ maxWidth: 320 }}>
            <Form.Item label="Hire Date:" name="hireDate" required>
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
            <Form.Item label="Years Of Working:" name="yearsOfWorking" required>
              <InputNumber min={0} defaultValue={0} />;
            </Form.Item>
          </Col>
          {!isEditScreen && (
            <Col xs={24} xl={8} style={{ maxWidth: 320 }}>
              <Form.Item label="Position:" name="positionId" required>
                <Select
                  allowClear
                  placeholder="Please select position"
                  notFoundContent={loading ? <Spin size="small" /> : null}
                >
                  {data.map((option) => (
                    <Select.Option key={option.id} value={option.id}>
                      {option.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          )}
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
            ? " Do you really want to edit this staff's information? This process cannot be undone"
            : " Do you really want to create new staff? This process cannot be undone"}
        </Typography>
      </Modal>
    </div>
  );
};

export default memo(FormStaffInformation);
