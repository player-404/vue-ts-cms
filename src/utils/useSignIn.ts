import { signInEmail, signInPhone } from "@/api/login";
import { ElNotification } from "element-plus";
function signIn(type: "phone" | "email" | "account", payload: any) {
  if (type === "phone") return signInPhone(payload.phone, payload.code);
  if (type === "email") return signInEmail(payload.emai, payload.password);
  return signInPhone(payload.account, payload.password);
}

export function useSignIn(type: "phone" | "email" | "account", payload: any) {
  signIn(type, payload)
    .then(() => {
      ElNotification({
        title: "登录成功",
        type: "success",
      });
    })
    .catch(() => {
      ElNotification({
        title: "登录失败",
        message: "请检查你的账号或密码",
        type: "success",
      });
    });
}
