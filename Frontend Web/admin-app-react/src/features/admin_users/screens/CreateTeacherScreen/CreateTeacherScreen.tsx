import { TopPaths } from "features/admin_top/admin_top";
import { CreateEditTeacherInfo, UserPaths, createTeacherInfo } from "features/admin_users/admin_users";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { useAppDispatch } from "redux/store";
import FormTeacherInformation from "features/admin_users/components/FormTeacherInformation/FormTeacherInformation";

const CreateTeacherScreen = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleCreateTeacherInformation = (data: CreateEditTeacherInfo) => {
    return dispatch(createTeacherInfo(data)).unwrap();
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
          onClick={() => navigate(UserPaths.GET_TEACHERS())}
        >
          Teachers
        </Breadcrumb.Item>
        <Breadcrumb.Item>Create Teacher</Breadcrumb.Item>
      </Breadcrumb>
      <FormTeacherInformation
        onSubmit={handleCreateTeacherInformation}
      />
    </div>
  );
};

export default memo(CreateTeacherScreen);
