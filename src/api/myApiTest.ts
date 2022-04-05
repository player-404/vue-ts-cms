import Request from "./service";
const baseURL = process.env.VUE_APP_BASE_URL;
const instance = new Request({
  baseURL,
  timeout: 5000,
});

export default instance;
