export enum SubjectStatusType {
  Close,
  Open,
}

export const COLUMNS_TABLE_SUBJECTS = () => [
  {
    title: "",
    dataIndex: "index",
    key: "index",
    width: "70px",
  },
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    width: "70px",
  }, 
  {
    title: "Name",
    dataIndex: "subjectName",
    key: "name",
    ellipsis: true,
    width: "200px",
  },
  {
    title: "Description",
    dataIndex: "subjectDescription",
    key: "description",
    ellipsis: true,
    width: "200px",
  }, 
  {
    title: "Status",
    dataIndex: "subjectStatus",
    key: "status",
    ellipsis: true,
    width: "120px",
  },
  {
    title: "Note",
    dataIndex: "note",
    key: "note",
    ellipsis: true,
    width: "200px",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    width: "150px",
  }
]

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
