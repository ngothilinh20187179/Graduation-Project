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
    width: "40px",
  },
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    width: "50px",
  },
  {
    title: "Spend On",
    dataIndex: "spendOn",
    key: "spendOn",
    ellipsis: true,
    width: "170px",
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
    width: "240px",
  },
  {
    title: "Author",
    dataIndex: "author",
    key: "author",
    ellipsis: true,
    width: "130px",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    ellipsis: true,
    width: "100px",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    width: "110px",
  },
];
