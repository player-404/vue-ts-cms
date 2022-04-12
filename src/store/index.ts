import { createStore } from "vuex";
import login from "./module/login";
export default createStore<any>({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    login: login,
  },
});
