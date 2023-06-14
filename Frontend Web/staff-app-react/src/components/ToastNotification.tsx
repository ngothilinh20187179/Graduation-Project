import { notification } from "antd";
import { DURATION_TOAST } from "constants/constants";

interface NotificationProps {
  type: "success" | "info" | "warning" | "error";
  message: string;
  placement?:
    | "top"
    | "bottom"
    | "topLeft"
    | "topRight"
    | "bottomLeft"
    | "bottomRight";
}

export const ToastNotification = ({
  type,
  message,
  placement = "top",
}: NotificationProps) => {
  return notification[type]({
    message,
    placement,
    duration: DURATION_TOAST,
  });
};
