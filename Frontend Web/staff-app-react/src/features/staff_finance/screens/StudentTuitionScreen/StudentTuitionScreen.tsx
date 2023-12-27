import {
  Badge,
  Breadcrumb,
  Pagination,
  Table,
  Typography,
} from "antd";
import { memo, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "redux/store";
import { useNavigate } from "react-router-dom";
import { TopPaths } from "features/staff_top/staff_top";
import { RequestParams } from "types/param.types";
import { RootState } from "redux/root-reducer";
import { HomeOutlined } from "@ant-design/icons";
import {
  COLUMNS_TABLE_TUITION,
  FinancePaths,
  getStudentTuitionInformation,
} from "features/staff_finance/staff_finance";
import DropdownButton from "components/DropdownButton/DropdownButton";
import { numberWithCommas } from "helpers/utils.helper";

const StudentTuitionScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const pageSize = 20;
  const [tuitionStatusFilter, setTuitionStatusFilter] =
    useState<boolean | null>(null);

  const {
    finance: { studentTuition },
  } = useAppSelector((state: RootState) => state);

  const studentTuitionList = useMemo(() => {
    return studentTuition?.data?.map((item, index) => ({
      ...item,
      index: index + 1,
      studentInfo: (
        <div>
          <Typography className="font-14">Id: {item.studentInfo.id} - Name: {item.studentInfo.lastName} {item.studentInfo.firstName}</Typography>
        </div>
      ),
      className: item.classInfo.className,
      credit: `${numberWithCommas(item.classInfo.credit)} (VNĐ)`,
      status: item.isPaidTuition ? <Badge status="success" text="Paid" /> : <Badge status="error" text="Not Paid" />,
      note: item.note,
    }));
  }, [studentTuition?.data, navigate]);

  useEffect(() => {
    const params: RequestParams = {
      page,
      pageSize,
      isPaidTuition: tuitionStatusFilter,
    };
    setIsLoading(true);
    dispatch(getStudentTuitionInformation(params))
      .unwrap()
      .finally(() => setIsLoading(false));
  }, [dispatch, page, pageSize, tuitionStatusFilter]);

  return (
    <>
      <div className="pt-30 pl-55 pr-20">
        <Breadcrumb className="pb-20 font-18">
          <Breadcrumb.Item
            className="cursor-pointer"
            onClick={() => navigate(TopPaths.TOP())}
          >
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item
            className="cursor-pointer"
            onClick={() => navigate(FinancePaths.FINANCE())}
          >
            Finance
          </Breadcrumb.Item>
          <Breadcrumb.Item>Student Tuition</Breadcrumb.Item>
        </Breadcrumb>
        <div className="flex-space-between-center">
          <Typography>
            Total: {studentTuition?.totalRecords}
          </Typography>
          <div className="flex">
            <DropdownButton
              menuProps={{
                items: [
                  {
                    key: "1",
                    label: "Paid",
                    onClick: () => {
                      setTuitionStatusFilter(true);
                    },
                  },
                  {
                    key: "2",
                    label: "Not Paid",
                    onClick: () => {
                      setTuitionStatusFilter(false);
                    },
                  },
                  {
                    key: "3",
                    label: "All status",
                    onClick: () => {
                      setTuitionStatusFilter(null);
                    },
                  },
                ],
              }}
            >
              Status filter
            </DropdownButton>
          </div>
        </div>
        <Table
          bordered
          rowKey="id"
          size="small"
          loading={isLoading}
          columns={COLUMNS_TABLE_TUITION()}
          dataSource={studentTuitionList}
          pagination={false}
          className="mt-20"
          scroll={{ y: 320, x: 400 }}
        />
        <Pagination
          className="flex-justify-center mt-20"
          current={studentTuition?.pageNumber}
          onChange={(newPage) => setPage(newPage)}
          total={Number(studentTuition?.totalPages) * 10}
        />
      </div>
    </>
  );
};

export default memo(StudentTuitionScreen);
