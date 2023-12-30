
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

export enum SubjectStatusType {
  Close,
  Open,
}

export const COLUMNS_TABLE_CLASSES = () => [
  {
    title: "",
    dataIndex: "index",
    key: "index",
    ellipsis: true,
    width: "50px",
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
    title: "Status",
    dataIndex: "classStatus",
    key: "classStatus",
    width: "110px",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    width: "120px",
  }
]