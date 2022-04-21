import { createStore } from "vuex";
import login from "./module/login";
export default createStore<any>({
  state: {},
  getters: {
    menu(state) {
      return state.login.menu;
    },
  },
  mutations: {},
  actions: {},
  modules: {
    login: login,
  },
});
