import { Drawer, Space, Button, Input, Form, Select, Switch, message } from "antd"
import { useState } from "react"
import { addUser } from "@/apis/user"

const AddUser = ({open, hideDrawer, getList}) => {
  const [autoPwd, setAutoPwd] = useState(false)
  const onChange = (checked) => {
    setAutoPwd(checked)
  }
  const onFinish = async (formValue) => {
    console.log(formValue)
    // 1.请求接口
    await addUser(formValue)
    // 2.提示成功
    message.success('添加用户成功')
    // 3.刷新列表
    getList()
    // 4.关闭表单
    // TODO:关闭的时候清除表单信息
    hideDrawer()
  }
  return (
    <Drawer 
      title="添加用户" 
      onClose={hideDrawer} 
      open={open} 
      width={500}
    >
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item 
          label='邮箱' 
          name='username'
          rules={[
            {
              required: true,
              message: '请填写邮箱！'
            },
            {
              pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
              message: '请填写正确的邮箱！'
            }
          ]}
        >
          <Input placeholder="请填写邮箱" />
        </Form.Item>
        <Form.Item label='用户名（选填）' name='nickName'>
          <Input placeholder="请填写用户名" />
        </Form.Item>
        <Form.Item 
          label='手机号' 
          name='mobile'
          rules={[
            {
              required: true,
              message: '请填写手机号！'
            },
            {
              pattern: /^1[3-9]\d{9}$/,
              message: '请填写正确的手机号！'
            }
          ]}
        >
          <Input placeholder="请填写手机号" />
        </Form.Item>
        <Form.Item 
          label='角色' 
          name='roles'
          rules={[
            {
              required: true,
              message: '请选择角色！'
            }
          ]}
        >
          <Select 
            placeholder='请选择角色' 
            mode="multiple"
            options={[
              {
                value: 'ADMIN',
                label: '系统管理员'
              },
              {
                value: 'AUDIT_ADMIN',
                label: '审计管理员'
              }
            ]}
          />
        </Form.Item>
        {/* 密码 */}
        <Form.Item label='自动生成密码' name='autoPwd' initialValue={autoPwd}>
          <Switch onChange={onChange} />
        </Form.Item>
        {autoPwd === false && (
          <Form.Item 
            label='密码' 
            name='password'
            rules={[
              {
                required: true,
                message: '请填写密码！'
              }
            ]}
          >
            <Input placeholder="请填写密码" />
          </Form.Item>
        )}
        <Form.Item label='是否启用' name='enabled' initialValue={false}>
          <Switch />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button onClick={hideDrawer}>取消</Button>
            <Button type='primary' htmlType='submit'>确认</Button>
          </Space>
        </Form.Item>
      </Form>
    </Drawer>
  )
}

export default AddUser