import Request from "./service";

const baseURL = process.env.VUE_APP_BASE_URL;

const request = new Request({
  baseURL,
  timeout: 5000,
});

export default request;
