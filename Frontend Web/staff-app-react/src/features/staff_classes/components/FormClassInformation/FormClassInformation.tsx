import {
  Button,
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
import { requireRule, requireRules } from "helpers/validations.helper";
import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import mess from "messages/messages.json";
import { AxiosResponse } from "axios";
import { useAppDispatch } from "redux/store";
import {
  BasicSubjects,
  ClassPeriodType,
  ClassStatusType,
  ClassesPaths,
  CreateEditClassInfo,
  DayOfWeek,
  GetClassResponse,
  Room,
  getOpenRooms,
  getOpenSubjects,
} from "features/staff_classes/staff_classes";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { getTimeUTC } from "helpers/utils.helper";

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
  const [loadingSubject, setLoadingSubject] = useState(false);
  const [roomList, setRoomList] = useState<Room[]>([]);
  const [loadingRoom, setLoadingRoom] = useState(false);

  useEffect(() => {
    if (!isEditScreen) {
      setLoadingSubject(true);
      setLoadingRoom(true);
      dispatch(getOpenSubjects())
        .unwrap()
        .then((body) => {
          setData(body.data);
        });
      dispatch(getOpenRooms())
        .unwrap()
        .then((body) => {
          setRoomList(body.data);
        })
        .finally(() => {
          setLoadingRoom(false);
          setLoadingSubject(false);
        });
    }
    form.setFieldsValue({
      ...classInfo,
    });
  }, [form, classInfo]);

  const handleSubmit = () => {
    setIsSubmitting(true);
    onSubmit({
      ...form.getFieldsValue(),
      classStartDate: getTimeUTC(form.getFieldValue("classStartDate")),
      classEndDate: getTimeUTC(form.getFieldValue("classEndDate")),
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
          <Col xs={24} xl={8} style={{ maxWidth: 320 }}>
            <Form.Item label="Subject:" name="subjectId" required>
              <Select
                allowClear
                placeholder="Please select subject"
                notFoundContent={loadingSubject ? <Spin size="small" /> : null}
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
        </Row>
        <Row gutter={[60, 0]}>
          <Col xs={24} xl={8} style={{ maxWidth: 320 }}>
            <Form.Item
              label="Start Date:"
              name="classStartDate"
              required
              rules={[...requireRule(mess.fe_28)]}
            >
              <DatePicker
                disabledDate={(current) => {
                  return current && current.valueOf() < Date.now();
                }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} xl={8} style={{ maxWidth: 320 }}>
            <Form.Item
              label="End Date:"
              name="classEndDate"
              dependencies={["classStartDate"]}
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (
                      !value ||
                      getFieldValue("classStartDate") === value ||
                      getFieldValue("classStartDate") < value
                    ) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error(mess.fe_30 as string));
                  },
                }),
              ]}
            >
              <DatePicker
                disabledDate={(current) => {
                  return current && current.valueOf() < Date.now();
                }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} xl={8} style={{ maxWidth: 320 }}>
            <Form.Item label="Class Status:" name="classStatus" required>
              <Select
                allowClear
                placeholder="Please select status"
                defaultValue={
                  classInfo?.data.classStatus === 0
                    ? "NotStart"
                    : classInfo?.data.classStatus === 1
                    ? "InProgress"
                    : classInfo?.data.classStatus === 2
                    ? "Stop"
                    : "End"
                }
                options={[
                  { value: ClassStatusType.NotStart, label: "Not Start" },
                  { value: ClassStatusType.InProgress, label: "In Progress" },
                  { value: ClassStatusType.Stop, label: "Stop" },
                  { value: ClassStatusType.End, label: "End" },
                ]}
              />
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
              label="Credit (VNĐ):"
              name="credit"
              required
              rules={[...requireRule(mess.fe_25)]}
            >
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
        {/* <Form.List
          name="classSchedules"
          rules={[
            {
              validator: async (_, classSchedules) => {
                if (!classSchedules || classSchedules.length < 1) {
                  return Promise.reject(new Error("At least 1 schedule"));
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  label={index === 0 ? "Schedules" : ""}
                  required={false}
                  key={field.key}
                  className="flex"
                >
                  <Row gutter={[160, 0]}>
                    <Col xs={24} xl={8} style={{ maxWidth: 320 }}>
                      <Form.Item label="Period:" name="period" required>
                        <Select
                          allowClear
                          placeholder="Please select period"
                          defaultValue={
                            classInfo?.data.classSchedules[index].period === 1
                              ? "Period 1 (8h-10h)"
                              : classInfo?.data.classSchedules[index].period ===
                                2
                              ? "Period 2 (10h-12h)"
                              : classInfo?.data.classSchedules[index].period ===
                                3
                              ? "Period 3 (12h-14h)"
                              : classInfo?.data.classSchedules[index].period ===
                                4
                              ? "Period 4 (14h-16h)"
                              : classInfo?.data.classSchedules[index].period ===
                                5
                              ? "Period 5 (16h-18h)"
                              : classInfo?.data.classSchedules[index].period ===
                                6
                              ? "Period 6 (18h-20h)"
                              : classInfo?.data.classSchedules[index].period ===
                                7
                              ? "Period 7 (20h-22h)"
                              : ""
                          }
                          options={[
                            {
                              value: ClassPeriodType.Period1,
                              label: "Period 1 (8h-10h)",
                            },
                            {
                              value: ClassPeriodType.Period2,
                              label: "Period 2 (10h-12h)",
                            },
                            {
                              value: ClassPeriodType.Period3,
                              label: "Period 3 (12h-14h)",
                            },
                            {
                              value: ClassPeriodType.Period4,
                              label: "Period 4 (14h-16h)",
                            },
                            {
                              value: ClassPeriodType.Period5,
                              label: "Period 5 (16h-18h)",
                            },
                            {
                              value: ClassPeriodType.Period6,
                              label: "Period 6 (18h-20h)",
                            },
                            {
                              value: ClassPeriodType.Period7,
                              label: "Period 7 (20h-22h)",
                            },
                          ]}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} xl={8} style={{ maxWidth: 320 }}>
                      <Form.Item label="Day of week:" name="dayOfWeek" required>
                        <Select
                          allowClear
                          placeholder="Please select day of week"
                          defaultValue={
                            classInfo?.data.classSchedules[index].dayOfWeek ===
                            0
                              ? "Sunday"
                              : classInfo?.data.classSchedules[index]
                                  .dayOfWeek === 1
                              ? "Monday"
                              : classInfo?.data.classSchedules[index]
                                  .dayOfWeek === 2
                              ? "Tuesday"
                              : classInfo?.data.classSchedules[index]
                                  .dayOfWeek === 3
                              ? "Wednesday"
                              : classInfo?.data.classSchedules[index]
                                  .dayOfWeek === 4
                              ? "Thursday"
                              : classInfo?.data.classSchedules[index]
                                  .dayOfWeek === 5
                              ? "Friday"
                              : classInfo?.data.classSchedules[index]
                                  .dayOfWeek === 6
                              ? "Saturday"
                              : ""
                          }
                          options={[
                            {
                              value: DayOfWeek.Sunday,
                              label: "Sunday",
                            },
                            {
                              value: DayOfWeek.Monday,
                              label: "Monday",
                            },
                            {
                              value: DayOfWeek.Tuesday,
                              label: "Tuesday",
                            },
                            {
                              value: DayOfWeek.Wednesday,
                              label: "Wednesday",
                            },
                            {
                              value: DayOfWeek.Thursday,
                              label: "Thursday",
                            },
                            {
                              value: DayOfWeek.Sunday,
                              label: "Sunday",
                            },
                            {
                              value: DayOfWeek.Saturday,
                              label: "Saturday",
                            },
                          ]}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} xl={8} style={{ maxWidth: 320 }}>
                      <Form.Item label="Room:" name="roomId" required>
                        <Select
                          allowClear
                          placeholder="Please select room"
                          notFoundContent={
                            loadingRoom ? <Spin size="small" /> : null
                          }
                        >
                          {roomList.map((option) => (
                            <Select.Option value={option.id}>
                              {option.name} - Size {option.size}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      onClick={() => remove(field.name)}
                    />
                  ) : null}
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                >
                  Add schedule
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List> */}
        <Form.List
          name="classSchedules"
          rules={[
            {
              validator: async (_, classSchedules) => {
                if (!classSchedules || classSchedules.length < 1) {
                  return Promise.reject(new Error("At least 1 schedule"));
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex" , alignItems: "center", flexWrap: "wrap", justifyContent: "space-between", paddingRight: "100px"}}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "period"]}
                    rules={[{ required: true, message: "Missing period" }]}
                    label="Period"
                  >
                    <Select
                      allowClear
                      placeholder="Please select period"
                      // defaultValue={
                      //   classInfo?.data.classSchedules[index].period === 1
                      //     ? "Period 1 (8h-10h)"
                      //     : classInfo?.data.classSchedules[index].period ===
                      //       2
                      //     ? "Period 2 (10h-12h)"
                      //     : classInfo?.data.classSchedules[index].period ===
                      //       3
                      //     ? "Period 3 (12h-14h)"
                      //     : classInfo?.data.classSchedules[index].period ===
                      //       4
                      //     ? "Period 4 (14h-16h)"
                      //     : classInfo?.data.classSchedules[index].period ===
                      //       5
                      //     ? "Period 5 (16h-18h)"
                      //     : classInfo?.data.classSchedules[index].period ===
                      //       6
                      //     ? "Period 6 (18h-20h)"
                      //     : classInfo?.data.classSchedules[index].period ===
                      //       7
                      //     ? "Period 7 (20h-22h)"
                      //     : ""
                      // }
                      options={[
                        {
                          value: ClassPeriodType.Period1,
                          label: "Period 1 (8h-10h)",
                        },
                        {
                          value: ClassPeriodType.Period2,
                          label: "Period 2 (10h-12h)",
                        },
                        {
                          value: ClassPeriodType.Period3,
                          label: "Period 3 (12h-14h)",
                        },
                        {
                          value: ClassPeriodType.Period4,
                          label: "Period 4 (14h-16h)",
                        },
                        {
                          value: ClassPeriodType.Period5,
                          label: "Period 5 (16h-18h)",
                        },
                        {
                          value: ClassPeriodType.Period6,
                          label: "Period 6 (18h-20h)",
                        },
                        {
                          value: ClassPeriodType.Period7,
                          label: "Period 7 (20h-22h)",
                        },
                      ]}
                    />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "dayOfWeek"]}
                    rules={[{ required: true, message: "Missing day of week" }]}
                    label="Day Of Week"
                  >
                    <Select
                      allowClear
                      placeholder="Please select day of week"
                      // defaultValue={
                      //   classInfo?.data.classSchedules[index].dayOfWeek ===
                      //   0
                      //     ? "Sunday"
                      //     : classInfo?.data.classSchedules[index]
                      //         .dayOfWeek === 1
                      //     ? "Monday"
                      //     : classInfo?.data.classSchedules[index]
                      //         .dayOfWeek === 2
                      //     ? "Tuesday"
                      //     : classInfo?.data.classSchedules[index]
                      //         .dayOfWeek === 3
                      //     ? "Wednesday"
                      //     : classInfo?.data.classSchedules[index]
                      //         .dayOfWeek === 4
                      //     ? "Thursday"
                      //     : classInfo?.data.classSchedules[index]
                      //         .dayOfWeek === 5
                      //     ? "Friday"
                      //     : classInfo?.data.classSchedules[index]
                      //         .dayOfWeek === 6
                      //     ? "Saturday"
                      //     : ""
                      // }
                      options={[
                        {
                          value: DayOfWeek.Sunday,
                          label: "Sunday",
                        },
                        {
                          value: DayOfWeek.Monday,
                          label: "Monday",
                        },
                        {
                          value: DayOfWeek.Tuesday,
                          label: "Tuesday",
                        },
                        {
                          value: DayOfWeek.Wednesday,
                          label: "Wednesday",
                        },
                        {
                          value: DayOfWeek.Thursday,
                          label: "Thursday",
                        },
                        {
                          value: DayOfWeek.Friday,
                          label: "Friday",
                        },
                        {
                          value: DayOfWeek.Saturday,
                          label: "Saturday",
                        },
                      ]}
                    />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "roomId"]}
                    rules={[{ required: true, message: "Missing room" }]}
                    label="Room"
                  >
                    <Select
                      allowClear
                      placeholder="Please select room"
                      notFoundContent={
                        loadingRoom ? <Spin size="small" /> : null
                      }
                    >
                      {roomList.map((option) => (
                        <Select.Option value={option.id}>
                          {option.name} - Size {option.size}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <MinusCircleOutlined
                    className="pl-10"
                    onClick={() => remove(name)}
                  />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                >
                  Add schedule
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
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
