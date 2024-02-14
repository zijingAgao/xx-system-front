import axios from 'axios'
import { getToken } from '@/utils'
import { message } from 'antd'

const request = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  // baseURL: 'http://1.14.64.132:9999/api',
  timeout: 5000
})

// 请求拦截器
request.interceptors.request.use((config) => {
  // 请求头注入token
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use((response) => {
  return response.data
}, (error) => {
  return Promise.reject(error)
})

export { request }
