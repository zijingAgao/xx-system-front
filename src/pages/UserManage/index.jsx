import './index.scss'
import { Input, Button, Divider, Table, Switch, Space } from 'antd';
import { useState } from 'react';

const UserManage = () => {
  const columns = [
    {
      title: '序号',
      render: (text, record, index) => index + 1
    },
    {
      title: '用户姓名',
      dataIndex: 'username'
    },
    {
      title: '手机号',
      dataIndex: 'mobile'
    },
    {
      title: '密码',
      dataIndex: 'password'
    },
    {
      title: '角色',
      dataIndex: 'roles',
      render: roles => (
        <Space>
          {roles.map((role) => {
            return <span>{role}</span>
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
      username: '测试1',
      mobile: '13800000001',
      password: '246810',
      roles: ['系统管理员', '审计管理员'],
      enabled: true,
    }
  ]);
  return (
    <>
      <div className="user-container">
        <div className='search'>
          用户姓名：
          <Input type="text" placeholder='请输入员工姓名' style={{width: '150px', marginRight: '10px'}} />
          <Button type='primary'>查询</Button>
        </div>
        <Divider />
        <Button type='primary' style={{marginBottom: '20px'}}>添加用户</Button>
        {/* 表格区域 */}
        <Table rowKey='id' columns={columns} dataSource={list} />
      </div>
    </>
  )
}

export default UserManage