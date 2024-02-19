import axios from "axios";
import { getToken, removeToken } from "@/utils";
import router from "@/router";
import { message } from "antd";

const request = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 请求头注入token
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    const {
      data: { code, msg },
    } = response;
    if (code !== 200) {
      message.error(msg);
      // 产生错误
      return Promise.reject(new Error(msg));
    }
    return response.data;
  },
  (error) => {
    // 处理token失效
    if (error.response.status === 401) {
      removeToken();
      router.navigate("/login");
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export { request };
