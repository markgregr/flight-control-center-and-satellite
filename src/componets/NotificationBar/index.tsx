import React from "react";
import "./Notifications.scss";
import { useSelector } from "../../core";
import { notificationsSelector } from "../../core/slices/appSlice";
import { Notification } from "../Notification";

export const NotificationBar: React.FC = () => {
  const notifications = useSelector(notificationsSelector);

  return (
    <div className="notifications">
      {notifications
        .map((notification) => (
          <Notification key={notification.id} notifyInfo={notification} />
        ))
        .reverse()}
    </div>
  );
};
