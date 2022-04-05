import { SET_CODE } from "../type";

import instance from "@/api/myApiTest";

import { state } from "../type";

interface data {
  code: number;
}

const state = function (): state {
  return {
    //手机验证码
    code: 1234,
  };
};

const mutations = {
  [SET_CODE](state: any, payload: any): void {
    console.log(payload);
    state.code = payload.code;
  },
};

const actions = {
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
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
