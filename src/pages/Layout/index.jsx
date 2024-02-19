import { Layout, Menu, Popconfirm } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { HomeOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import "./index.scss";
import { logout } from "@/apis/login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserInfo, clearUserInfo } from "@/store/modules/user";

const { Header, Sider } = Layout;

const items = [
  {
    label: "首页",
    key: "/",
    icon: <HomeOutlined />,
  },
  {
    label: "用户管理",
    key: "/user",
    icon: <UserOutlined />,
  },
];

const MyLayout = () => {
  const navigate = useNavigate();

  const onMenuClick = (route) => {
    const path = route.key;
    navigate(path);
  };

  // 菜单反向高亮
  const location = useLocation();
  const selectedKey = location.pathname;

  // 触发获取用户信息action
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  const nickName = useSelector((state) => state.user.userInfo.nickName);

  // 退出登录确认回调
  const onConfirm = async () => {
    try {
      await logout();
      dispatch(clearUserInfo());
      navigate("/login");
    } catch (error) {}
  };
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{nickName || "-"}</span>
          <span className="user-logout">
            <Popconfirm
              title="是否确认退出？"
              okText="退出"
              cancelText="取消"
              onConfirm={onConfirm}
            >
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} theme="light" className="site-layout-background">
          <Menu
            mode="inline"
            selectedKeys={selectedKey}
            items={items}
            onClick={onMenuClick}
          />
        </Sider>
        <Layout className="layout-content">
          {/* 二级路由出口 */}
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MyLayout;
