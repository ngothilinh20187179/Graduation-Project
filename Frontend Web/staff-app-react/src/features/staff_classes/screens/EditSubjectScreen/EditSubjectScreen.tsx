import { memo, useEffect } from "react";
import { Breadcrumb } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { TopPaths } from "features/staff_top/staff_top";
import { HomeOutlined } from "@ant-design/icons";
import {
  ClassesPaths,
  Subject,
  getSubject,
  updateSubject,
} from "features/staff_classes/staff_classes";
import FormCreateEditSubject from "features/staff_classes/components/FormCreateEditSubject/FormCreateEditSubject";
import { useAppDispatch, useAppSelector } from "redux/store";
import { RootState } from "redux/root-reducer";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";

const EditSubjectScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    classes: { subject },
  } = useAppSelector((state: RootState) => state);

  useEffect(() => {
    dispatch(getSubject(Number(id)));
  }, [dispatch, id]);

  const handleEditSubject = (data: Subject) => {
    return dispatch(updateSubject(data)).unwrap();
  };

  if (!subject) return <LoadingSpinner />;

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
        <Breadcrumb.Item>Edit</Breadcrumb.Item>
      </Breadcrumb>
      <FormCreateEditSubject
        isEditScreen
        onSubmit={handleEditSubject}
        subject={subject?.data}
      />
    </div>
  );
};
export default memo(EditSubjectScreen);
