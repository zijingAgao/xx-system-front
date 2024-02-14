import Layout from "../pages/Layout";
import Login from "../pages/Login";

import { createBrowserRouter } from "react-router-dom";
import { AuthRoute } from '@/components/AuthRoute'
import Home from "@/pages/Home";
import UserManage from "@/pages/UserManage";

// 配置路由实例
const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthRoute><Layout /></AuthRoute>,
        children: [
            {
                path: 'home',
                element: <Home />
            },
            {
                path: 'user',
                element: <UserManage />
            },
        ]
    },
    {
        path: "/login",
        element: <Login />
    },
])

export default router	