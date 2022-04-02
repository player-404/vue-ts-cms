import axios from "axios";
const instance = axios.create({
  baseURL: "http://test.top",
  timeout: 10000,
});

//请求拦截器
instance.interceptors.request.use((config) => {
  console.log("config", config);
});

//响应拦截器
instance.interceptors.response.use((config) => {
  console.log("config", config);
});
