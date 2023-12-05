import { Breadcrumb } from "antd";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import { TopPaths } from "features/staff_top/staff_top";
import { memo, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "redux/root-reducer";
import { useAppDispatch, useAppSelector } from "redux/store";
import { HomeOutlined } from "@ant-design/icons";
import {
    CreateEditStudentInfo,
  UserPaths,
  getStudentById,
  updateStudentInfo,
} from "features/staff_users/staff_users";
import FormStudentInformation from "features/staff_users/components/FormStudentInformation/FormStudentInformation";

const EditStudentScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    users: { student },
  } = useAppSelector((state: RootState) => state);

  useEffect(() => {
    dispatch(getStudentById(Number(id)));
  }, [dispatch]);

  const handleEditStudentInformation = (data: CreateEditStudentInfo) => {
    return dispatch(updateStudentInfo(data)).unwrap();
  };

  if (!student) return <LoadingSpinner />;

  return (
    <div className="pl-55 pt-30">
      <Breadcrumb className="pb-40 font-18">
        <Breadcrumb.Item
          className="cursor-pointer"
          onClick={() => navigate(TopPaths.TOP())}
        >
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item
          className="cursor-pointer"
          onClick={() => navigate(UserPaths.GET_STUDENTS())}
        >
          Students
        </Breadcrumb.Item>
        <Breadcrumb.Item>Edit Student</Breadcrumb.Item>
      </Breadcrumb>
      <FormStudentInformation
        isEditScreen
        studentInfo={student}
        onSubmit={handleEditStudentInformation}
      />
    </div>
  );
};
export default memo(EditStudentScreen);
