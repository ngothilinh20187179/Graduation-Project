import { Breadcrumb } from "antd";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import { TopPaths } from "features/admin_top/admin_top";
import { memo, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "redux/root-reducer";
import { useAppDispatch, useAppSelector } from "redux/store";
import { HomeOutlined } from "@ant-design/icons";
import {
  CreateEditTeacherInfo,
  UserPaths,
  getTeacherById,
  updateTeacherInfo,
} from "features/admin_users/admin_users";
import FormTeacherInformation from "features/admin_users/components/FormTeacherInformation/FormTeacherInformation";

const EditTeacherScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    users: { teacher },
  } = useAppSelector((state: RootState) => state);

  useEffect(() => {
    dispatch(getTeacherById(Number(id)));
  }, [dispatch]);

  const handleEditTeacherInformation = (data: CreateEditTeacherInfo) => {
    return dispatch(updateTeacherInfo(data)).unwrap();
  };

  if (!teacher) return <LoadingSpinner />;

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
          onClick={() => navigate(UserPaths.GET_TEACHERS())}
        >
          Teachers
        </Breadcrumb.Item>
        <Breadcrumb.Item>Edit Teacher</Breadcrumb.Item>
      </Breadcrumb>
      <FormTeacherInformation
        isEditScreen
        teacherInfo={teacher}
        onSubmit={handleEditTeacherInformation}
      />
    </div>
  );
};
export default memo(EditTeacherScreen);
