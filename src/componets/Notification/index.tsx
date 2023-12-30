import React, { useEffect } from "react";
import "./Notification.scss";
import { INotification, deleteNotification } from "../../core/slices/appSlice";
import { useDispatch } from "../../core";

interface NotificationBarProps {
  notifyInfo: INotification;
}

export const Notification: React.FC<NotificationBarProps> = ({
  notifyInfo,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(deleteNotification(notifyInfo.id));
    }, 4000);
    return () => clearTimeout(timeout);
  }, [dispatch, notifyInfo]);

  return <div className={notifyInfo.isError ? "notification error" : "notification success"}>{notifyInfo.message}</div>;
};
