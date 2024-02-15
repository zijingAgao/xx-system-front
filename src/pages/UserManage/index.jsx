import './index.scss'
import { Input, Button, Divider, Table, Switch, Space } from 'antd';
import { useState } from 'react';
import AddUser from './AddUser';

const UserManage = () => {
  const [open, setOpen] = useState(false);
  const columns = [
    {
      title: '序号',
      render: (text, record, index) => index + 1
    },
    {
      title: '用户姓名',
      dataIndex: 'nickName'
    },
    {
      title: '邮箱',
      dataIndex: 'username'
    },
    {
      title: '手机号',
      dataIndex: 'mobile'
    },
    {
      title: '角色',
      dataIndex: 'roles',
      render: roles => (
        <Space>
          {roles.map((role) => {
            return <span key={role}>{role}</span>
          })}
        </Space>
      )
    },
    {
      title: '是否启用',
      dataIndex: 'enabled',
      render: enabled => <Switch checked={enabled} />
    },
    {
      title: '操作',
      render: () => (
        <Space>
          <a>编辑</a>
          <a>删除</a>
        </Space>
      )
    }
  ]
  const [list, setList] = useState([
    {
      id: '1',
      nickName: '测试1',
      username: '99999@qq.com',
      mobile: '13800000001',
      password: '246810',
      roles: ['系统管理员', '审计管理员'],
      enabled: true,
    }
  ]);

  const showDrawer = () => {
    setOpen(true)
  }
  const hideDrawer = () => {
    setOpen(false)
  }
  return (
    <>
      <div className="user-container">
        <div className='search'>
          邮箱：
          <Input type="text" placeholder='请输入邮箱' style={{width: '150px', marginRight: '10px'}} />
          <Button type='primary'>查询</Button>
        </div>
        <Divider />
        <Button type='primary' style={{marginBottom: '20px'}} onClick={showDrawer}>添加用户</Button>
        {/* 表格区域 */}
        <Table rowKey='id' columns={columns} dataSource={list} />
        <AddUser open={open} hideDrawer={hideDrawer} />
      </div>
    </>
  )
}

export default UserManage