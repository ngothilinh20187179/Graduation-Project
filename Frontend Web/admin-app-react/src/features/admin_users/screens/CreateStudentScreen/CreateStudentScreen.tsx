import { TopPaths } from "features/admin_top/admin_top";
import { CreateEditStudentInfo, UserPaths, createStudentInfo } from "features/admin_users/admin_users";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { useAppDispatch } from "redux/store";
import FormStudentInformation from "features/admin_users/components/FormStudentInformation/FormStudentInformation";

const CreateStudentScreen = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleCreateStudentInformation = (data: CreateEditStudentInfo) => {
    return dispatch(createStudentInfo(data)).unwrap();
  };

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
        <Breadcrumb.Item>Create Student</Breadcrumb.Item>
      </Breadcrumb>
      <FormStudentInformation
        onSubmit={handleCreateStudentInformation}
      />
    </div>
  );
};

export default memo(CreateStudentScreen);
