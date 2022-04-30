import { SET_MENU_LIST } from "./../type";
import { Module } from "vuex";
import { Iuser } from "../type";
import {
  getDepartment,
  getRoleList,
  getUserList,
  getGoodsList,
  getMenuList,
} from "@/api/system";
import {
  SET_USER_LIST,
  SET_ROLE_LIST,
  SET_DEPARTMENT_LIST,
  SET_GOODS_LIST,
} from "../type";
import { Iconfig } from "@/api/types";

const state = function () {
  return {
    userList: [],
    userTotalCount: 0,
    roleList: [],
    roleTotalCount: 0,
    dapartmentList: [],
    departmentTotalCount: 0,
    goodsList: [],
    goodsTotalCount: 0,
    menuList: [],
    menuTotalCount: 0,
  };
};

const mutations = {
  [SET_USER_LIST](state, payload) {
    state.userList = payload.data.list;
    state.userTotalCount = payload.data.totalCount;
  },
  [SET_DEPARTMENT_LIST](state, payload) {
    state.departmentList = payload.data.list;
    state.departmentTotalCount = payload.data.totalCount;
  },
  [SET_ROLE_LIST](state, payload) {
    state.roleList = payload.data.list;
    state.roleTotalCount = payload.data.totalCount;
  },
  [SET_GOODS_LIST](state, payload) {
    state.goodsList = payload.data.list;
    state.goodsTotalCount = payload.data.totalCount;
  },
  [SET_MENU_LIST](state, payload) {
    state.menuList = payload.data.list;
    state.menuTotalCount = payload.data.totalCount;
  },
};
const actions = {
  async pageContentData({ commit }, payload: Iconfig) {
    const { pageName, queryConfig } = payload;
    let data;
    if (pageName === "users") {
      data = await getUserList(queryConfig);
      commit(SET_USER_LIST, { data: data.data.data });
    }
    if (pageName === "role") {
      data = await getRoleList(queryConfig);
      commit(SET_ROLE_LIST, { data: data.data.data });
    }
    if (pageName === "department") {
      data = await getDepartment(queryConfig);
      commit(SET_DEPARTMENT_LIST, { data: data.data.data });
    }
    if (pageName === "goods") {
      data = await getGoodsList(queryConfig);
      commit(SET_GOODS_LIST, { data: data.data.data });
    }
    if (pageName === "menu") {
      data = await getMenuList(queryConfig);
      commit(SET_MENU_LIST, { data: data.data.data });
    }
  },
};

const system: Module<Iuser, any> = {
  namespaced: true,
  state,
  mutations,
  actions,
};

export default system;
