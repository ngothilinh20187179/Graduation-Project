import {
  Breadcrumb,
  Pagination,
  Table,
  Typography,
  Image,
  Avatar,
} from "antd";
import { memo, useEffect, useMemo, useState } from "react";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { TeachingPaths } from "features/teacher_teaching/teaching.types";
import { useAppDispatch, useAppSelector } from "redux/store";
import { RootState } from "redux/root-reducer";
import { useNavigate, useParams } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  COLUMNS_TABLE_STUDENTS,
  GenderType,
} from "features/teacher_users/constants/users.constants";
import { getStudentsInClass } from "features/teacher_users/teacher_users";
import DropdownButton from "components/DropdownButton/DropdownButton";
import { RequestParams } from "types/param.types";

const ListStudentsInClassScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [page, setPage] = useState<number>(1);
  const pageSize = 20;
  const [isLoading, setIsLoading] = useState(false);

  const {
    users: { students },
  } = useAppSelector((state: RootState) => state);

  useEffect(() => {
    const params: RequestParams = {
      id: Number(id),
      page,
      pageSize,
    };
    setIsLoading(true);
    dispatch(getStudentsInClass(params))
      .then(unwrapResult)
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch, id, page, pageSize]);

  const studentList = useMemo(() => {
    return students?.data?.map((student, index) => ({
      ...student,
      index: index + 1,
      avatar: student?.avatar ? (
        <Image
          width={40}
          preview={false}
          src={`data:${student.avatar.mediaType};base64,${student.avatar.data}`}
        />
      ) : (
        <Avatar size={40} icon={<UserOutlined />} />
      ),
      gender:
        student.gender === GenderType.Female
          ? "Female"
          : student.gender === GenderType.Male
          ? "Male"
          : "Unknown",
      action: (
        <DropdownButton
          menuProps={{
            items: [
              {
                key: "1",
                label: (
                  <>
                    <Typography>
                      Online test scores
                    </Typography>
                  </>
                ),
                onClick: () => {
                  navigate(TeachingPaths.QUIZ_MARKS(Number(student.id)));
                },
              },
              {
                key: "2",
                label: (
                  <>
                    <Typography>
                      Offline test scores
                    </Typography>
                  </>
                ),
                onClick: () => {
                  navigate(TeachingPaths.MARKS(Number(student.id)));
                },
              },
            ],
          }}
        >
          Action
        </DropdownButton>
      ),
    }));
  }, [students?.data, navigate]);

  return (
    <div className="pt-30 pl-50 pr-50">
      <Breadcrumb className="pb-20 font-18">
        <Breadcrumb.Item>
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item
          className="cursor-pointer"
          onClick={() => navigate(TeachingPaths.CLASSES())}
        >
          Classes
        </Breadcrumb.Item>
        <Breadcrumb.Item>List Students</Breadcrumb.Item>
      </Breadcrumb>
      <div className="flex-align-center">
        <Typography className="mr-150">
          Total: There are {students?.totalRecords} students in class
        </Typography>
      </div>
      <Table
        bordered
        rowKey="id"
        size="small"
        loading={isLoading}
        columns={COLUMNS_TABLE_STUDENTS()}
        dataSource={studentList}
        pagination={false}
        className="mt-20"
        scroll={{ y: 320, x: 400 }}
      />
      <Pagination
        className="flex-justify-center mt-20"
        current={students?.pageNumber}
        onChange={(newPage) => setPage(newPage)}
        total={Number(students?.totalPages) * 10}
      />
    </div>
  );
};

export default memo(ListStudentsInClassScreen);
