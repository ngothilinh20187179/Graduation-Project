import {
  HomeOutlined,
  SnippetsOutlined,
  DeleteOutlined,
  UsergroupAddOutlined
} from "@ant-design/icons";
import { Breadcrumb, Button, Modal, Pagination, Table, Typography } from "antd";
import { memo, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "redux/store";
import { useNavigate } from "react-router-dom";
import { TopPaths } from "features/staff_top/staff_top";
import Search from "antd/es/input/Search";
import { RootState } from "redux/root-reducer";
import { RequestParams } from "types/param.types";
import {
  COLUMNS_TABLE_CLASSES,
  ClassesPaths,
  deleteClassRoom,
  getClasses,
} from "features/staff_classes/staff_classes";
import DropdownButton from "components/DropdownButton/DropdownButton";
import { unwrapResult } from "@reduxjs/toolkit";

const ClassScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [search, setSearch] = useState<string>();
  const [classSelected, setClassSelected] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [triggerReload, setTriggerReload] = useState<boolean>(false);

  const {
    classes: { classes },
  } = useAppSelector((state: RootState) => state);

  const classList = useMemo(() => {
    return classes?.data?.map((item, index) => ({
      ...item,
      index: index + 1,
      credit: `${item.credit} (VNĐ)`,
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
                        <SnippetsOutlined />
                      </span>{" "}
                      Detail
                    </Typography>
                  </>
                ),
                onClick: () => navigate(ClassesPaths.GET_CLASS(Number(item.id))),
              },
              {
                key: "2",
                label: (
                  <>
                    <Typography>
                      <span>
                        <UsergroupAddOutlined />
                      </span>{" "}
                      Add Student
                    </Typography>
                  </>
                ),
                onClick: () => navigate(ClassesPaths.ADD_STUDENTS_TO_CLASS(Number(item.id))),
              },
              {
                key: "3",
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
                  setClassSelected(Number(item.id));
                },
              },
            ],
          }}
        >
          Action
        </DropdownButton>
      ),
    }));
  }, [classes?.data, navigate]);

  useEffect(() => {
    const params: RequestParams = {
      page,
      pageSize,
      search,
    };
    setIsLoading(true);
    dispatch(getClasses(params))
      .unwrap()
      .finally(() => setIsLoading(false));
  }, [dispatch, page, pageSize, search, triggerReload]);

  const handleDeleteClassRoom = () => {
    if (!classSelected) return;
    setIsSubmitting(true);
    setIsLoading(true);
    dispatch(deleteClassRoom(classSelected))
      .then(unwrapResult)
      .then(() => {
        setTriggerReload(!triggerReload);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsSubmitting(false);
        setIsLoading(false);
        setClassSelected(null);
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
        <Breadcrumb.Item>Classes</Breadcrumb.Item>
      </Breadcrumb>
      <div className="flex-space-between-center">
        <Typography>
          Total: There are {classes?.totalRecords} classes
        </Typography>
        <Search
          placeholder="classname"
          allowClear
          enterButton
          size="large"
          onSearch={(value) => setSearch(value)}
          style={{ width: 350 }}
        />
        <Button
          type="primary"
          style={{ height: 40 }}
          onClick={() => navigate(ClassesPaths.CREATE_CLASS())}
        >
          New Class
        </Button>
      </div>
      <Table
        bordered
        rowKey="id"
        size="small"
        loading={isLoading}
        columns={COLUMNS_TABLE_CLASSES()}
        dataSource={classList}
        pagination={false}
        className="mt-20"
        scroll={{ y: 320, x: 400 }}
      />
      <Pagination
        className="flex-justify-center mt-20"
        current={classes?.pageNumber}
        onChange={(newPage) => setPage(newPage)}
        total={Number(classes?.totalPages) * 10}
      />
      <Modal
        centered
        title="Are you sure you want to delete this class room?"
        open={!!classSelected}
        cancelText="Cancel"
        okText="Delete"
        okType="danger"
        onCancel={() => setClassSelected(null)}
        onOk={handleDeleteClassRoom}
        okButtonProps={{
          disabled: isSubmitting,
        }}
      />
    </div>
  );
};

export default memo(ClassScreen);
