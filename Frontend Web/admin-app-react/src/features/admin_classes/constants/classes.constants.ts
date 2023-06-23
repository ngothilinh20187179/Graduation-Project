export enum SubjectStatusType {
  Close,
  Open,
}

// export const COLUMNS_TABLE_VEHICLES = () => [
//   {
//     title: i18next.t("vin", { ns: "vehicles" }),
//     dataIndex: "vin",
//     width: "285px",
//   },
//   {
//     title: i18next.t("date_register", { ns: "vehicles" }),
//     dataIndex: "createdAt",
//     width: "130px",
//     render: (createdAt: string) => getTimeUTC(createdAt, "YYYY/MM/DD") ?? "-",
//   },
//   {
//     title: i18next.t("nickname", { ns: "vehicles" }),
//     dataIndex: "nickname",
//     ellipsis: true,
//     width: "130px",
//   },
//   {
//     title: i18next.t("license_plates", { ns: "vehicles" }),
//     dataIndex: "licensePlates",
//     ellipsis: true,
//     width: "180px",
//   },
//   {
//     title: i18next.t("vehicle_status", { ns: "vehicles" }),
//     dataIndex: "status",
//     width: "90px",
//     ellipsis: true,
//     render: (status: VEHICLES_STATUS_TYPE) =>
//       i18next.t(VEHICLES_STATUS[status], { ns: "vehicles" }),
//   },
//   {
//     title: i18next.t("action", { ns: "vehicles" }),
//     dataIndex: "action",
//     width: "140px",
//   },
//   {
//     title: i18next.t("table_header_primary_secondary", { ns: "vehicles" }),
//     dataIndex: "redirect",
//     width: "140px",
//   },
// ];
