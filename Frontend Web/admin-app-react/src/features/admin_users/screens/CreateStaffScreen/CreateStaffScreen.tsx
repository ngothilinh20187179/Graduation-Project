import { TopPaths } from "features/admin_top/admin_top";
import { CreateEditStaffInfo, UserPaths, createStaffInfo } from "features/admin_users/admin_users";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { useAppDispatch } from "redux/store";
import FormStaffInformation from "features/admin_users/components/FormStaffInformation/FormStaffInformation";

const CreateStaffScreen = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleCreateStaffInformation = (data: CreateEditStaffInfo) => {
    return dispatch(createStaffInfo(data)).unwrap();
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
          onClick={() => navigate(UserPaths.GET_STAFFS())}
        >
          Staffs
        </Breadcrumb.Item>
        <Breadcrumb.Item>Create Staff</Breadcrumb.Item>
      </Breadcrumb>
      <FormStaffInformation
        onSubmit={handleCreateStaffInformation}
      />
    </div>
  );
};

export default memo(CreateStaffScreen);
