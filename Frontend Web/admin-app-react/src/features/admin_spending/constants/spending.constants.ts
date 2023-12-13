export enum SpendingStatusType {
  Pending,
  Approval,
  Reject,
}

export const COLUMNS_TABLE_SPENDINGS = () => [
  {
    title: "",
    dataIndex: "index",
    key: "index",
    width: "50px",
  },
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    width: "60px",
  },
  {
    title: "Spend On",
    dataIndex: "spendOn",
    key: "spendOn",
    ellipsis: true,
    width: "180px",
  },
  {
    title: "Budget",
    dataIndex: "budget",
    key: "budget",
    ellipsis: true,
    width: "120px",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    ellipsis: true,
    width: "300px",
  },
  {
    title: "Author",
    dataIndex: "author",
    key: "author",
    ellipsis: true,
    width: "120px",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    ellipsis: true,
    width: "100px",
    // filters: [
    //   { text: 'Pending', value: SpendingStatusType.Pending },
    //   { text: 'Approval', value: SpendingStatusType.Approval },
    //   { text: 'Reject', value: SpendingStatusType.Reject },
    // ],
    // filterMultiple: false,
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    width: "180px",
  },
];
