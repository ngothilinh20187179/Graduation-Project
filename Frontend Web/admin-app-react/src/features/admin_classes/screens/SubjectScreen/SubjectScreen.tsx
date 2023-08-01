import {
  Badge,
  Breadcrumb,
  Button,
  Modal,
  Pagination,
  Table,
  Typography,
} from "antd";
import {
  COLUMNS_TABLE_SUBJECTS,
  ClassesPaths,
  SubjectStatusType,
  deleteSubject,
  getSubjects,
} from "features/admin_classes/admin_classes";
import { unwrapResult } from "@reduxjs/toolkit";
import { memo, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "redux/store";
import { useNavigate } from "react-router-dom";
import { TopPaths } from "features/admin_top/admin_top";
import { RequestParams } from "types/param.types";
import { RootState } from "redux/root-reducer";
import DropdownButton from "components/DropdownButton/DropdownButton";
import { HomeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Search from "antd/es/input/Search";

// TODO: 
// filter list subject theo status subject
// add search, page, pageSize on url

const SubjectScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [subjectSelected, setSubjectSelected] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [triggerReload, setTriggerReload] = useState<boolean>(false);

  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [search, setSearch] = useState<string>();

  const {
    classes: { subjects },
  } = useAppSelector((state: RootState) => state);

  const subjectList = useMemo(() => {
    return subjects?.data?.map((subject, index) => ({
      ...subject,
      index: index + 1,
      subjectStatus:
        subject.subjectStatus === SubjectStatusType.Open ? (
          <Badge status="success" text="Enable" />
        ) : (
          <Badge status="error" text="Disable" />
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
                  navigate(ClassesPaths.EDIT_SUBJECT(Number(subject.id))),
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
                  setSubjectSelected(Number(subject.id));
                },
              },
            ],
          }}
        >
          Action
        </DropdownButton>
      ),
    }));
  }, [subjects?.data, navigate]);

  useEffect(() => {
    const params: RequestParams = {
      page,
      pageSize,
      search,
    };
    setIsLoading(true);
    dispatch(getSubjects(params))
      .unwrap()
      .finally(() => setIsLoading(false));
  }, [dispatch, triggerReload, page, pageSize, search]);

  const handleDeleteSubject = () => {
    if (!subjectSelected) return;
    setIsSubmitting(true);
    setIsLoading(true);
    dispatch(deleteSubject(subjectSelected))
      .then(unwrapResult)
      .then(() => {
        setTriggerReload(!triggerReload);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsSubmitting(false);
        setIsLoading(false);
        setSubjectSelected(null);
      });
  };

  return (
    <>
      <div className="pt-30 pl-55 pr-55">
        <Breadcrumb className="pb-20 font-18">
          <Breadcrumb.Item
            className="cursor-pointer"
            onClick={() => navigate(TopPaths.TOP())}
          >
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item>Subjects</Breadcrumb.Item>
        </Breadcrumb>
        <div className="flex-space-between-center">
          <Typography>
            Total: There are {subjects?.totalRecords} subjects
          </Typography>
          <Search
            placeholder="subject"
            allowClear
            enterButton
            size="large"
            onSearch={(value) => setSearch(value)}
            style={{ width: 350 }}
          />
          <Button
            type="primary"
            style={{ height: 40 }}
            onClick={() => navigate(ClassesPaths.CREATE_SUBJECT())}
          >
            New Subject
          </Button>
        </div>
        <Table
          bordered
          rowKey="id"
          size="small"
          loading={isLoading}
          columns={COLUMNS_TABLE_SUBJECTS()}
          dataSource={subjectList}
          pagination={false}
          className="mt-20"
          scroll={{ y: 320, x: 400 }}
        />
        <Pagination
          className="flex-justify-center mt-20"
          current={subjects?.pageNumber}
          onChange={(newPage) => setPage(newPage)}
          total={Number(subjects?.totalPages) * 10}
        />
        <Modal
          centered
          title="Are you sure you want to delete this subject?"
          open={!!subjectSelected}
          cancelText="Cancel"
          okText="Delete"
          okType="danger"
          onCancel={() => setSubjectSelected(null)}
          onOk={handleDeleteSubject}
          okButtonProps={{
            disabled: isSubmitting,
          }}
        />
      </div>
    </>
  );
};

export default memo(SubjectScreen);

// const VehicleManagementScreen = () => {
//     const dispatch = useAppDispatch();
//     const navigate = useNavigate();
//     const { t } = useTranslation("vehicles");
//     const { t: t_mes } = useTranslation("message");
//     const { vehicles } = useSelector((state: RootState) => state.vehicles);

//     const [searchParams, setSearchParams] = useSearchParams();
//     const page = Number(searchParams.get("page")) || 1;
//     const search = searchParams.get("search") ?? undefined;

//     const [isLoading, setIsLoading] = useState<boolean>(false);
//     const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//     const [triggerReload, setTriggerReload] = useState<boolean>(false);

//     const [vehicleSelected, setVehicleSelected] = useState<number | null>(null);

//     const handleReceiveVehicle = (vehicleId: number) => {
//       setIsSubmitting(true);
//       dispatch(receiveVehicle(vehicleId))
//         .unwrap()
//         .then(() => {
//           setTriggerReload(!triggerReload);
//           dispatch(getCLTop({}));
//         })
//         .catch((error: ErrorsResponse) => {
//           getMessageErrors(error);
//         })
//         .finally(() => {
//           setIsSubmitting(false);
//         });
//     };

//     const handleDeleteVehicle = () => {
//       if (!vehicleSelected) return;

//       setIsSubmitting(true);
//       dispatch(deleteVehicle(vehicleSelected))
//         .unwrap()
//         .then(() => {
//           searchParams.delete("page");
//           setSearchParams(searchParams);
//           setTriggerReload(!triggerReload);
//           dispatch(getCLTop({}));
//         })
//         .catch((error: ErrorsResponse) => {
//           getMessageErrors(error);
//         })
//         .finally(() => {
//           setVehicleSelected(null);
//           setIsSubmitting(false);
//         });
//     };

//     const adVehicleList = useMemo(() => {
//       return vehicles?.adVehicles?.map(vehicle => ({
//         ...vehicle,
//         vin: <div title={vehicle.vin}>{convertVin(vehicle.vin, 21)}</div>,
//         action: (
//           <ButtonDropdown
//             menuProps={{
//               items: [
//                 {
//                   key: "1",
//                   label: t("menu_item.express"),
//                   onClick: () => navigate(VehiclesPaths.GET(vehicle.id)),
//                 },
//                 {
//                   key: "2",
//                   label: t("menu_item.delete"),
//                   onClick: () => setVehicleSelected(vehicle.id),
//                 },
//                 {
//                   key: "3",
//                   label: t("menu_item.receive"),
//                   disabled:
//                     vehicle.status !== VEHICLES_STATUS_TYPE.ALLOCATED ||
//                     isSubmitting,
//                   onClick: () => {
//                     handleReceiveVehicle(vehicle.id);
//                   },
//                 },
//               ],
//             }}
//           >
//             {t("action")}
//           </ButtonDropdown>
//         ),
//         redirect: (
//           <Button
//             disabled={vehicle.status !== VEHICLES_STATUS_TYPE.RECEIVED}
//             onClick={() => {
//               navigate(
//                 VehiclesPaths.SETTING_PRIMARY_SECONDARY(Number(vehicle.id))
//               );
//             }}
//           >
//             {t("button.confirm_and_change")}
//           </Button>
//         ),
//       }));
//       // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [vehicles?.adVehicles, t, navigate]);

//     useEffect(() => {
//       const params: RequestParams = {
//         page,
//         search,
//       };
//       setIsLoading(true);
//       dispatch(getAllVehicles(params))
//         .unwrap()
//         .finally(() => setIsLoading(false));
//     }, [page, search, dispatch, triggerReload]);

//     return (
//       <>
//         <div className="ml-9">
//           <Typography className="mb-9 font-28">
//             {t("title_vehicle_management")}
//           </Typography>
//           <div className="flex-space-between mb-10">
//             <InputSearch />
//           </div>
//         </div>
//         <div className={cx(styles.table, "table-basic")}>
//           <Table
//             bordered
//             rowKey="id"
//             size="small"
//             loading={isLoading}
//             columns={getColumnTableConvertNullable(COLUMNS_TABLE_VEHICLES())}
//             dataSource={adVehicleList}
//             pagination={false}
//             className="mb-9"
//             scroll={{ y: 320 }}
//           />
//           <PaginationCustom current={page} total={vehicles?.total} />
//         </div>
//         <Modal
//           centered
//           open={!!vehicleSelected}
//           cancelText={t("button.cancel")}
//           okText={t("menu_item.delete").split("")}
//           onCancel={() => setVehicleSelected(null)}
//           onOk={handleDeleteVehicle}
//           title={t_mes("web_113")}
//           okButtonProps={{ disabled: isSubmitting }}
//         />
//       </>
//     );
//   };

//   export default memo(VehicleManagementScreen);
