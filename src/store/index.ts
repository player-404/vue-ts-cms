import { createStore } from "vuex";
import login from "./module/login";
import system from "./module/system";
export default createStore<any>({
  state: {},
  getters: {
    menu(state) {
      return state.login.menu;
    },
    userData(state) {
      return {
        list: state.system.userList,
        count: state.system.userTotalCount,
      };
    },
    roleData(state) {
      return {
        list: state.system.roleList,
        count: state.system.roleTotalCount,
      };
    },
    departmentData(state) {
      return {
        list: state.system.departmentList,
        count: state.system.departmentTotalCount,
      };
    },
    goodsData(state) {
      return {
        list: state.system.goodsList,
        count: state.system.goodsTotalCount,
      };
    },
    menuData(state) {
      return {
        list: state.system.menuList,
        count: state.system.menuTotalCount,
      };
    },
    userInfo(state) {
      return state.login.userInfo;
    },
    permission(state) {
      return state.login.permission;
    },
  },
  mutations: {},
  actions: {},
  modules: {
    login: login,
    system,
  },
});
