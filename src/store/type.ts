// login
export const SET_CODE = "SET_CODE";
export const SET_ACCOUNT = "SET_ACCOUNT";
export const SET_PHONE = "SET_PHONE";
export const SET_ACCOUNR_DATA = "SET_ACCOUNT_DATA";
export const SET_MENU = "SET_MENU";
export const SET_PERMISSION = "SET_PERMISSION";
export const SET_TOKEN = "SET_TOKEN";
export const SET_USERINFO = "SET_USERINFO";

export interface ILoginState {
  code: number | undefined;
  account: string | undefined;
  phone: number | undefined;
  password: string | undefined;
  accountInfo: any;
  menu: any[];
  permission: any[];
  token: string;
  userInfo: any[];
}

//system
export const SET_USER_LIST = "SET_USER_LIST";
export const SET_ROLE_LIST = "SET_ROLE_LIST";
export const SET_DEPARTMENT_LIST = "SET_DEPARTMENT_LIST";
export const SET_GOODS_LIST = "SET_GOODS_LIST";
export const SET_MENU_LIST = "SET_MENU_LIST";
export interface Iuser {
  userList: any[];
  userTotalCount: number;
  roleList: any[];
  roleTotalCount: number;
  dapartmentList: any[];
  departmentTotalCount: number;
  goodsList: any[];
  goodsTotalCount: number;
  menuList: any[];
  menuTotalCount: number;
}
