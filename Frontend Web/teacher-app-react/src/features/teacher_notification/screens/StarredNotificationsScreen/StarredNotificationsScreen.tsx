import { memo, useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Divider,
  List,
  Modal,
  Skeleton,
  Space,
  Spin,
  Tooltip,
  Typography,
  Image,
  Avatar,
} from "antd";
import { useNavigate } from "react-router-dom";
import {
  NotificationPaths,
  deleteNotification,
  getReceivedNotificationDetail,
  getReceivedNotifications,
  getSentNotificationDetail,
  getSentNotifications,
  markUnMarkNotification,
} from "features/teacher_notification/teacher_notification";
import { TopPaths } from "features/teacher_top/teacher_top";
import {
  HomeOutlined,
  StarFilled,
  EyeOutlined,
  DeleteOutlined,
  CheckCircleTwoTone,
  UserOutlined,
} from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "./StarredNotificationsScreen.module.scss";
import cx from "classnames";
import { getTimeUTC } from "helpers/utils.helper";
import { useAppDispatch, useAppSelector } from "redux/store";
import {
  ReceivedNotification,
  SentNotification,
} from "features/teacher_notification/types/notification.types";
import { RequestParams } from "types/param.types";
import { unwrapResult } from "@reduxjs/toolkit";
import Title from "antd/es/typography/Title";
import { RootState } from "redux/root-reducer";

const StarredNotificationsScreen = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [dataStarredSentNoti, setDataStarredSentNoti] = useState<
    SentNotification[]
  >([]);
  const [loadingStarredSentNoti, setLoadingStarredSentNoti] = useState(false);
  const [pageStarredSentNoti, setPageStarredSentNoti] = useState<number>(1);
  const [isMarkedStarredSentNoti, setIsMarkedStarredSentNoti] = useState(true);
  const [pageSizeStarredSentNoti, setPageSizeStarredSentNoti] =
    useState<number>(20);
  const [hasMoreStarredSentNoti, setHasMoreStarredSentNoti] =
    useState<boolean>(true);

  const [dataStarredReceivedNoti, setDataStarredReceivedNoti] = useState<
    ReceivedNotification[]
  >([]);
  const [loadingStarredReceivedNoti, setLoadingStarredReceivedNoti] =
    useState(false);
  const [pageStarredReceivedNoti, setPageStarredReceivedNoti] =
    useState<number>(1);
  const [isMarkedStarredReceivedNoti, setIsMarkedStarredReceivedNoti] =
    useState(true);
  const [pageSizeStarredReceivedNoti, setPageSizeStarredReceivedNoti] =
    useState<number>(20);
  const [hasMoreStarredReceivedNoti, setHasMoreStarredReceivedNoti] =
    useState<boolean>(true);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notiSelected, setNotiSelected] = useState<number | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [loadingDetailNoti, setLoadingDetailNoti] = useState(false);
  const [isSentModalDetail, setIsSentModalDetail] = useState<boolean>(false);
  const [isReceivedModalDetail, setIsReceivedModalDetail] =
    useState<boolean>(false);

  const {
    notification: { sentNotificationDetail, receivedNotificationDetail },
  } = useAppSelector((state: RootState) => state);

  const loadMoreDataStarredSentNotiTable = () => {
    if (loadingStarredSentNoti) {
      return;
    }
    const params: RequestParams = {
      page: pageStarredSentNoti,
      pageSize: pageSizeStarredSentNoti,
      isMarked: isMarkedStarredSentNoti,
    };
    setLoadingStarredSentNoti(true);
    dispatch(getSentNotifications(params))
      .unwrap()
      .then((body) => {
        var newdata = body.data.data;
        if (newdata.length === 0) {
          setHasMoreStarredSentNoti(false);
        } else {
          setDataStarredSentNoti([...dataStarredSentNoti, ...newdata]);
        }
        setLoadingStarredSentNoti(false);
      })
      .finally(() => setLoadingStarredSentNoti(false));
  };

  useEffect(() => {
    loadMoreDataStarredSentNotiTable();
  }, [pageStarredSentNoti]);

  const loadMoreDataStarredReceivedNotiTable = () => {
    if (loadingStarredReceivedNoti) {
      return;
    }
    const params: RequestParams = {
      page: pageStarredReceivedNoti,
      pageSize: pageSizeStarredReceivedNoti,
      isMarked: isMarkedStarredReceivedNoti,
    };
    setLoadingStarredReceivedNoti(true);
    dispatch(getReceivedNotifications(params))
      .unwrap()
      .then((body) => {
        var newdata = body.data.data;
        if (newdata.length === 0) {
          setHasMoreStarredReceivedNoti(false);
        } else {
          setDataStarredReceivedNoti([...dataStarredReceivedNoti, ...newdata]);
        }
        setLoadingStarredReceivedNoti(false);
      })
      .finally(() => setLoadingStarredReceivedNoti(false));
  };

  useEffect(() => {
    loadMoreDataStarredReceivedNotiTable();
  }, [pageStarredReceivedNoti]);

  const handleDeleteNoti = () => {
    if (!notiSelected) return;
    setIsSubmitting(true);
    setLoadingStarredSentNoti(true);
    dispatch(deleteNotification(notiSelected))
      .then(unwrapResult)
      .finally(() => {
        setIsSubmitting(false);
        setLoadingStarredSentNoti(false);
        setNotiSelected(null);
        setIsDeleteModalOpen(false);
        window.location.reload();
      });
  };

  const handleUnMarkNotification = (id: number) => {
    dispatch(markUnMarkNotification(id))
      .then(unwrapResult)
      .finally(() => {
        window.location.reload();
      });
  };

  const handleGetSentDetailNoti = (id: number) => {
    setLoadingDetailNoti(true);
    dispatch(getSentNotificationDetail(Number(id)))
      .unwrap()
      .then(() => setIsSentModalDetail(true))
      .finally(() => {
        setLoadingDetailNoti(false);
      });
  };

  const handleGetReceivedNoti = (id: number) => {
    setLoadingDetailNoti(true);
    dispatch(getReceivedNotificationDetail(Number(id)))
      .unwrap()
      .then(() => setIsReceivedModalDetail(true))
      .finally(() => {
        setLoadingDetailNoti(false);
      });
  };

  return (
    <div className="pl-55 pt-30">
      <Breadcrumb className="font-18">
        <Breadcrumb.Item
          className="cursor-pointer"
          onClick={() => navigate(TopPaths.TOP())}
        >
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item
          className="cursor-pointer"
          onClick={() => navigate(NotificationPaths.NOTIFICATION())}
        >
          Notifications
        </Breadcrumb.Item>
        <Breadcrumb.Item>Starred</Breadcrumb.Item>
      </Breadcrumb>
      <div className="flex flex-wrap gap-50">
        <div className="mr-30">
          <Title className="ml-7" level={5}>
            Sent
          </Title>
          <Space align="start" size={[80, 20]} wrap>
            <div
              id="scrollableDiv"
              style={{
                height: 400,
                width: 480,
                minWidth: 300,
                borderRadius: 10,
                overflow: "auto",
                padding: "0 16px",
                border: "1px solid rgba(140, 140, 140, 0.35)",
              }}
            >
              <InfiniteScroll
                dataLength={dataStarredSentNoti.length}
                next={() => setPageStarredSentNoti(pageStarredSentNoti + 1)}
                hasMore={hasMoreStarredSentNoti}
                loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                scrollableTarget="scrollableDiv"
              >
                <List
                  dataSource={dataStarredSentNoti}
                  renderItem={(item) => {
                    const date = getTimeUTC(item.createOn);
                    return (
                      <List.Item key={item.id}>
                        <StarFilled
                          className={cx(styles.starred, "pr-10 mr-15 font-18")}
                          onClick={() => {
                            handleUnMarkNotification(item.id);
                          }}
                        />
                        <List.Item.Meta
                          title={item.title}
                          description={item.content}
                        />
                        <div className="flex-center gap-20">
                          <div>{date}</div>
                          <div>
                            <Tooltip title="Detail">
                              <EyeOutlined
                                className={cx(
                                  styles.detailMessageIcon,
                                  "font-18 cursor-pointer mr-10"
                                )}
                                onClick={() => {
                                  setIsDetailModalOpen(true);
                                  handleGetSentDetailNoti(item.id);
                                }}
                              />
                            </Tooltip>
                            <Tooltip title="Delete">
                              <DeleteOutlined
                                className={cx(
                                  styles.removeMessageIcon,
                                  "font-18 cursor-pointer"
                                )}
                                onClick={() => {
                                  setNotiSelected(item.id);
                                  setIsDeleteModalOpen(true);
                                }}
                              />
                            </Tooltip>
                          </div>
                        </div>
                      </List.Item>
                    );
                  }}
                />
              </InfiniteScroll>
            </div>
          </Space>
        </div>
        <div>
          <Title className="ml-7" level={5}>
            Received
          </Title>
          <Space align="start" size={[80, 20]} wrap>
            <div
              id="scrollableDiv"
              style={{
                height: 400,
                width: 480,
                minWidth: 300,
                borderRadius: 10,
                overflow: "auto",
                padding: "0 16px",
                border: "1px solid rgba(140, 140, 140, 0.35)",
              }}
            >
              <InfiniteScroll
                dataLength={dataStarredReceivedNoti.length}
                next={() =>
                  setPageStarredReceivedNoti(pageStarredReceivedNoti + 1)
                }
                hasMore={hasMoreStarredReceivedNoti}
                loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                scrollableTarget="scrollableDiv"
              >
                <List
                  dataSource={dataStarredReceivedNoti}
                  renderItem={(item) => {
                    const date = getTimeUTC(item.createOn);
                    return (
                      <List.Item key={item.id}>
                        <StarFilled
                          className={cx(styles.starred, "pr-10 mr-15 font-18")}
                          onClick={() => {
                            handleUnMarkNotification(item.id);
                          }}
                        />
                        <List.Item.Meta
                          title={item.title}
                          description={item.content}
                        />
                        <div className="flex-center gap-20">
                          <div className="font-15">
                            {item?.status === 1 ? (
                              <Tooltip title="Seen">
                                <CheckCircleTwoTone twoToneColor="#52c41a" />
                              </Tooltip>
                            ) : (
                              ""
                            )}
                          </div>
                          <div>{date}</div>
                          <div>
                            <Tooltip title="Detail">
                              <EyeOutlined
                                className={cx(
                                  styles.detailMessageIcon,
                                  "font-18 cursor-pointer mr-10"
                                )}
                                onClick={() => {
                                  setIsDetailModalOpen(true);
                                  handleGetReceivedNoti(item.id);
                                }}
                              />
                            </Tooltip>
                            <Tooltip title="Delete">
                              <DeleteOutlined
                                className={cx(
                                  styles.removeMessageIcon,
                                  "font-18 cursor-pointer"
                                )}
                                onClick={() => {
                                  setNotiSelected(item.id);
                                  setIsDeleteModalOpen(true);
                                }}
                              />
                            </Tooltip>
                          </div>
                        </div>
                      </List.Item>
                    );
                  }}
                />
              </InfiniteScroll>
            </div>
          </Space>
        </div>
      </div>
      <Modal
        centered
        title="Are you sure?"
        open={isDeleteModalOpen}
        okText="Delete"
        okType="danger"
        onCancel={() => {
          setNotiSelected(null);
          setIsDeleteModalOpen(false);
        }}
        onOk={handleDeleteNoti}
        okButtonProps={{
          disabled: isSubmitting,
        }}
      >
        <Typography>
          Do you really want to delete this notification? This process cannot be
          undone
        </Typography>
      </Modal>
      <Modal
        centered
        title="Notification Detail"
        open={isDetailModalOpen}
        onCancel={() => {
          setIsSentModalDetail(false);
          setIsReceivedModalDetail(false);
          setIsDetailModalOpen(false);
        }}
        footer={
          <Button onClick={() => setIsDetailModalOpen(false)}>Cancel</Button>
        }
      >
        <div className="mt-20 mb-20">
          {loadingDetailNoti ? (
            <Spin size="small" />
          ) : isSentModalDetail === true ? (
            <div>
              <Card
                title={sentNotificationDetail?.title}
                style={{
                  border: "1px solid rgba(140, 140, 140, 0.35)",
                  width: 472,
                }}
              >
                <div className="flex-space-between flex-start">
                  <div>
                    {sentNotificationDetail?.receiver?.avatar ? (
                      <Image
                        className="mb-20"
                        style={{ width: 100, height: 100 }}
                        preview={false}
                        src={`data:${sentNotificationDetail.receiver.avatar.mediaType};base64,${sentNotificationDetail.receiver.avatar.data}`}
                      />
                    ) : (
                      <Avatar
                        className="mb-20"
                        size={100}
                        icon={<UserOutlined />}
                      />
                    )}
                  </div>
                  <div className="flex-align-center">
                    <p>{getTimeUTC(sentNotificationDetail?.createOn)}</p>
                  </div>
                </div>
                <Typography style={{ fontWeight: "bold" }}>
                  Receiver : {sentNotificationDetail?.receiver.lastName}{" "}
                  {sentNotificationDetail?.receiver.firstName}
                </Typography>
                <Typography>
                  Id : {sentNotificationDetail?.receiver.id}
                </Typography>
                <Typography>
                  Role :{" "}
                  {sentNotificationDetail?.receiver.role === 1
                    ? "Student"
                    : sentNotificationDetail?.receiver.role === 2
                    ? "Teacher"
                    : sentNotificationDetail?.receiver.role === 3
                    ? "Staff"
                    : sentNotificationDetail?.receiver.role === 4
                    ? "Admin"
                    : ""}
                </Typography>
                <Typography className="mb-20">
                  Content : {sentNotificationDetail?.content}
                </Typography>
              </Card>
            </div>
          ) : isReceivedModalDetail === true ? (
            <div>
              <Card
                title={receivedNotificationDetail?.title}
                style={{
                  border: "1px solid rgba(140, 140, 140, 0.35)",
                  width: 472,
                }}
              >
                <div className="flex-space-between flex-start">
                  <div>
                    {receivedNotificationDetail?.sender?.avatar ? (
                      <Image
                        className="mb-20"
                        style={{ width: 100, height: 100 }}
                        preview={false}
                        src={`data:${receivedNotificationDetail.sender.avatar.mediaType};base64,${receivedNotificationDetail.sender.avatar.data}`}
                      />
                    ) : (
                      <Avatar
                        className="mb-20"
                        size={100}
                        icon={<UserOutlined />}
                      />
                    )}
                  </div>
                  <div className="flex-align-center">
                    <p>{getTimeUTC(receivedNotificationDetail?.createOn)}</p>
                  </div>
                </div>
                <Typography style={{ fontWeight: "bold" }}>
                  Sender : {receivedNotificationDetail?.sender.lastName}{" "}
                  {receivedNotificationDetail?.sender.firstName}
                </Typography>
                <Typography>
                  Id : {receivedNotificationDetail?.sender.id}
                </Typography>
                <Typography>
                  Role :{" "}
                  {receivedNotificationDetail?.sender.role === 1
                    ? "Student"
                    : receivedNotificationDetail?.sender.role === 2
                    ? "Teacher"
                    : receivedNotificationDetail?.sender.role === 3
                    ? "Staff"
                    : receivedNotificationDetail?.sender.role === 4
                    ? "Admin"
                    : ""}
                </Typography>
                <Typography className="mb-20">
                  Content : {receivedNotificationDetail?.content}
                </Typography>
              </Card>
            </div>
          ) : (
            ""
          )}
        </div>
      </Modal>
    </div>
  );
};

export default memo(StarredNotificationsScreen);
