import { memo } from "react";
import { Breadcrumb } from "antd";
import { useNavigate } from "react-router-dom";
import { TopPaths } from "features/admin_top/admin_top";
import { HomeOutlined } from "@ant-design/icons";
import { ClassesPaths, Room, createRoom } from "features/admin_classes/admin_classes";
import { useAppDispatch } from "redux/store";
import FormCreateEditRoom from "features/admin_classes/components/FormCreateEditRoom/FormCreateEditRoom";

const CreateRoomScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCreateRoom = (data: Room) => {
    return dispatch(createRoom(data)).unwrap();
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
          onClick={() => navigate(ClassesPaths.ROOMS())}
        >
          Rooms
        </Breadcrumb.Item>
        <Breadcrumb.Item>Create</Breadcrumb.Item>
      </Breadcrumb>
      <FormCreateEditRoom onSubmit={handleCreateRoom} />
    </div>
  );
};
export default memo(CreateRoomScreen);
