import { memo } from "react";
import { Breadcrumb } from "antd";
import { useNavigate } from "react-router-dom";
import { TopPaths } from "features/admin_top/admin_top";
import { HomeOutlined } from "@ant-design/icons";
import { useAppDispatch } from "redux/store";
import { Position, PositionPaths, createPosition } from "features/admin_position/admin_position";
import FormCreateEditPosition from "features/admin_position/components/FormCreateEditPosition/FormCreateEditPosition";

const CreatePositionScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCreatePosition = (data: Position) => {
    return dispatch(createPosition(data)).unwrap();
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
          onClick={() => navigate(PositionPaths.POSITIONS())}
        >
          Positions
        </Breadcrumb.Item>
        <Breadcrumb.Item>Create</Breadcrumb.Item>
      </Breadcrumb>
      <FormCreateEditPosition onSubmit={handleCreatePosition} />
    </div>
  );
};
export default memo(CreatePositionScreen);
