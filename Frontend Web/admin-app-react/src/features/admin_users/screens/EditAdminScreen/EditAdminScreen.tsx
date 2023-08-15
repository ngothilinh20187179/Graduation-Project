import { Breadcrumb } from "antd";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import { TopPaths } from "features/admin_top/admin_top";
import { memo, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "redux/root-reducer";
import { useAppDispatch, useAppSelector } from "redux/store";
import { HomeOutlined } from "@ant-design/icons";
import {
  AdminInformation,
  UserPaths,
  getAdminById,
  updateAdminInfo,
} from "features/admin_users/admin_users";
import FormAdminInformation from "features/admin_users/components/FormAdminInformation/FormAdminInformation";

const EditAdminScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    users: { admin },
  } = useAppSelector((state: RootState) => state);

  useEffect(() => {
    dispatch(getAdminById(Number(id)));
  }, [dispatch]);

  const handleEditAdminInformation = (data: AdminInformation) => {
    return dispatch(updateAdminInfo(data)).unwrap();
  };

  if (!admin) return <LoadingSpinner />;

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
        <Breadcrumb.Item>Edit Admin</Breadcrumb.Item>
      </Breadcrumb>
      <FormAdminInformation
        isEditScreen
        adminInfo={admin}
        onSubmit={handleEditAdminInformation}
      />
    </div>
  );
};
export default memo(EditAdminScreen);
