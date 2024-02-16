import { useEffect, useState } from 'react';
import { Input, Button, Divider, Table, Switch, Space, Modal } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import './index.scss'
import AddUser from './AddUser';
import { getUserList, delUser } from '@/apis/user'

const { confirm } = Modal

const showConfirm = (id) => {
  confirm({
    title: '是否删除该用户？',
    icon: <ExclamationCircleFilled />,
    okText: '确定',
    cancelText: '取消',
    // TODO:这里还有点问题
    onOk: async () => {
      await delUser(id)
    },
    onCancel() {
      
    },
  });
};

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
      render: enabled => <Switch disabled checked={enabled} />
    },
    {
      title: '操作',
      render: (text, record, index) => (
        <Space>
          <a>编辑</a>
          <a onClick={() => showConfirm(record.id)}>删除</a>
        </Space>
      )
    }
  ]
  const [list, setList] = useState([]);

  // 获取用户列表
  const getList = async () => {
    const res = await getUserList()
    setList(res.data)
  }

  useEffect(() => {
    getList()
  }, [])

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
        <AddUser open={open} hideDrawer={hideDrawer} getList={getList} />
      </div>
    </>
  )
}

export default UserManage