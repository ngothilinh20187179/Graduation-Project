import { memo } from "react";
import { Breadcrumb } from "antd";
import { useNavigate } from "react-router-dom";
import { TopPaths } from "features/staff_top/staff_top";
import { HomeOutlined } from "@ant-design/icons";
import { ClassesPaths, Subject, createSubject } from "features/staff_classes/staff_classes";
import FormCreateEditSubject from "features/staff_classes/components/FormCreateEditSubject/FormCreateEditSubject";
import { useAppDispatch } from "redux/store";

const CreateSubjectScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCreateSubject = (data: Subject) => {
    return dispatch(createSubject(data)).unwrap();
  }

  return (
    <div className="pt-30 pl-55">
      <Breadcrumb className="pb-50 font-18">
        <Breadcrumb.Item
          className="cursor-pointer"
          onClick={() => navigate(TopPaths.TOP())}
        >
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item
          className="cursor-pointer"
          onClick={() => navigate(ClassesPaths.SUBJECTS())}
        >
          Subjects
        </Breadcrumb.Item>
        <Breadcrumb.Item>Create</Breadcrumb.Item>
      </Breadcrumb>
      <FormCreateEditSubject onSubmit={handleCreateSubject} />
    </div>
  );
};
export default memo(CreateSubjectScreen);
