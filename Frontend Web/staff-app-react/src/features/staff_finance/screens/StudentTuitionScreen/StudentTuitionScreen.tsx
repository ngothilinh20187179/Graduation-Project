import { Badge, Breadcrumb, Modal, Pagination, Table, Typography } from "antd";
import { memo, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "redux/store";
import { useNavigate } from "react-router-dom";
import { TopPaths } from "features/staff_top/staff_top";
import { RequestParams } from "types/param.types";
import { RootState } from "redux/root-reducer";
import { HomeOutlined, EditOutlined, CheckOutlined } from "@ant-design/icons";
import {
  COLUMNS_TABLE_TUITION,
  FinancePaths,
  confirmPayment,
  getStudentTuitionInformation,
  takeNoteTuition,
} from "features/staff_finance/staff_finance";
import DropdownButton from "components/DropdownButton/DropdownButton";
import { numberWithCommas } from "helpers/utils.helper";
import { unwrapResult } from "@reduxjs/toolkit";
import TextArea from "antd/es/input/TextArea";
import { TakeNoteTuition } from "features/staff_finance/types/spending.types";

const StudentTuitionScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const pageSize = 20;
  const [tuitionStatusFilter, setTuitionStatusFilter] = useState<
    boolean | null
  >(null);
  const [tuitionId, setTuitionId] = useState<number | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const [isTakeNoteModalOpen, setIsTakeNoteModalOpen] =
    useState<boolean>(false);
  const [triggerReload, setTriggerReload] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [note, setNote] = useState<string | null>(null);

  const {
    finance: { studentTuition },
  } = useAppSelector((state: RootState) => state);

  const studentTuitionList = useMemo(() => {
    return studentTuition?.data?.map((item, index) => ({
      ...item,
      index: index + 1,
      studentInfo: (
        <div>
          <Typography className="font-14">
            Id: {item.studentInfo.id} - Name: {item.studentInfo.lastName}{" "}
            {item.studentInfo.firstName}
          </Typography>
        </div>
      ),
      className: item.classInfo.className,
      credit: `${numberWithCommas(item.classInfo.credit)} (VNĐ)`,
      status: item.isPaidTuition ? (
        <Badge status="success" text="Paid" />
      ) : (
        <Badge status="error" text="Not Paid" />
      ),
      note: item.note,
      action: item.isPaidTuition ? (
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
                      Take note
                    </Typography>
                  </>
                ),
                onClick: () => {
                  setIsTakeNoteModalOpen(true);
                  setTuitionId(item.id);
                },
              },
            ],
          }}
        >
          Action
        </DropdownButton>
      ) : (
        <DropdownButton
          menuProps={{
            items: [
              {
                key: "1",
                label: (
                  <>
                    <Typography>
                      <span>
                        <CheckOutlined />
                      </span>{" "}
                      Confirm payment
                    </Typography>
                  </>
                ),
                onClick: () => {
                  setIsConfirmModalOpen(true);
                  setTuitionId(item.id);
                },
              },
              {
                key: "2",
                label: (
                  <>
                    <Typography>
                      <span>
                        <EditOutlined />
                      </span>{" "}
                      Take note
                    </Typography>
                  </>
                ),
                onClick: () => {
                  setIsTakeNoteModalOpen(true);
                  setTuitionId(item.id);
                },
              },
            ],
          }}
        >
          Action
        </DropdownButton>
      ),
    }));
  }, [studentTuition?.data, navigate]);

  const handleConfirm = () => {
    if (!tuitionId) return;
    setIsSubmitting(true);
    setIsLoading(true);
    dispatch(confirmPayment(Number(tuitionId)))
      .then(unwrapResult)
      .then(() => {
        setTriggerReload(!triggerReload);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsSubmitting(false);
        setIsLoading(false);
        setTuitionId(null);
        setIsConfirmModalOpen(false);
      });
  };

  const handleTakeNote = () => {
    if (!tuitionId) return;
    if (!note) return;
    setIsSubmitting(true);
    setIsLoading(true);
    var data: TakeNoteTuition = {
      id: Number(tuitionId),
      note: note,
    };
    console.log(data);
    dispatch(takeNoteTuition(data))
      .then(unwrapResult)
      .then(() => {
        setTriggerReload(!triggerReload);
      })
      .finally(() => {
        setIsSubmitting(false);
        setIsLoading(false);
        setTuitionId(null);
        setNote(null);
        setIsTakeNoteModalOpen(false);
      });
  };

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
  }, [dispatch, page, pageSize, tuitionStatusFilter, triggerReload]);

  return (
    <>
      <div className="pt-30 pl-55 pr-40">
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
          <Typography>Total: {studentTuition?.totalRecords}</Typography>
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
        <Modal
          centered
          title={"Take Note"}
          open={isTakeNoteModalOpen}
          okText="Save"
          onCancel={() => {
            setIsTakeNoteModalOpen(false);
            setTuitionId(null);
            setNote(null);
          }}
          onOk={handleTakeNote}
          okButtonProps={{
            disabled: isSubmitting || note === null || note === "",
          }}
        >
          <TextArea
            placeholder="Content"
            defaultValue={""}
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => {
              setNote(e.target.value);
            }}
          />
        </Modal>
        <Modal
          centered
          title={"Confirm this student has paid ?"}
          open={isConfirmModalOpen}
          okText="Save"
          onCancel={() => {
            setIsConfirmModalOpen(false);
            setTuitionId(null);
          }}
          onOk={handleConfirm}
          okButtonProps={{
            disabled: isSubmitting,
          }}
        />
      </div>
    </>
  );
};

export default memo(StudentTuitionScreen);
