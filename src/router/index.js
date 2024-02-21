import Layout from "../pages/Layout";
import Login from "../pages/Login";

import { createBrowserRouter } from "react-router-dom";
import { AuthRoute } from "@/components/AuthRoute";
import { Suspense, lazy } from "react";

// 1.lazy函数对组件进行导入
const Home = lazy(() => import("@/pages/Home"));
const UserManage = lazy(() => import("@/pages/UserManage"));

// 配置路由实例
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthRoute>
        <Layout />
      </AuthRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={"加载中"}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "user",
        element: (
          <Suspense fallback={"加载中"}>
            <UserManage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
