import { useEffect, useState } from 'react';
import { Input, Button, Divider, Table, Switch, Space, Modal, Form } from 'antd';
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
  const [open, setOpen] = useState(false)
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  // 查询列表参数
  const [reqData, setReqData] = useState({
    page: 0,
    size: 5,
  })

  const columns = [
    {
      title: '序号',
      render: (text, record, index) => index + 1
    },
    {
      title: '用户姓名',
      dataIndex: 'nickName',
      render: (text) => text ? text : '-'
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
  
  // 获取用户列表
  const getList = async () => {
    const res = await getUserList(reqData)
    setList(res.data)
    setTotal(res.pagination.totalElements)
  }

  useEffect(() => {
    getList()
  }, [reqData])

  const showDrawer = () => {
    setOpen(true)
  }
  const hideDrawer = () => {
    setOpen(false)
  }

  const onFinish = (formValue) => {
    setReqData({...reqData, username: formValue.username})
  }
  // 分页
  const onPageChange = (page) => {
    setReqData({
      ...reqData,
      page: page - 1
    })
  }
  return (
    <>
      <div className="user-container">
        <Form layout='inline' onFinish={onFinish}>
          <Form.Item name='username' label='邮箱'>
            <Input placeholder='请输入邮箱' />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>查询</Button>
          </Form.Item>
        </Form>
        <Divider />
        <Button type='primary' style={{marginBottom: '20px'}} onClick={showDrawer}>添加用户</Button>
        {/* 表格区域 */}
        <Table rowKey='id' columns={columns} dataSource={list} pagination={{
          total,
          pageSize: reqData.size,
          onChange: onPageChange
        }} />
        <AddUser open={open} hideDrawer={hideDrawer} getList={getList} />
      </div>
    </>
  )
}

export default UserManage