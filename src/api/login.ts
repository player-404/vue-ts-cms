import request from "./request";

//账号登录
export const signInAccount = (account: string, password: number | string) =>
  request.post({
    url: "/login",
    data: {
      name: account,
      password,
    },
  });

//邮箱登录
export const signInEmail = (email: string, password: number | string) =>
  request.post({
    url: "/phoneLogin",
    data: {
      email,
      password,
    },
  });

//手机号登录
export const signInPhone = (phone: number, code: number) =>
  request.post({
    url: "/emailLogin",
    data: {
      phone,
      code,
    },
  });

//获取角色信息(权限)
export const getUserInfo = (userId: number) =>
  request.get({ url: `users/${userId}` });

// 获取角色菜单
export const getUserMenu = (roleId: number) =>
  request.get({ url: `/role/${roleId}/menu` });
