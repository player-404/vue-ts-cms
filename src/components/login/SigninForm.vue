<script setup lang="ts">
import { ref, computed, reactive, watch } from "vue";

import type { FormInstance } from "element-plus";
import { ElNotification } from "element-plus";
import SignInAccount from "./AccountForm.vue";
import SignInEmail from "./EmailForm.vue";
import SignInPhone from "./PhoneForm.vue";
import { useStore } from "vuex";
import { useSetStorage, useGetStorage } from "@/utils/storage";
import { useComparePassword } from "@/utils/crypto";

enum SignInType {
  ACCOUNT,
  PHONE,
  EMAIL,
}
//表单实例
const signIn = ref<SignInType>(SignInType.ACCOUNT);
//表单数据
const email = ref<string>();
const account = ref<string>();
const password = ref<string>();
const phone = ref<number>();
//缓存密码：用来判断是否需要解密
const storePassWord = ref<string>();

const store = useStore();
//其他登录方式 icon
const icon = reactive({
  [SignInType.ACCOUNT]: "http://img.zphlplay.top/vue-ts-cms/peopleNew.png",
  [SignInType.PHONE]: "http://img.zphlplay.top/vue-ts-cms/iphone.png",
  [SignInType.EMAIL]: "http://img.zphlplay.top/vue-ts-cms/email-lock.png",
});
//动态组件
const activeComponent = computed(() => {
  return signIn.value === SignInType.ACCOUNT
    ? SignInAccount
    : signIn.value === SignInType.PHONE
    ? SignInPhone
    : SignInEmail;
});

//表单实例
const formInstance = ref<FormInstance>();

// 手机登录
const signInPhone = () => {
  signIn.value = SignInType.PHONE;
};
//邮箱登录
const signInEmail = () => {
  signIn.value = SignInType.EMAIL;
};
//账号登录
const signInAccount = () => {
  signIn.value = SignInType.ACCOUNT;
};
//记住密码
const rememberPass = ref<boolean>(false);

//提交表单
const submit = (formInstance: FormInstance | undefined) => {
  if (!formInstance) return;
  formInstance.validate((valit) => {
    if (valit) {
      console.log("表单提交成功");
      //TODO: 手机登录
      if (signIn.value === SignInType.PHONE) {
        console.log("phone signIn");
      }
      //TODO: 邮箱登录
      if (signIn.value === SignInType.EMAIL) {
        console.log("email", email.value);
        console.log("password", password.value);
      }
      //TODO: 账号登录
      if (signIn.value === SignInType.ACCOUNT) {
        // 密码解码
        let passwordText = "";
        if (password.value) {
          // 缓存中的是加密后的密码，入如果输入框中的密码与缓存中的密码一直，则该密码需要解码，再去发送登录请求
          passwordText = useComparePassword(password.value, "accountInfo");
        }
        console.log("passwordText", passwordText);
        store.dispatch("login/signInAccount", {
          account: account.value,
          password: `${passwordText}`,
          remember: rememberPass.value,
        });
      }
    } else {
      ElNotification({
        title: "登录失败",
        type: "error",
      });
      return false;
    }
  });
};

//缓存中获取是否记住密码
const getRememberStorage = () => {
  const { value } = useGetStorage("remember");
  if (value.value != null) {
    rememberPass.value = value.value;
  }
};
//获取账号本地缓存
const getAccountStorage = () => {
  if (!rememberPass.value) return;
  const { value } = useGetStorage("accountInfo");
  if (!value.value) return;
  const accountInfo = value.value;
  account.value = accountInfo.account;
  password.value = accountInfo.password;
  storePassWord.value = accountInfo.password;
};
//获取邮箱本地缓存
const getEmailStoeage = () => {
  if (!rememberPass.value) return;
  const { value } = useGetStorage("EmailInfo");
  if (!value.value) return;
  const accountInfo = value.value;
  email.value = accountInfo.account;
  password.value = accountInfo.password;
  storePassWord.value = accountInfo.password;
};

getRememberStorage();

if (signIn.value === SignInType.ACCOUNT) {
  getAccountStorage();
}

if (signIn.value === SignInType.EMAIL) {
  getEmailStoeage();
}

// 缓存记住密码的状态
watch(rememberPass, (newv) => {
  useSetStorage("remember", newv);
});
</script>
<template>
  <div id="sing-in-form">
    <Transition
      tag="div"
      class="title"
      enter-active-class="animate__animated animate__fadeInDown animate__faster"
      leave-active-class="animate__animated animate__fadeOutUp animate__faster"
      mode="out-in"
    >
      <h1 class="title" v-if="signIn === SignInType.ACCOUNT">账号登录</h1>
      <h1 class="title" v-else-if="signIn === SignInType.PHONE">手机登录</h1>
      <h1 class="title" v-else>邮箱登录</h1>
    </Transition>
    <div class="sign-in-container mt-1">
      <Transition
        enter-active-class="animate__animated animate__fadeInRight animate__faster"
        leave-active-class="animate__animated animate__fadeOutLeft animate__faster"
        mode="out-in"
      >
        <component
          :is="activeComponent"
          v-model:formInstance="formInstance"
          v-model:account="account"
          v-model:password="password"
          v-model:email="email"
          v-model:phone="phone"
          :rememberPass="rememberPass"
        />
      </Transition>
      <div
        class="pass-tool-container"
        v-show="signIn === SignInType.ACCOUNT || signIn === SignInType.EMAIL"
      >
        <el-checkbox v-model="rememberPass" label="记住密码" size="large" />
        <el-button type="text">忘记密码</el-button>
      </div>
      <!-- 表单提交 -->
      <div class="submit">
        <el-button
          type="primary"
          :loading="false"
          size="default"
          class="btn"
          @click="submit(formInstance)"
          >登录</el-button
        >
      </div>
      <!-- 其他登录方式 -->
      <div class="other-login">
        <!-- 账号登录 -->
        <el-tooltip
          effect="light"
          content="账号登录"
          placement="bottom-start"
          v-if="!(signIn === SignInType.ACCOUNT)"
        >
          <el-button circle @click="signInAccount">
            <template #icon>
              <div class="other-login-btn">
                <img :src="icon[SignInType.ACCOUNT]" alt="账号登录" />
              </div>
            </template>
          </el-button>
        </el-tooltip>
        <!-- 手机登录 -->
        <el-tooltip
          effect="light"
          content="手机登录"
          placement="bottom-start"
          v-if="!(signIn === SignInType.PHONE)"
        >
          <el-button circle @click="signInPhone">
            <template #icon>
              <div class="other-login-btn">
                <img :src="icon[SignInType.PHONE]" alt="手机登录" />
              </div>
            </template>
          </el-button>
        </el-tooltip>
        <!-- 邮箱登录 -->
        <el-tooltip
          effect="light"
          content="邮箱登录"
          placement="bottom-start"
          v-if="!(signIn === SignInType.EMAIL)"
        >
          <el-button circle @click="signInEmail">
            <template #icon>
              <div class="other-login-btn">
                <img :src="icon[SignInType.EMAIL]" alt="邮箱登录" />
              </div>
            </template>
          </el-button>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.title {
  text-align: center;
  margin-bottom: 30px;
}

.sign-in-form {
  transition: all 0.5s;
}
.sign-in-container {
  width: 100%;
  overflow: hidden;
  .submit {
    width: 100%;
    .btn {
      width: 100%;
    }
  }

  .other-login {
    width: 100px;
    display: flex;
    justify-content: space-between;
    margin: 25px auto;
    .other-login-btn {
      justify-content: center;
      width: 80%;
      height: 80%;
      transform: scale(1.6);
      font-size: 0;
      > img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
.pass-tool-container {
  margin-top: -20px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
