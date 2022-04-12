import Crypto from "crypto-js";

import { ref } from "vue";

import { useGetStorage } from "./useStorage";
const key = process.env.VUE_APP_KEY || "123";

let text: string;

//密码加密
export function useCipher(password: string) {
  const cipherText = ref<string>();
  text = Crypto.AES.encrypt(password, key).toString();
  cipherText.value = text;
  return { cipherText };
}

//密码解密
export function useDecrypt(cipherText: string) {
  const bytes = Crypto.AES.decrypt(cipherText, key);
  const originText = bytes.toString(Crypto.enc.Utf8);
  const password = ref(originText);
  return {
    password,
  };
}

//比较密码
export function useComparePassword(
  passwordText: string,
  type: "accountInfo" | "emailInfo"
) {
  if (useStatus(passwordText, type)) {
    const { password } = useDecrypt(passwordText);
    return password.value;
  }
  return passwordText;
}

// 判断用户输入的密码是否与缓存中的密码相同，相同则是缓存数据，需要解码，否则则不需要
export const useStatus = (password: string, storageKey: string): boolean => {
  const { value } = useGetStorage(storageKey);
  if (!value.value) return false;
  return JSON.parse(value.value).password === password;
};
