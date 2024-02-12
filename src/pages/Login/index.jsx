import './index.scss'
import { Card, Form, Input, Button, message } from 'antd' 
import { useDispatch } from 'react-redux'
import { fetchLogin } from '@/store/modules/user'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import countdown from '@/utils/countdown'

const Login = () => {
  const [count, setCount] = useState(-1)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onFinish = async (values) => {
    console.log(values)
    await dispatch(fetchLogin(values))
    // 跳转到首页
    navigate('/')
    message.success('登录成功')
  }
  // 获取验证码
  const onGetCaptcha = async () => {
    const [exec, clear] = countdown((count, clear) => {
      setCount(count)
    })
    exec()
    // TODO: 在这里执行发送验证码的程序
  }
  return (
    <div className='login'>
      <Card className='login-container'>
        {/* 登录表单 */}
        <Form onFinish={onFinish} validateTrigger="onBlur">
          <Form.Item
            name="mobile"
            rules={[
              {
                required: true,
                message: '请输入手机号'
              },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: '请输入正确的手机号'
              }
            ]}
          >
            <Input size='large' placeholder='请输入手机号' />
          </Form.Item>
          <Form.Item
            name="code"
            rules={[
              {
                required: true,
                message: '请输入验证码'
              }
            ]}
          >
            <Input 
              size='large' 
              placeholder='请输入验证码' 
              suffix={
                count < 0 ?
                <span style={{fontSize: '14px', cursor: 'pointer'}} onClick={onGetCaptcha}>获取验证码</span> : 
                <span style={{fontSize: '14px', cursor: 'not-allowed'}}>{count}s后重发</span>
              }
            />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' size='large' block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login
