import { ILoginState } from "./../type";
import { Module } from "vuex";
import { addMenus } from "@/utils/get-user-menu-list";
import router from "@/router";
import {
  SET_CODE,
  SET_ACCOUNT,
  SET_PHONE,
  SET_ACCOUNR_DATA,
  SET_MENU,
  SET_PERMISSION,
  SET_TOKEN,
  SET_USERINFO,
} from "../type";
import instance from "@/api/myApiTest";
import { getUserInfo, getUserMenu } from "@/api/login";
import Cookie from "js-cookie";
import { useSetStorage, useClearStorage, useGetStorage } from "@/utils/storage";
import { useSignIn } from "@/utils/sign-in";
import { useCipher, useDecrypt } from "@/utils/crypto";
import mapMenu from "@/utils/map-menu";
import Cookies from "js-cookie";
interface data {
  code: number;
}

const state = function () {
  return {
    //手机验证码
    code: 1234,
    //账号
    account: undefined,
    //密码
    password: undefined,
    //手机号
    phone: undefined,
    accountInfo: {},
    menu: [],
    permission: [],
    token: "",
    userInfo: [],
  };
};

const mutations = {
  [SET_CODE](state: any, payload: any): void {
    console.log(payload);
    state.code = payload.code;
  },
  //设置账号密码
  [SET_ACCOUNT](state: any, payload: any): void {
    console.log("设置账号密码 mutations", payload);
    state.account = payload.account;
    state.password = payload.password;
  },
  [SET_PHONE](state: any, payload: any): void {
    console.log("设置手机号 mutatiuons", payload);
    state.phone = payload.phone;
  },
  //登录后保存账户信息
  [SET_ACCOUNR_DATA](state, payload: any): void {
    state.accountInfo = payload;
  },
  [SET_MENU](state, payload) {
    state.menu = payload.menu;
  },
  [SET_PERMISSION](state, payload) {
    state.permission = payload.permission;
  },
  [SET_TOKEN](state, payload) {
    state.token = payload.token;
  },
  [SET_USERINFO](state, payload) {
    state.userInfo = payload.userInfo;
  },
};

const actions = {
  loadLocalSotrage({ commit, dispatch }) {
    const token = Cookies.get("token");

    if (token) {
      commit(SET_TOKEN, { token: token });
      const { value } = useGetStorage("menu");
      if (value.value) {
        console.log("取缓存");
        commit(SET_MENU, { menu: value.value });
      } else {
        dispatch("userInfo");
      }
    }
    const accountInfo = useGetStorage("accountInfo");
    if (accountInfo) {
      commit(SET_ACCOUNR_DATA, accountInfo);
    }
  },
  //获取手机验证码
  getCode(context: any) {
    return new Promise((resolve, reject) => {
      instance
        .get<data>({ url: "/getCode", showLoading: false })
        .then((res) => {
          context.commit(SET_CODE, { code: res.data.code });
          resolve(res.data.code);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  //账号登录
  async signInAccount({ commit, dispatch }, payload: any) {
    //解密后的密码
    let oroginPassword = "";
    //将要缓存的密码：可能时缓存中的加密密码，也可能是重新加密后的密码字符串
    let storagePassword = "";
    console.log("payload", payload);
    const data = await useSignIn("account", {
      account: payload.account,
      password: payload.password,
    });
    console.log("data", data);
    commit(SET_ACCOUNR_DATA, data.data.data);
    // 缓存token
    Cookie.set("token", `${data.data.data.token}&${data.data.data.id}`, {
      expires: 7,
    });

    // 记住密码 缓存数据
    if (payload.remember) {
      const { value } = useGetStorage("accountInfo");
      // 对缓存中加密密码解密，与用户传入的密码一直，则缓存原来的缓存中的加密密码，否则进行重新加密后缓存（即使密码相同，每次加密后的密码字符串也不同同）
      if (value.value) {
        const cipherPassword = value.value.password;
        storagePassword = cipherPassword;
        const { password } = useDecrypt(cipherPassword);
        oroginPassword = password.value;
      }
      //用户输入的密码与缓存中解密后的密码不一致，则重新加密
      if (oroginPassword != payload.password) {
        //加密password
        const { cipherText } = useCipher(payload.password);
        if (cipherText.value) {
          storagePassword = cipherText.value;
        }
      }
      // 每次登录都会重新缓存数据
      useSetStorage("accountInfo", {
        account: payload.account,
        password: storagePassword,
      });
    } else {
      //清除缓存
      useClearStorage("accountInfo");
    }
    console.log("获取用户信息");
    await dispatch("userInfo", { id: data.data.data.id });
  },

  // 邮箱登录
  async signInEmail() {
    // TODO: 邮箱登录
    console.log("这里时邮箱登录");
  },

  //手机号码登录
  async signInPhone({ commit }) {
    // const data = await phoneSignIn(payload.phone, payload.code);
    console.log(commit);
  },

  // 获取角色信息
  async userInfo({ commit }, payload) {
    let userId: number;
    if (payload) {
      userId = payload.id;
    } else {
      userId = Cookie.get("token").split("&")[1];
    }
    console.log("userid", userId);
    const data = await getUserInfo(userId);
    commit(SET_USERINFO, { userInfo: data.data.data });
  },
  // 获取角色菜单
  async userMenu({ commit }, payload) {
    const data = await getUserMenu(payload.roleId);
    commit(SET_MENU, { menu: data.data.data });
  },
  async permission({ commit }, payload) {
    const permission = mapMenu(payload.menu);
    commit(SET_PERMISSION, { perrmission: permission });
  },
};

const login: Module<ILoginState, any> = {
  namespaced: true,
  state,
  mutations,
  actions,
};

export default login;
