import "./SideBar.scss";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  /* addNotification, */
  isDarkThemeSelector,
  toggleTheme,
} from "../../core/slices/appSlice";
import { useDispatch } from "../../core";
import { routes as appRoutes, IAppRoute } from "../../routes";
import { SunIcon, MoonIcon } from "../icons";
import { useTheme } from "../../ThemeProvider";

export const SideBar: React.FC = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(isDarkThemeSelector);
  const location = useLocation();
  const theme = useTheme();

  function selectRoutes(routes: IAppRoute[]) {
    const selected: {
      path: string;
      label: string;
      icon: JSX.Element | null;
    }[] = [];

    routes.forEach((route) => {
      if (Object.prototype.hasOwnProperty.call(route, "children")) {
        route.children && selected.push(...selectRoutes(route.children));
      } else {
        route.label &&
          selected.push({
            path: route.path,
            label: route.label ? route.label : "",
            icon: route.icon ? route.icon : null,
          });
      }
    });

    return selected;
  }

  return (
    <div className="sidebar">
      <input type="checkbox" id="sidebarCheckbox" />
      <header>
        <div className="content">
          <h1>MarkVovka</h1>
          <label htmlFor="sidebarCheckbox">
            <span></span>
          </label>
        </div>
      </header>
      <hr />
      <div className="content">
        {selectRoutes(appRoutes).map((route, id) => (
          <Link
            key={id}
            className={`button ${
              location.pathname === route.path ? "active" : ""
            }`}
            to={route.path}
          >
            <p>{route.label}</p>
            <div className="icon">
              {route.icon &&
                React.cloneElement(route.icon, { fill: theme?.textColor })}
            </div>
          </Link>
        ))}
        <button className="button" onClick={() => dispatch(toggleTheme())}>
          <p>Сменить тему</p>
          <div className="icon">
            {!isDarkMode ? (
              <SunIcon fill={theme?.textColor} />
            ) : (
              <MoonIcon fill={theme?.textColor} />
            )}
          </div>
        </button>
        {/*  <button
          className="button"
          onClick={() => dispatch(addNotification({ message: "success" }))}
        >
          success
        </button>
        <button
          className="button"
          onClick={() =>
            dispatch(addNotification({ message: "error", isError: true }))
          }
        >
          error
        </button> */}
        <div className="highlight"></div>
      </div>
    </div>
  );
};
