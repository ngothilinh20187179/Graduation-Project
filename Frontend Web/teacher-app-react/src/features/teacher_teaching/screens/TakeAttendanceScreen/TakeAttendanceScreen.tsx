import { Breadcrumb, Card, Col, Form, Input, Modal, Radio, Row } from "antd";
import { memo, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "redux/store";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import { TeachingPaths } from "features/teacher_teaching/constants/teaching.paths";
import { getAllStudentsInClass } from "features/teacher_users/teacher_users";
import { RootState } from "redux/root-reducer";
import { useForm } from "antd/es/form/Form";
import { AttendanceStatusType } from "features/teacher_teaching/constants/teaching.constants";
import { SubmitButton } from "components/SubmitButton";
import { takeStudentAttendance } from "features/teacher_teaching/redux/teaching.slice";

const TakeAttendanceScreen = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = useForm();

  const {
    users: { allStudents },
  } = useAppSelector((state: RootState) => state);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getAllStudentsInClass(Number(id)))
      .unwrap()
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch, id]);

  const handleTakeAttendance = () => {
    setIsSubmitting(true);
    dispatch(
      takeStudentAttendance({
        classId: Number(id),
        ...form.getFieldsValue(),
      })
    )
      .unwrap()
      .then(() => navigate(TeachingPaths.CLASSES()))
      .finally(() => {
        setIsSubmitting(false);
        setIsModalOpen(false);
      });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="pl-55 pt-30 pb-20">
      <Breadcrumb className="pb-30 font-18">
        <Breadcrumb.Item>
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item
          className="cursor-pointer"
          onClick={() => navigate(TeachingPaths.CLASSES())}
        >
          Classes
        </Breadcrumb.Item>
        <Breadcrumb.Item>Take Attendance</Breadcrumb.Item>
      </Breadcrumb>
      <Form
        layout="vertical"
        form={form}
        style={{ maxWidth: 1000 }}
        onFinish={() => setIsModalOpen(true)}
        initialValues={{ data: allStudents?.data }}
      >
        <Form.List name="data">
          {(fields) => (
            <div
              style={{ display: "flex", rowGap: 16, flexDirection: "column" }}
            >
              {fields.map((field) => (
                <Card size="small" key={field.key}>
                  <Row gutter={30}>
                    <Col>
                      <Form.Item label="Id" name={[field.name, "id"]}>
                        <Input
                          style={{ maxWidth: "40px", color: "black" }}
                          disabled
                        />
                      </Form.Item>
                    </Col>
                    <Col>
                      <Form.Item
                        label="Last Name"
                        name={[field.name, "lastName"]}
                      >
                        <Input
                          style={{ maxWidth: "80px", color: "black" }}
                          disabled
                        />
                      </Form.Item>
                    </Col>
                    <Col>
                      <Form.Item
                        label="First Name"
                        name={[field.name, "firstName"]}
                      >
                        <Input
                          style={{ maxWidth: "100px", color: "black" }}
                          disabled
                        />
                      </Form.Item>
                    </Col>
                    <Col>
                      <Form.Item
                        label="Status"
                        name={[field.name, "status"]}
                        initialValue={0}
                      >
                        <Radio.Group>
                          <Radio value={AttendanceStatusType.Timely}>
                            Timely
                          </Radio>
                          <Radio
                            value={AttendanceStatusType.Late}
                            style={{ color: "orange" }}
                          >
                            Late
                          </Radio>
                          <Radio
                            value={AttendanceStatusType.Absent}
                            style={{ color: "red" }}
                          >
                            Absent
                          </Radio>
                        </Radio.Group>
                      </Form.Item>
                    </Col>
                    <Col>
                      <Form.Item
                        label="Reason"
                        name={[field.name, "reason"]}
                        initialValue={null}
                      >
                        <Input
                          placeholder="Enter the reason if the student is late or absent"
                          style={{ minWidth: "350px" }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>
              ))}
            </div>
          )}
        </Form.List>
        <Form.Item label=" ">
          <SubmitButton form={form} text="Save" isSubmitting={isSubmitting} />
        </Form.Item>
      </Form>
      <Modal
        centered
        title="Are you sure you want to take this attendance ?"
        open={isModalOpen}
        onOk={handleTakeAttendance}
        onCancel={() => setIsModalOpen(false)}
        okButtonProps={{
          disabled: isSubmitting,
        }}
      />
    </div>
  );
};

export default memo(TakeAttendanceScreen);
