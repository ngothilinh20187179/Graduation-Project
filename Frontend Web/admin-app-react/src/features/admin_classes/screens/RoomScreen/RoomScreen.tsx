import { Badge, Breadcrumb, Button, Modal, Pagination, Table, Typography } from "antd";
import { TopPaths } from "features/admin_top/admin_top";
import { memo, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HomeOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "redux/store";
import {
  COLUMNS_TABLE_ROOMS,
  ClassesPaths,
  RoomStatusType,
  deleteRoom,
  getRooms,
} from "features/admin_classes/admin_classes";
import Search from "antd/es/input/Search";
import { RootState } from "redux/root-reducer";
import DropdownButton from "components/DropdownButton/DropdownButton";
import { RequestParams } from "types/param.types";
import { unwrapResult } from "@reduxjs/toolkit";

// TODO:
// filter list room theo status room
// add search, page, pageSize on url

const RoomScreen = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [roomSelected, setRoomSelected] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [triggerReload, setTriggerReload] = useState<boolean>(false);

  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [search, setSearch] = useState<string>();

  const {
    classes: { rooms },
  } = useAppSelector((state: RootState) => state);

  const roomList = useMemo(() => {
    return rooms?.data?.map((room, index) => ({
      ...room,
      index: index + 1,
      roomStatus:
        room.roomStatus === RoomStatusType.CanUse ? (
          <Badge status="success" text="Can Use" />
        ) : (
          <Badge status="error" text="Can Not Use" />
        ),
      action: (
        <DropdownButton
          menuProps={{
            items: [
              {
                key: "1",
                label: (
                  <>
                    <Typography>
                      <span>
                        <EditOutlined />
                      </span>{" "}
                      Edit
                    </Typography>
                  </>
                ),
                onClick: () =>
                  navigate(ClassesPaths.EDIT_ROOM(Number(room.id))),
              },
              {
                key: "2",
                label: (
                  <>
                    <Typography>
                      <span>
                        <DeleteOutlined />
                      </span>{" "}
                      Delete
                    </Typography>
                  </>
                ),
                onClick: () => {
                  setRoomSelected(Number(room.id));
                },
              },
            ],
          }}
        >
          Action
        </DropdownButton>
      ),
    }));
  }, [rooms?.data, navigate]);

  useEffect(() => {
    const params: RequestParams = {
      page,
      pageSize,
      search,
    };
    setIsLoading(true);
    dispatch(getRooms(params))
      .unwrap()
      .finally(() => setIsLoading(false));
  }, [dispatch, triggerReload, page, pageSize, search]);

    const handleDeleteRoom = () => {
    if (!roomSelected) return;
    setIsSubmitting(true);
    setIsLoading(true);
    dispatch(deleteRoom(roomSelected))
      .then(unwrapResult)
      .then(() => {
        setTriggerReload(!triggerReload);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsSubmitting(false);
        setIsLoading(false);
        setRoomSelected(null);
      });
  };

  return (
    <div className="pt-30 pl-55 pr-55">
      <Breadcrumb className="pb-20 font-18">
        <Breadcrumb.Item
          className="cursor-pointer"
          onClick={() => navigate(TopPaths.TOP())}
        >
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item>Rooms</Breadcrumb.Item>
      </Breadcrumb>
      <div className="flex-space-between-center">
        <Typography>Total: There are {rooms?.totalRecords} rooms</Typography>
        <Search
          placeholder="room's name"
          allowClear
          enterButton
          size="large"
          onSearch={(value) => setSearch(value)}
          style={{ width: 350 }}
        />
        <Button
          type="primary"
          style={{ height: 40 }}
          onClick={() => navigate(ClassesPaths.CREATE_ROOM())}
        >
          New Room
        </Button>
      </div>
      <Table
        bordered
        rowKey="id"
        size="small"
        loading={isLoading}
        columns={COLUMNS_TABLE_ROOMS()}
        dataSource={roomList}
        pagination={false}
        className="mt-20"
        scroll={{ y: 320, x: 400 }}
      />
      <Pagination
        className="flex-justify-center mt-20"
        current={rooms?.pageNumber}
        onChange={(newPage) => setPage(newPage)}
        total={Number(rooms?.totalPages) * 10}
      />
      <Modal
          centered
          title="Are you sure you want to delete this room?"
          open={!!roomSelected}
          cancelText="Cancel"
          okText="Delete"
          okType="danger"
          onCancel={() => setRoomSelected(null)}
          onOk={handleDeleteRoom}
          okButtonProps={{
            disabled: isSubmitting,
          }}
        />
    </div>
  );
};

export default memo(RoomScreen);
