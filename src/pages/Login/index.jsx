import { Card, Form, Input, Button, message, Tabs } from "antd";
import { useDispatch } from "react-redux";
import { fetchLogin } from "@/store/modules/user";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import countdown from "@/utils/countdown";
import "./index.scss";

const Login = () => {
  const [count, setCount] = useState(-1);
  const [type, setType] = useState("account");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // 登录
  const onFinish = async (values) => {
    try {
      await dispatch(fetchLogin(values));
      // 跳转到首页
      navigate("/");
      message.success("登录成功");
    } catch (err) {
      console.log(err);
    }
  };
  // 获取验证码
  const onGetCaptcha = async () => {
    const [exec, clear] = countdown((count, clear) => {
      setCount(count);
    });
    exec();
    // TODO: 在这里执行发送验证码的程序
  };

  return (
    <div className="login">
      <div className="login-container">
        <div className="title">xx-system 管理平台</div>
        <Card className="login-form">
          {/* 登录表单 */}
          <Form onFinish={onFinish} validateTrigger="onBlur">
            <Tabs
              defaultActiveKey="account"
              onChange={setType}
              centered
              items={[
                {
                  key: "account",
                  label: "账户密码登录",
                },
                {
                  key: "mobile",
                  label: "手机号登录",
                },
              ]}
            />

            {type === "account" && (
              <>
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "请输入账号",
                    },
                  ]}
                >
                  <Input size="large" placeholder="请输入账号" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "请输入密码",
                    },
                  ]}
                >
                  <Input.Password size="large" placeholder="请输入密码" />
                </Form.Item>
              </>
            )}

            {type === "mobile" && (
              <>
                <Form.Item
                  name="mobile"
                  rules={[
                    {
                      required: true,
                      message: "请输入手机号",
                    },
                    {
                      pattern: /^1[3-9]\d{9}$/,
                      message: "请输入正确的手机号",
                    },
                  ]}
                >
                  <Input size="large" placeholder="请输入手机号" />
                </Form.Item>
                <Form.Item
                  name="code"
                  rules={[
                    {
                      required: true,
                      message: "请输入验证码",
                    },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="请输入验证码"
                    suffix={
                      count < 0 ? (
                        <span
                          style={{ fontSize: "14px", cursor: "pointer" }}
                          onClick={onGetCaptcha}
                        >
                          获取验证码
                        </span>
                      ) : (
                        <span
                          style={{ fontSize: "14px", cursor: "not-allowed" }}
                        >
                          {count}s后重发
                        </span>
                      )
                    }
                  />
                </Form.Item>
              </>
            )}

            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" block>
                登录
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
