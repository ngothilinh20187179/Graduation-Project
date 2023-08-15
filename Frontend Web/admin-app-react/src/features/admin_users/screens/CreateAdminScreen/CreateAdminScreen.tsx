import { TopPaths } from "features/admin_top/admin_top";
import { AdminInformation, UserPaths, createAdminInfo } from "features/admin_users/admin_users";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import FormAdminInformation from "features/admin_users/components/FormAdminInformation/FormAdminInformation";
import { useAppDispatch } from "redux/store";

const CreateAdminScreen = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleCreateAdminInformation = (data: AdminInformation) => {
    return dispatch(createAdminInfo(data)).unwrap();
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
          onClick={() => navigate(UserPaths.GET_ADMINS())}
        >
          Admins
        </Breadcrumb.Item>
        <Breadcrumb.Item>Create Admin</Breadcrumb.Item>
      </Breadcrumb>
      <FormAdminInformation
        onSubmit={handleCreateAdminInformation}
      />
    </div>
  );
};

export default memo(CreateAdminScreen);
