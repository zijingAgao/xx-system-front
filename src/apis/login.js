import { request } from "@/utils"

// 获取登录验证码
export function getCaptcha() {
  return request({
    url: '/login/captcha'
  })
}