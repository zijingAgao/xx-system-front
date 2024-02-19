import { request } from "@/utils";

// 获取用户列表
export function getUserList(params) {
  return request({
    url: "/user",
    params,
  });
}

// 新增用户
export function addUser(data) {
  return request({
    url: "/user",
    method: "POST",
    data,
  });
}

// 修改用户
export function updateUser(data) {
  return request({
    url: "/user",
    method: "PUT",
    data,
  });
}

// 禁用用户
export function disableUser(id) {
  return request({
    url: `/user/disable/${id}`,
    method: "PUT",
  });
}

// 启用用户
export function enableUser(id) {
  return request({
    url: `/user/enable/${id}`,
    method: "PUT",
  });
}

// 查询用户详情
export function getUserDetail(id) {
  return request({
    url: `/user/${id}`,
  });
}

// 删除用户
export function delUser(id) {
  return request({
    url: `/user/${id}`,
    method: "DELETE",
  });
}

// 获取当前用户信息
export function getUserInfo() {
  return request({
    url: "/user/current",
  });
}
