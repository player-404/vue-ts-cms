// login
export const SET_CODE = "SET_CODE";
export const SET_ACCOUNT = "SET_ACCOUNT";
export const SET_PHONE = "SET_PHONE";
export const SET_ACCOUNR_DATA = "SET_ACCOUNT_DATA";

export interface ILoginState {
  code: number | undefined;
  account: string | undefined;
  phone: number | undefined;
  password: string | undefined;
  accountInfo: any;
}
