import { createSlice } from "@reduxjs/toolkit";
import { request } from "@/utils";
import { setToken as _setToken, getToken } from "@/utils";
import { login } from "@/apis/login";
import { getUserInfo } from "@/apis/user";

const userStore = createSlice({
  name: "user",
  initialState: {
    token: getToken() || "",
    userInfo: {},
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      _setToken(action.payload);
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
  },
});

const { setToken, setUserInfo } = userStore.actions;
const userReducer = userStore.reducer;

// 获取token
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    try {
      const res = await login(loginForm);
      dispatch(setToken(res.data.accessToken));
    } catch (error) {}
  };
};

// 获取用户信息
const fetchUserInfo = () => {
  return async (dispatch) => {
    try {
      const res = await getUserInfo();
      dispatch(setUserInfo(res.data));
    } catch (error) {}
  };
};

export { fetchLogin, fetchUserInfo, setToken };
export default userReducer;
