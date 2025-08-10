/* eslint-disable react-refresh/only-export-components */
// import { lazy } from "react";
// const CommonLayout = lazy(() => import("@/layout/CommonLayout"));
// const AdminLayout = lazy(() => import("@/layout/AdminLayout"));
// const AboutUs = lazy(() => import("@/pages/AboutUs/AboutUs"));

import AdminLayout from "@/layout/AdminLayout";
import CommonLayout from "@/layout/CommonLayout";
import AboutUs from "@/pages/AboutUs/AboutUs";

const routes = [
  {
    path: "/",
    element: <CommonLayout />,
    children: [
      { path: "about", element: <AboutUs /> },
    ],
  },
  {
    path: "/admins",
    element: <AdminLayout />,
    children: [
      { path: "about", element: <AboutUs /> },
    ],
  },
];

export default routes;