export enum SubjectStatusType {
  Close,
  Open,
}

export enum RoomStatusType {
  CanNotUse, 
  CanUse
}

export enum ClassStatusType {
  NotStart, 
  InProgress, 
  Stop, 
  End
}

export enum ClassPeriodType {
  Period1 = 1, // 8h-10h
  Period2,     // 10h-12h
  Period3,     // 12h-14h
  Period4,     // 14h-16h
  Period5,     // 16h-18h
  Period6,     // 18h-20h
  Period7,     // 20h-22h
}

export enum DayOfWeek {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday
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

export const COLUMNS_TABLE_ROOMS = () => [
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
    dataIndex: "name",
    key: "name",
    ellipsis: true,
    width: "170px",
  },
  {
    title: "Size",
    dataIndex: "size",
    key: "size",
    ellipsis: true,
    width: "100px",
  }, 
  {
    title: "Status",
    dataIndex: "roomStatus",
    key: "status",
    ellipsis: true,
    width: "120px",
  },
  {
    title: "Note",
    dataIndex: "note",
    key: "note",
    ellipsis: true,
    width: "250px",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    width: "150px",
  }
]

export const COLUMNS_TABLE_CLASSES = () => [
  {
    title: "",
    dataIndex: "index",
    key: "index",
    ellipsis: true,
    width: "50px",
  },
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    ellipsis: true,
    width: "60px",
  }, 
  {
    title: "Class Name",
    dataIndex: "className",
    key: "className",
    ellipsis: true,
    width: "200px",
  },
  {
    title: "Start",
    dataIndex: "classStartDate",
    key: "classStartDate",
    ellipsis: true,
    width: "100px",
  }, 
  {
    title: "End",
    dataIndex: "classEndDate",
    key: "classEndDate",
    ellipsis: true,
    width: "100px",
  },
  {
    title: "Students (Max)",
    dataIndex: "numberOfStudents",
    key: "numberOfStudents",
    ellipsis: true,
    width: "120px",
  },
  {
    title: "Sessions",
    dataIndex: "numberOfSessions",
    key: "numberOfSessions",
    ellipsis: true,
    width: "80px",
  },
  {
    title: "Credit",
    dataIndex: "credit",
    key: "credit",
    ellipsis: true,
    width: "120px",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    width: "120px",
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
