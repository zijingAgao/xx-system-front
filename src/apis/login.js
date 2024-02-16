import { request } from "@/utils"

// 获取登录验证码
export function getCaptcha() {
  return request({
    url: '/login/captcha'
  })
}

// 登录
export function login(params) {
  return request({
    url: '/login',
    method: 'POST',
    params,
  })
}

// 登出
export function logout() {
  return request({
    url: '/logout'
  })
}