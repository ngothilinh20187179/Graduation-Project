import { TopPaths } from "features/staff_top/staff_top";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { useAppDispatch } from "redux/store";
import { ClassesPaths, CreateEditClassInfo, createClassInfo } from "features/staff_classes/staff_classes";
import FormClassInformation from "features/staff_classes/components/FormClassInformation/FormClassInformation";

const CreateClassScreen = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleCreateClassInformation = (data: CreateEditClassInfo) => {
    return dispatch(createClassInfo(data)).unwrap();
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
          onClick={() => navigate(ClassesPaths.CLASSES())}
        >
          Classes
        </Breadcrumb.Item>
        <Breadcrumb.Item>Create Class</Breadcrumb.Item>
      </Breadcrumb>
      <FormClassInformation
        onSubmit={handleCreateClassInformation}
      />
    </div>
  );
};

export default memo(CreateClassScreen);
