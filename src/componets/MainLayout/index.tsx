import React from "react";
import { SideBar } from "../SideBar";
import { NotificationBar } from "../NotificationBar";
import "./MainLayout.scss";
import { Outlet } from "react-router-dom";

export const MainLayout: React.FC = () => {
  return (
    <div className="mainlayout">
      <SideBar />
      <Outlet />
      <NotificationBar />
    </div>
  );
};
