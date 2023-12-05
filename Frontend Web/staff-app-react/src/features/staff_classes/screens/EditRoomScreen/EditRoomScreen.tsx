import { memo, useEffect } from "react";
import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "redux/store";
import { useNavigate, useParams } from "react-router-dom";
import { TopPaths } from "features/staff_top/staff_top";
import { ClassesPaths, Room, getRoom, updateRoom } from "features/staff_classes/staff_classes";
import { RootState } from "redux/root-reducer";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import FormCreateEditRoom from "features/staff_classes/components/FormCreateEditRoom/FormCreateEditRoom";

const EditRoomScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    classes: { room },
  } = useAppSelector((state: RootState) => state);

  useEffect(() => {
    dispatch(getRoom(Number(id)));
  }, [dispatch, id]);

  const handleEditRoom = (data: Room) => {
    return dispatch(updateRoom(data)).unwrap();
  };

  if (!room) return <LoadingSpinner />;

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
          onClick={() => navigate(ClassesPaths.ROOMS())}
        >
          Rooms
        </Breadcrumb.Item>
        <Breadcrumb.Item>Edit</Breadcrumb.Item>
      </Breadcrumb>
      <FormCreateEditRoom
        isEditScreen
        onSubmit={handleEditRoom}
        room={room?.data}
      />
    </div>
  );
};

export default memo(EditRoomScreen);
