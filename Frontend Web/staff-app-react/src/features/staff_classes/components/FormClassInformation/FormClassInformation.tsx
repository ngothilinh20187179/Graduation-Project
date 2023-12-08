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
  Typography,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { SubmitButton } from "components/SubmitButton";
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
import { useAppDispatch } from "redux/store";
import {
  BasicSubjects,
  ClassesPaths,
  CreateEditClassInfo,
  GetClassResponse,
  getOpenSubjects,
} from "features/staff_classes/staff_classes";

const FormClassInformation = ({
  isEditScreen = false,
  classInfo,
  onSubmit,
}: {
  isEditScreen?: boolean;
  classInfo?: GetClassResponse | null;
  onSubmit: (data: CreateEditClassInfo) => Promise<AxiosResponse<any, any>>;
}) => {
  const [form] = useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [data, setData] = useState<BasicSubjects[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isEditScreen) {
      setLoading(true);
      dispatch(getOpenSubjects())
        .unwrap()
        .then((body) => {
          console.log(body);
          setData(body.data);
          setLoading(false);
        })
        .finally(() => setLoading(false));
    }
    form.setFieldsValue({
      ...classInfo,
    });
  }, [form, classInfo]);

  const handleSubmit = () => {
    setIsSubmitting(true);
    onSubmit({
      ...form.getFieldsValue(),
    })
      .then(() => {
        if (isEditScreen) {
          navigate(ClassesPaths.GET_CLASS(Number(classInfo?.data.id)));
        } else {
          navigate(ClassesPaths.CLASSES());
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
        <Row gutter={[60, 0]}>
          <Col xs={24} xl={8} style={{ maxWidth: 320 }}>
            <Form.Item label="Id" name="id">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col xs={24} xl={8} style={{ maxWidth: 320 }}>
            <Form.Item
              label="Class Name:"
              name="className"
              rules={[...requireRules(mess.fe_22)]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[60, 0]}>
          <Col xs={24} xl={8} style={{ maxWidth: 320 }}>
            <Form.Item
              label="Number Of Students (Max):"
              name="numberOfStudents"
              required
              rules={[...requireRule(mess.fe_23)]}
            >
              <InputNumber min={0} />
            </Form.Item>
          </Col>
          <Col xs={24} xl={8} style={{ maxWidth: 320 }}>
            <Form.Item
              label="Number Of Sessions:"
              name="numberOfSessions"
              required
              rules={[...requireRule(mess.fe_24)]}
            >
              <InputNumber min={0} />
            </Form.Item>
          </Col>
          <Col xs={24} xl={8} style={{ maxWidth: 320 }}>
            <Form.Item
              label="Credit:"
              name="credit"
              required
              rules={[...requireRule(mess.fe_25)]}
            >
              <InputNumber min={0} />
            </Form.Item>
          </Col>
        </Row>

        {/* <Row gutter={[60, 0]}>
          <Col xs={24} xl={8} style={{ maxWidth: 320 }}>
            <Form.Item label="Date Of Birth:" name="dateOfBirth">
              <DatePicker
                disabledDate={(current) => {
                  return current && current.valueOf() > Date.now();
                }}
              />
            </Form.Item>
          </Col>
        </Row> */}
        {/* <Row gutter={[60, 0]}>
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
            <Form.Item
              label="Hire Date:"
              name="hireDate"
              required
              rules={[...requireRule(mess.fe_20)]}
            >
              <DatePicker
                disabledDate={(current) => {
                  return current && current.valueOf() > Date.now();
                }}
              />
            </Form.Item>
          </Col>
        </Row> */}
        <Row gutter={[60, 0]}>
          <Col xs={24} xl={8} style={{ maxWidth: 320 }}>
            <Form.Item label="Subject:" name="subjectId" required>
              <Select
                allowClear
                placeholder="Please select subject"
                notFoundContent={loading ? <Spin size="small" /> : null}
              >
                {data.map((option) => (
                  <Select.Option key={option.id} value={option.id}>
                    Id: {option.id} - {option.subjectName} -{" "}
                    {option.subjectDescription}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
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
            ? " Do you really want to edit this class's information? This process cannot be undone"
            : " Do you really want to create new class? This process cannot be undone"}
        </Typography>
      </Modal>
    </div>
  );
};

export default memo(FormClassInformation);
