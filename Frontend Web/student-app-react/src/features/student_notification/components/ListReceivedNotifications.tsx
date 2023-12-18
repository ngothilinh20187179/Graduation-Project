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
import styles from "./ListReceivedNotifications.module.scss";
import cx from "classnames";
import {
  DeleteOutlined,
  StarOutlined,
  StarFilled,
  CheckCircleTwoTone,
  EyeOutlined,
  CheckOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Space } from "antd";
import { useAppDispatch, useAppSelector } from "redux/store";
import { RequestParams } from "types/param.types";
import {
  ReadStatusType,
  confirmReadNotification,
  deleteNotification,
  getReceivedNotificationDetail,
  getReceivedNotifications,
  markUnMarkNotification,
} from "../student_notification";
import { ReceivedNotification } from "../types/notification.types";
import { getTimeUTC } from "helpers/utils.helper";
import { unwrapResult } from "@reduxjs/toolkit";
import { RootState } from "redux/root-reducer";

const ListReceivedNotifications = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [loadingDetailNoti, setLoadingDetailNoti] = useState(false);
  const [data, setData] = useState<ReceivedNotification[]>([]);
  const [page, setPage] = useState<number>(1);
  const pageSize = 20;
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notiSelected, setNotiSelected] = useState<number | null>(null);

  const {
    notification: { receivedNotificationDetail },
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
    dispatch(getReceivedNotifications(params))
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
    dispatch(getReceivedNotificationDetail(Number(id)))
      .unwrap()
      .finally(() => setLoadingDetailNoti(false));
  };

  const handleMarkReceivedNotification = (id: number) => {
    dispatch(markUnMarkNotification(id))
      .then(unwrapResult)
      .finally(() => {
        window.location.reload();
      });
  };

  const handleConfirmReadNoti = (id: number) => {
    dispatch(confirmReadNotification(id))
      .then(unwrapResult)
      .finally(() => {
        window.location.reload();
      });
  }

  return (
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
                  {item.isMarkedReceiverNoti ? (
                    <StarFilled
                      className={cx(styles.starred, "pr-10 mr-15 font-18")}
                      onClick={() => {
                        handleMarkReceivedNotification(item.id);
                      }}
                    />
                  ) : (
                    <StarOutlined
                      className={cx(styles.star, "pr-10 mr-15 font-18")}
                      onClick={() => {
                        handleMarkReceivedNotification(item.id);
                      }}
                    />
                  )}
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
      ) : receivedNotificationDetail ? (
        <div>
          <Card
            title={receivedNotificationDetail?.title}
            style={{
              border: "1px solid rgba(140, 140, 140, 0.35)",
              width: 380,
            }}
            extra={<div>
              {receivedNotificationDetail?.status === ReadStatusType.UnRead && (
              <Tooltip title="Read confirmation">
                <CheckOutlined className={cx(styles.readConfirmationIcon, "font-18 mr-5")}
                onClick={() => handleConfirmReadNoti(Number(receivedNotificationDetail.id))}
                />
              </Tooltip>
            )}
            </div>}
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
                {receivedNotificationDetail?.isMarkedReceiverNoti ? (
                  <StarFilled
                    className={cx(styles.starred, "pr-10 ml-5 font-18")}
                    onClick={() => {
                      handleMarkReceivedNotification(
                        receivedNotificationDetail.id
                      );
                    }}
                  />
                ) : (
                  <StarOutlined
                    className={cx(styles.star, "pr-10 ml-5 font-18")}
                    onClick={() => {
                      handleMarkReceivedNotification(
                        Number(receivedNotificationDetail?.id)
                      );
                    }}
                  />
                )}
              </div>
            </div>
            <Typography style={{fontWeight: "bold"}}>
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
      ) : ""}
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
          Do you really want to delete this notification? This process cannot be
          undone
        </Typography>
      </Modal>
    </Space>
  );
};

export default memo(ListReceivedNotifications);
