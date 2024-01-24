import {
  HomeOutlined,
  SnippetsOutlined,
  ArrowRightOutlined,
  DeleteOutlined,
  CheckOutlined
} from "@ant-design/icons";
import { Breadcrumb, Button, Modal, Pagination, Table, Typography } from "antd";
import { memo, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "redux/store";
import { useNavigate } from "react-router-dom";
import Search from "antd/es/input/Search";
import { RootState } from "redux/root-reducer";
import { RequestParams } from "types/param.types";
import { getTimeUTC } from "helpers/utils.helper";
import { COLUMNS_TABLE_QUIZZES, ClassNameAndId, TeachingPaths } from "features/teacher_teaching/teaching.types";
import { deleteQuiz, getAssignedClasses, getQuizzes } from "features/teacher_teaching/redux/teaching.slice";
import DropdownButton from "components/DropdownButton/DropdownButton";
import { unwrapResult } from "@reduxjs/toolkit";

const ListQuizzesScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const pageSize = 20;
  const [search, setSearch] = useState<string>();
  const [quizSelected, setQuizSelected] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [triggerReload, setTriggerReload] = useState<boolean>(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalAssignedOpen, setIsModalAssignedOpen] = useState(false);
  const [assignedClasses, setAssignedClasses] = useState<ClassNameAndId[] | null>(null);

  const {
    teaching: { quizzes },
  } = useAppSelector((state: RootState) => state);

  const quizzesList = useMemo(() => {
    return quizzes?.data?.map((item, index) => ({
      ...item,
      index: index + 1,
      created: getTimeUTC(item?.created),
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
                onClick: () => {
                    navigate(TeachingPaths.GET_QUIZ(Number(item.id)))
                }
              },
              {
                key: "2",
                label: (
                  <>
                    <Typography>
                      <span>
                        <ArrowRightOutlined />
                      </span>{" "}
                      Assign classes
                    </Typography>
                  </>
                ),
                onClick: () => {
                    navigate(TeachingPaths.ASSIGN_CLASS(Number(item.id)))
                }
              },
              {
                key: "3",
                label: (
                  <>
                    <Typography>
                      <span>
                        <CheckOutlined />
                      </span>{" "}
                      Assigned classes
                    </Typography>
                  </>
                ),
                onClick: () => {
                  handleGetListAssignedClass(Number(item.id))
                  setIsModalAssignedOpen(true);
                },
              },
              {
                key: "4",
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
                  setQuizSelected(Number(item.id));
                  setIsModalDeleteOpen(true);
                },
              },
            ],
          }}
        >
          Action
        </DropdownButton>
      ),
    }));
  }, [quizzes?.data, navigate]);

  useEffect(() => {
    const params: RequestParams = {
      page,
      pageSize,
      search,
    };
    setIsLoading(true);
    dispatch(getQuizzes(params))
      .unwrap()
      .finally(() => setIsLoading(false));
  }, [dispatch, page, pageSize, search, triggerReload]);

  
  const handleDeleteQuiz = () => {
    if (!quizSelected) return;
    setIsSubmitting(true);
    setIsLoading(true);
    dispatch(deleteQuiz(quizSelected))
      .then(unwrapResult)
      .then(() => {
        setTriggerReload(!triggerReload);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsSubmitting(false);
        setIsLoading(false);
        setQuizSelected(null);
      });
  };

  const handleGetListAssignedClass = (id: number) => {
    dispatch(getAssignedClasses(id))
    .then(unwrapResult)
    .then((body) => {
      setAssignedClasses(body.data)
    })
    .catch((err) => console.log(err))
  }

  const assignedClassesList = useMemo(() => {
    if(assignedClasses?.length === 0) {
      return <Typography>There are no classes assigned to this quiz yet</Typography>
    }
    return assignedClasses?.map((item) => (
      <>
        <Typography key={item.id}>Id: {item.id} - Class Name: {item.className}</Typography>
      </>
    ));
  }, [assignedClasses]);

  return (
    <div className="pt-30 pl-40 pr-30">
      <Breadcrumb className="pb-20 font-18">
        <Breadcrumb.Item>
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item>Quizzes</Breadcrumb.Item>
      </Breadcrumb>
      <div className="flex-space-between-center">
        <Typography className="mr-150">
          Total: There are {quizzes?.totalRecords} quizzes
        </Typography>
        <Search
          placeholder="quiz's name"
          allowClear
          enterButton
          size="large"
          onSearch={(value) => setSearch(value)}
          style={{ width: 350 }}
        />
        <Button
          type="primary"
          style={{ height: 40 }}
          onClick={() => navigate(TeachingPaths.CREATE_QUIZ())}
        >
          New Quiz
        </Button>
      </div>
      <Table
        bordered
        rowKey="id"
        size="small"
        loading={isLoading}
        columns={COLUMNS_TABLE_QUIZZES()}
        dataSource={quizzesList}
        pagination={false}
        className="mt-20"
        scroll={{ y: 320, x: 400 }}
      />
      <Pagination
        className="flex-justify-center mt-20"
        current={quizzes?.pageNumber}
        onChange={(newPage) => setPage(newPage)}
        total={Number(quizzes?.totalPages) * 10}
      />
      <Modal
        centered
        title="Are you sure you want to delete this quiz?"
        open={isModalDeleteOpen}
        cancelText="Cancel"
        okText="Delete"
        okType="danger"
        onCancel={() => {
          setQuizSelected(null)
          setIsModalDeleteOpen(false);
        }}
        onOk={handleDeleteQuiz}
        okButtonProps={{
          disabled: isSubmitting,
        }}
      />
      <Modal
        centered
        title="These are the classes assigned to the test"
        open={isModalAssignedOpen}
        footer={false}
        onCancel={() => {
          setAssignedClasses(null)
          setIsModalAssignedOpen(false);
        }}
      >
        <div className="pt-10 pl-20 pb-10">
          {assignedClassesList}
        </div>
      </Modal>
    </div>
  );
};

export default memo(ListQuizzesScreen);
