import { Breadcrumb } from "antd";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import { TopPaths } from "features/admin_top/admin_top";
import { memo, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "redux/root-reducer";
import { useAppDispatch, useAppSelector } from "redux/store";
import { HomeOutlined } from "@ant-design/icons";
import {
  CreateEditStaffInfo,
  UserPaths,
  getStaffById,
  updateStaffInfo,
} from "features/admin_users/admin_users";
import FormStaffInformation from "features/admin_users/components/FormStaffInformation/FormStaffInformation";

const EditStaffScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    users: { staff },
  } = useAppSelector((state: RootState) => state);

  useEffect(() => {
    dispatch(getStaffById(Number(id)));
  }, [dispatch]);

  const handleEditStaffInformation = (data: CreateEditStaffInfo) => {
    return dispatch(updateStaffInfo(data)).unwrap();
  };

  if (!staff) return <LoadingSpinner />;

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
        <Breadcrumb.Item>Edit Staff</Breadcrumb.Item>
      </Breadcrumb>
      <FormStaffInformation
        isEditScreen
        staffInfo={staff}
        onSubmit={handleEditStaffInformation}
      />
    </div>
  );
};
export default memo(EditStaffScreen);
