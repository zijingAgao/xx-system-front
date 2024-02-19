import { createSlice } from '@reduxjs/toolkit'
import { request } from '@/utils'
import { setToken as _setToken, getToken } from '@/utils'
import { login } from '@/apis/login'

const userStore = createSlice({
  name: "user",
  initialState: {
    token: getToken() || ''
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload
      _setToken(action.payload)
    }
  }
})

const { setToken } = userStore.actions
const userReducer = userStore.reducer

// 获取token
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await login(loginForm)
    dispatch(setToken(res.data.accessToken))
  }
}

export { fetchLogin, setToken }
export default userReducer