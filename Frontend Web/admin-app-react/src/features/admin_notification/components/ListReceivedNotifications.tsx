import { memo, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Divider, List, Modal, Skeleton, Tooltip, Typography } from "antd";
import styles from "./ListReceivedNotifications.module.scss";
import cx from "classnames";
import {
  DeleteOutlined,
  StarOutlined,
  StarFilled,
  CheckCircleTwoTone,
  EyeOutlined,
} from "@ant-design/icons";
import { Card, Space } from "antd";
import { useAppDispatch } from "redux/store";
import { RequestParams } from "types/param.types";
import {
  deleteNotification,
  getReceivedNotifications,
} from "../admin_notification";
import { ReceivedNotification } from "../types/notification.types";
import { getTimeUTC } from "helpers/utils.helper";
import { unwrapResult } from "@reduxjs/toolkit";

const ListReceivedNotifications = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ReceivedNotification[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [triggerReload, setTriggerReload] = useState<boolean>(false);
  const [notiSelected, setNotiSelected] = useState<number | null>(null);

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
      .then()
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
      .then(() => {
        setTriggerReload(!triggerReload);
      })
      .finally(() => {
        setIsSubmitting(false);
        setLoading(false);
        setNotiSelected(null);
        setIsModalOpen(false);
        window.location.reload();
      });
  };

  const handleGetDetailNoti = (id: number) => {
    setNotiSelected(id);
    //dispatch(getReceivedNotificationDetail(Number(id)));
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
                <List.Item key={item.id} onClick={() => console.log("test")}>
                  {item.isMarkedReceiverNoti ? (
                    <StarFilled
                      className={cx(styles.starred, "pr-10 mr-15 font-18")}
                    />
                  ) : (
                    <StarOutlined
                      className={cx(styles.star, "pr-10 mr-15 font-18")}
                    />
                  )}
                  <List.Item.Meta
                    title={item.title}
                    description={item.content}
                  />
                  <div className="flex-center gap-20">
                    <div className="font-15">
                      {item?.status == 1 ? (
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
      <Card
        title="Detail Notification"
        extra={<a href="#">More</a>}
        style={{ border: "1px solid rgba(140, 140, 140, 0.35)", width: 380 }}
      ></Card>
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
