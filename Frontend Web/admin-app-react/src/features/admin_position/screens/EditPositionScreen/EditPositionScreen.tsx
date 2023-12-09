import { memo, useEffect } from "react";
import { Breadcrumb } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { TopPaths } from "features/admin_top/admin_top";
import { HomeOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "redux/store";
import { RootState } from "redux/root-reducer";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import { Position, PositionPaths, getPosition, updatePosition } from "features/admin_position/admin_position";
import FormCreateEditPosition from "features/admin_position/components/FormCreateEditPosition/FormCreateEditPosition";

const EditPositionScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    positions: { position },
  } = useAppSelector((state: RootState) => state);

  useEffect(() => {
    dispatch(getPosition(Number(id)));
  }, [dispatch, id]);

  const handleEditPosition = (data: Position) => {
    return dispatch(updatePosition(data)).unwrap();
  };

  if (!position) return <LoadingSpinner />;

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
          onClick={() => navigate(PositionPaths.POSITIONS())}
        >
          Positions
        </Breadcrumb.Item>
        <Breadcrumb.Item>Edit</Breadcrumb.Item>
      </Breadcrumb>
      <FormCreateEditPosition
        isEditScreen
        onSubmit={handleEditPosition}
        position={position?.data}
      />
    </div>
  );
};
export default memo(EditPositionScreen);
