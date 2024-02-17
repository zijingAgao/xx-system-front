import { useEffect, useState } from "react";
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
} from "antd";
import "./index.scss";
import AddUser from "./AddUser";
import { getUserList, delUser } from "@/apis/user";
import { roleEnum } from "@/constants/enums.js";

const UserManage = () => {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  // 查询列表参数
  const [reqData, setReqData] = useState({
    page: 0,
    size: 5,
  });

  const columns = [
    {
      title: "序号",
      render: (text, record, index) => index + 1,
    },
    {
      title: "用户姓名",
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
          {text.length !== 0
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
      render: (enabled) => <Switch checked={enabled} />,
    },
    {
      title: "操作",
      render: (text, record, index) => (
        <Space>
          <a>编辑</a>
          <Popconfirm
            title="删除用户"
            description="你确定要删除该用户吗？"
            onConfirm={() => onConfirm(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <a>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // 获取用户列表
  const getList = async () => {
    const res = await getUserList(reqData);
    setList(res.data);
    setTotal(res.pagination.totalElements);
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

  const onFinish = (formValue) => {
    setReqData({ ...reqData, username: formValue.username });
  };
  // 分页
  const onPageChange = (page, pageSize) => {
    setReqData({
      page: page - 1,
      size: pageSize,
    });
  };
  // 删除
  // TODO:删除有点小问题: table表格末页数据删除后，分页回退处理
  const onConfirm = async (id) => {
    // 1.调用删除接口
    await delUser(id);
    // 2.提示成功
    message.success("删除用户成功");
    setReqData({
      ...reqData,
    });
  };
  return (
    <>
      <div className="user-container">
        <Form layout="inline" onFinish={onFinish}>
          <Form.Item name="username" label="邮箱">
            <Input placeholder="请输入邮箱" />
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
        <AddUser open={open} hideDrawer={hideDrawer} getList={getList} />
      </div>
    </>
  );
};

export default UserManage;
