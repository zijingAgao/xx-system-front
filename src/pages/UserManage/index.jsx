import { useEffect, useState, useRef } from "react";
import {
  Input,
  Button,
  Divider,
  Table,
  Switch,
  Space,
  Form,
  Popconfirm,
  message,
  Select,
} from "antd";
import "./index.scss";
import AddUser from "./AddUser";
import { getUserList, delUser, disableUser, enableUser } from "@/apis/user";
import { roleEnum, roleOption } from "@/constant/user.js";

const UserManage = () => {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  // 查询列表参数
  const [reqData, setReqData] = useState({
    page: 0,
    size: 5,
  });
  const userId = useRef(undefined);

  const columns = [
    {
      title: "序号",
      render: (text, record, index) => index + 1,
    },
    {
      title: "昵称",
      dataIndex: "nickName",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "邮箱",
      dataIndex: "username",
    },
    {
      title: "手机号",
      dataIndex: "mobile",
    },
    {
      title: "角色",
      dataIndex: "roles",
      render: (text) => (
        <Space>
          {text.length
            ? text.map((item) => {
                return <span key={item}>{roleEnum[item]}</span>;
              })
            : "-"}
        </Space>
      ),
    },
    {
      title: "是否启用",
      dataIndex: "enabled",
      render: (text, record) => (
        <Popconfirm
          title={text ? "禁用用户" : "启用用户"}
          description={
            text ? "你确定要禁用该用户吗？" : "你确定要启用该用户吗？"
          }
          onConfirm={() => onChangeStatus(text, record.id)}
          okText="确定"
          cancelText="取消"
        >
          <Switch checked={text} />
        </Popconfirm>
      ),
    },
    {
      title: "操作",
      render: (text) => (
        <Space>
          <Button type="link" onClick={() => onUpdate(text.id)}>
            编辑
          </Button>
          <Popconfirm
            title="删除用户"
            description="你确定要删除该用户吗？"
            onConfirm={() => onConfirm(text.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link" danger>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // 获取用户列表
  const getList = async () => {
    try {
      const res = await getUserList(reqData);
      setList(res.data);
      setTotal(res.pagination.totalElements);
    } catch (error) {}
  };

  useEffect(() => {
    getList();
  }, [reqData]);

  const showDrawer = () => {
    setOpen(true);
  };
  const hideDrawer = () => {
    setOpen(false);
  };
  // 查询
  const onFinish = (formValue) => {
    setReqData({ ...reqData, ...formValue });
  };
  // 分页
  const onPageChange = (page, pageSize) => {
    setReqData({
      page: page - 1,
      size: pageSize,
    });
  };
  // 删除
  const onConfirm = async (id) => {
    try {
      // 1.调用删除接口
      await delUser(id);
      // 2.提示成功
      message.success("删除用户成功");
      if (list.length - 1 === 0 && reqData.page > 0) {
        setReqData({
          ...reqData,
          page: reqData.page - 1,
        });
      } else {
        setReqData({
          ...reqData,
        });
      }
    } catch (error) {}
  };
  // 编辑
  const onUpdate = (id) => {
    userId.current = id;
    setOpen(true);
  };
  // 启用or禁用
  const onChangeStatus = async (val, id) => {
    try {
      if (val) {
        await disableUser(id);
        message.success("禁用用户成功");
      } else {
        await enableUser(id);
        message.success("启用用户成功");
      }
      setReqData({
        ...reqData,
      });
    } catch (error) {}
  };

  return (
    <>
      <div className="user-container">
        <Form layout="inline" onFinish={onFinish}>
          <Form.Item name="username" label="邮箱">
            <Input placeholder="请输入邮箱" />
          </Form.Item>
          <Form.Item name="nickName" label="昵称">
            <Input placeholder="请输入昵称" />
          </Form.Item>
          <Form.Item name="mobile" label="手机号">
            <Input placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item
            name="roles"
            label="角色"
            wrapperCol={{ style: { width: "350px" } }}
          >
            <Select
              placeholder="请选择角色"
              mode="multiple"
              options={roleOption}
            />
          </Form.Item>
          <Form.Item name="enabled" label="是否启用">
            <Switch />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </Form.Item>
        </Form>
        <Divider />
        <Button
          type="primary"
          style={{ marginBottom: "20px" }}
          onClick={showDrawer}
        >
          添加用户
        </Button>
        {/* 表格区域 */}
        <Table
          rowKey="id"
          columns={columns}
          dataSource={list}
          pagination={{
            // current: reqData.page + 1,
            total,
            showTotal: () => `共 ${total} 条`,
            onChange: onPageChange,
            defaultPageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: [2, 5, 10],
            showQuickJumper: true,
            locale: {
              items_per_page: "条/页",
              jump_to: "跳至",
              page: "页",
            },
          }}
        />
        <AddUser
          open={open}
          id={userId}
          hideDrawer={hideDrawer}
          getList={getList}
        />
      </div>
    </>
  );
};

export default UserManage;
