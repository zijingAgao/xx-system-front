import { getToken } from '@/utils'
import { Navigate } from 'react-router-dom'

export function AuthRoute ({ children }) {
  const token = getToken()
  // 有token正常跳转 无token去登录
  if (token) {
    return <>{children}</>
  } else {
    return <Navigate to={'/login'} replace />
  }
}