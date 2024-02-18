import { useEffect, useState } from "react";
import {
  Drawer,
  Space,
  Button,
  Input,
  Form,
  Select,
  Switch,
  message,
} from "antd";
import { addUser, getUserDetail, updateUser } from "@/apis/user";

const AddUser = ({ open, hideDrawer, getList, id }) => {
  const [form] = Form.useForm();
  const [autoPwd, setAutoPwd] = useState(false);
  const onChange = (checked) => {
    setAutoPwd(checked);
  };
  const onFinish = async (formValue) => {
    // 1.请求接口
    if (id.current) {
      // 编辑
      await updateUser({ ...formValue, id: id.current });
      message.success("编辑用户成功");
    } else {
      await addUser(formValue);
      message.success("添加用户成功");
    }
    // 3.刷新列表
    getList();
    // 4.关闭表单
    onClose();
  };
  const onClose = () => {
    // 重置表单数据
    form.resetFields();
    id.current = undefined;
    // 关闭表单
    hideDrawer();
  };
  // 回填数据
  useEffect(() => {
    // 1.通过id获取数据
    async function getDetail() {
      const res = await getUserDetail(id.current);
      form.setFieldsValue(res.data);
    }
    if (id.current) {
      getDetail();
    }
    // 2.调用实例方法 完成回填
  }, [id.current, form]);
  return (
    <Drawer
      title={id.current ? "编辑用户" : "添加用户"}
      onClose={onClose}
      open={open}
      width={500}
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          label="邮箱"
          name="username"
          rules={[
            {
              required: true,
              message: "请填写邮箱！",
            },
            {
              pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
              message: "请填写正确的邮箱！",
            },
          ]}
        >
          <Input placeholder="请填写邮箱" />
        </Form.Item>
        <Form.Item label="用户名（选填）" name="nickName">
          <Input placeholder="请填写用户名" />
        </Form.Item>
        <Form.Item
          label="手机号"
          name="mobile"
          rules={[
            {
              required: true,
              message: "请填写手机号！",
            },
            {
              pattern: /^1[3-9]\d{9}$/,
              message: "请填写正确的手机号！",
            },
          ]}
        >
          <Input placeholder="请填写手机号" />
        </Form.Item>
        <Form.Item
          label="角色"
          name="roles"
          rules={[
            {
              required: true,
              message: "请选择角色！",
            },
          ]}
        >
          <Select
            placeholder="请选择角色"
            mode="multiple"
            options={[
              {
                value: "ADMIN",
                label: "系统管理员",
              },
              {
                value: "AUDIT_ADMIN",
                label: "审计管理员",
              },
            ]}
          />
        </Form.Item>
        {/* 密码 */}
        <Form.Item label="自动生成密码" name="autoPwd" initialValue={autoPwd}>
          <Switch onChange={onChange} />
        </Form.Item>
        {autoPwd === false && (
          <Form.Item
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: "请填写密码！",
              },
            ]}
          >
            <Input placeholder="请填写密码" />
          </Form.Item>
        )}
        <Form.Item label="是否启用" name="enabled" initialValue={false}>
          <Switch />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button onClick={onClose}>取消</Button>
            <Button type="primary" htmlType="submit">
              确认
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default AddUser;
