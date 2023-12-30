import { RouteObject } from "react-router-dom";
import { MainLayout } from "./componets";
import { AuthPage, ErrorPage, MainPage, OtherPage } from "./pages";
import { LogoIcon } from "./componets/icons";
import { HomeIcon } from "./componets/icons/HomeIcon";

export interface IAppRoute {
  label?: string;
  path: string;
  index?: boolean;
  icon?: JSX.Element;
  element: JSX.Element;
  children?: IAppRoute[];
}

export const routes: IAppRoute[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        label: "Главная",
        path: "/",
        index: true,
        element: <MainPage />,
        icon: <HomeIcon />,
      },
      {
        label: "Прочее",
        path: "/other",
        element: <OtherPage />,
        icon: <LogoIcon />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
];

export const realRoutes: RouteObject[] = convertRoutes(routes);

function convertRoutes(routes: IAppRoute[]): RouteObject[] {
  return routes.map((route) => {
    const convertedRoute: RouteObject = {
      path: route.path,
      element: route.element,
    };
    if (route.children) {
      convertedRoute.children = convertRoutes(route.children);
    }
    return convertedRoute;
  });
}
