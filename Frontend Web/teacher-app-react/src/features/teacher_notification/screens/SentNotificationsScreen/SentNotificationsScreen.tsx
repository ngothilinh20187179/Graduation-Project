import { Breadcrumb } from "antd";
import { TopPaths } from "features/teacher_top/teacher_top";
import { HomeOutlined } from "@ant-design/icons";
import { memo, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Divider,
  List,
  Modal,
  Skeleton,
  Tooltip,
  Typography,
  Image,
  Avatar,
  Spin,
} from "antd";
import styles from "./SentNotificationsScreen.module.scss";
import cx from "classnames";
import {
  DeleteOutlined,
  StarOutlined,
  StarFilled,
  EyeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Space } from "antd";
import { useAppDispatch, useAppSelector } from "redux/store";
import { RequestParams } from "types/param.types";
import { getTimeUTC } from "helpers/utils.helper";
import { unwrapResult } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { RootState } from "redux/root-reducer";
import {
  NotificationPaths,
  deleteNotification,
  getSentNotificationDetail,
  getSentNotifications,
  markUnMarkNotification,
} from "features/teacher_notification/teacher_notification";
import { SentNotification } from "features/teacher_notification/types/notification.types";

const SentNotificationsScreen = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [loadingDetailNoti, setLoadingDetailNoti] = useState(false);
  const [data, setData] = useState<SentNotification[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notiSelected, setNotiSelected] = useState<number | null>(null);
  const {
    notification: { sentNotificationDetail },
  } = useAppSelector((state: RootState) => state);

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    const params: RequestParams = {
      page,
      pageSize,
    };
    setLoading(true);
    dispatch(getSentNotifications(params))
      .unwrap()
      .then((body) => {
        var newdata = body.data.data;
        if (newdata.length === 0) {
          setHasMore(false);
        } else {
          setData([...data, ...newdata]);
        }
        setLoading(false);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadMoreData();
  }, [page]);

  const handleDeleteNoti = () => {
    if (!notiSelected) return;
    setIsSubmitting(true);
    setLoading(true);
    dispatch(deleteNotification(notiSelected))
      .then(unwrapResult)
      .finally(() => {
        setIsSubmitting(false);
        setLoading(false);
        setNotiSelected(null);
        setIsModalOpen(false);
        window.location.reload();
      });
  };

  const handleGetDetailNoti = (id: number) => {
    setLoadingDetailNoti(true);
    dispatch(getSentNotificationDetail(Number(id)))
      .unwrap()
      .finally(() => setLoadingDetailNoti(false));
  };

  const handleMarkSentNotification = (id: number) => {
    dispatch(markUnMarkNotification(id))
      .then(unwrapResult)
      .finally(() => {
        window.location.reload();
      });
  };

  return (
    <div className="pl-55 pt-30">
      <Breadcrumb className="pb-30 font-18">
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
        <Breadcrumb.Item>Sent</Breadcrumb.Item>
      </Breadcrumb>
      <div>
        <Space align="start" size={[80, 20]} wrap>
          <div
            id="scrollableDiv"
            style={{
              height: 400,
              width: 550,
              minWidth: 350,
              borderRadius: 10,
              overflow: "auto",
              padding: "0 16px",
              border: "1px solid rgba(140, 140, 140, 0.35)",
            }}
          >
            <InfiniteScroll
              dataLength={data.length}
              next={() => setPage(page + 1)}
              hasMore={hasMore}
              loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
              endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
              scrollableTarget="scrollableDiv"
            >
              <List
                dataSource={data}
                renderItem={(item) => {
                  const date = getTimeUTC(item.createOn);
                  return (
                    <List.Item key={item.id}>
                      {item.isMarkedSenderNoti ? (
                        <StarFilled
                          className={cx(styles.starred, "pr-10 mr-15 font-18")}
                          onClick={() => {
                            handleMarkSentNotification(item.id);
                          }}
                        />
                      ) : (
                        <StarOutlined
                          className={cx(styles.star, "pr-10 mr-15 font-18")}
                          onClick={() => {
                            handleMarkSentNotification(item.id);
                          }}
                        />
                      )}
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
                              onClick={() => handleGetDetailNoti(item.id)}
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
                                setIsModalOpen(true);
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
          {loadingDetailNoti ? (
            <Spin size="small" />
          ) : sentNotificationDetail ? (
            <div>
              <Card
                title={sentNotificationDetail?.title}
                style={{
                  border: "1px solid rgba(140, 140, 140, 0.35)",
                  width: 380,
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
                    {sentNotificationDetail?.isMarkedSenderNoti ? (
                      <StarFilled
                        className={cx(styles.starred, "pr-10 ml-5 font-18")}
                        onClick={() => {
                          handleMarkSentNotification(
                            sentNotificationDetail.id
                          );
                        }}
                      />
                    ) : (
                      <StarOutlined
                        className={cx(styles.star, "pr-10 ml-5 font-18")}
                        onClick={() => {
                          handleMarkSentNotification(
                            Number(sentNotificationDetail?.id)
                          );
                        }}
                      />
                    )}
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
          ) : (
            ""
          )}
          <Modal
            centered
            title="Are you sure?"
            open={isModalOpen}
            okText="Delete"
            okType="danger"
            onCancel={() => {
              setNotiSelected(null);
              setIsModalOpen(false);
            }}
            onOk={handleDeleteNoti}
            okButtonProps={{
              disabled: isSubmitting,
            }}
          >
            <Typography>
              Do you really want to delete this notification? This process
              cannot be undone
            </Typography>
          </Modal>
        </Space>
      </div>
    </div>
  );
};

export default memo(SentNotificationsScreen);
