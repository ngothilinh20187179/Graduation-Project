import { Breadcrumb } from "antd";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import {
  changeInformation,
  getMyProfile,
} from "features/admin_setting/admin_setting";
import { TopPaths } from "features/admin_top/admin_top";
import { memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RootState } from "redux/root-reducer";
import { useAppDispatch, useAppSelector } from "redux/store";
import { HomeOutlined } from "@ant-design/icons";
import { EditInformationRequestBody } from "features/admin_users/admin_users";
import FormInformation from "features/admin_setting/components/FormInformation/FormInformation";


const EditInformationScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    setting: { myProfile },
  } = useAppSelector((state: RootState) => state);

  useEffect(() => {
    dispatch(getMyProfile());
  }, [dispatch]);

  const handleEditMyInformation = (data: EditInformationRequestBody) => {
    return dispatch(changeInformation(data)).unwrap();
  }

  if (!myProfile) return <LoadingSpinner />;

  return (
    <div className="pt-30 pl-55">
      <Breadcrumb className="pb-30 font-18">
        <Breadcrumb.Item
          className="cursor-pointer"
          onClick={() => navigate(TopPaths.TOP())}
        >
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item>Change Information</Breadcrumb.Item>
      </Breadcrumb>
      <FormInformation
        isEditScreen
        myProfile={myProfile}
        onSubmit={handleEditMyInformation}
      />
    </div>
  );
};
export default memo(EditInformationScreen);
