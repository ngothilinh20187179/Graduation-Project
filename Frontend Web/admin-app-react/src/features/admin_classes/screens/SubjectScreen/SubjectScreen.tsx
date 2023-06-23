import { getSubjects } from "features/admin_classes/admin_classes";
import { memo, useEffect, useState } from "react";
import { useAppDispatch } from "redux/store";

const SubjectScreen = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getSubjects())
      .unwrap()
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  return <div className="pt-55 pl-55">subject screen</div>;
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