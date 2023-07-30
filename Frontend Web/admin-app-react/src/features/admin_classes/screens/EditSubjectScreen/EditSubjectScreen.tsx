import { memo } from "react";
import { Breadcrumb } from "antd";
import { useNavigate } from "react-router-dom";
import { TopPaths } from "features/admin_top/admin_top";
import { HomeOutlined } from "@ant-design/icons";
import { ClassesPaths, Subject, createSubject } from "features/admin_classes/admin_classes";
import FormCreateEditSubject from "features/admin_classes/components/FormCreateEditSubject/FormCreateEditSubject";
import { useAppDispatch } from "redux/store";

const EditSubjectScreen = () => {
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
            Subject
          </Breadcrumb.Item>
          <Breadcrumb.Item>Edit</Breadcrumb.Item>
        </Breadcrumb>
        <FormCreateEditSubject onSubmit={handleCreateSubject} />
      </div>
    );
  };
  export default memo(EditSubjectScreen);