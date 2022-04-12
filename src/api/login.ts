import Request from "./service";

const baseURL = process.env.VUE_APP_BASE_URL;

const loginRequest = new Request({
  baseURL,
  timeout: 5000,
});

//账号登录
export const signInAccount = (account: string, password: number | string) =>
  loginRequest.post({
    url: "/login",
    data: {
      name: account,
      password,
    },
  });

//邮箱登录
export const signInEmail = (email: string, password: number | string) =>
  loginRequest.post({
    url: "/phoneLogin",
    data: {
      email,
      password,
    },
  });

//手机号登录
export const signInPhone = (phone: number, code: number) =>
  loginRequest.post({
    url: "/emailLogin",
    data: {
      phone,
      code,
    },
  });
