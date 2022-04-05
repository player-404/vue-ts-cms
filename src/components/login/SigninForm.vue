<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormInstance } from "element-plus";
import { UserFilled, Lock } from "@element-plus/icons-vue";

//表单实例
const signInForm = ref<FormInstance>();

//表单数据
const signInFormData = reactive({
  account: "",
  password: "",
});

//验证规则
const rules = reactive({
  account: [{ required: true, message: "账号不能为空", trigger: "blur" }],
  password: [{ required: true, message: "请输入你的密码", trigger: "blur" }],
});

//提交表单
const submit = (formInstance: FormInstance | undefined) => {
  if (!formInstance) return;
  formInstance.validate((valit) => {
    if (valit) {
      console.log("表单提交成功");
    } else {
      return false;
    }
  });
};
</script>
<template>
  <div id="sing-in-form">
    <h1 class="title">登录</h1>
    <el-form ref="signInForm" :model="signInFormData" :rules="rules">
      <!-- 账号 -->
      <!-- prop: 需要验证的数据 -->
      <el-form-item prop="account">
        <el-input
          v-model="signInFormData.account"
          placeholder="请输入你的账号"
          size="default"
          input-style="width: 250px"
          clearable
          :prefix-icon="UserFilled"
          status-icon
        />
      </el-form-item>
      <!-- 密码 -->
      <el-form-item prop="password">
        <el-input
          v-model="signInFormData.password"
          placeholder="请输入你的密码"
          type="password"
          show-password
          clearable
          :prefix-icon="Lock"
        />
      </el-form-item>
      <!-- 提交表单 -->
      <el-form-item>
        <div class="submit">
          <el-button
            type="primary"
            :loading="false"
            size="default"
            class="btn"
            @click="submit(signInForm)"
            >登录</el-button
          >
        </div>
      </el-form-item>
      <!-- 其他登录方式 -->
      <el-form-item class="other-login mt-15">
        <!-- 手机登录 -->
        <el-button circle class="mr-15">
          <template #icon>
            <div class="other-login-btn">
              <img
                src="http://img.zphlplay.top/vue-ts-cms/iphone.png"
                alt="手机登录"
              />
            </div>
          </template>
        </el-button>
        <!-- 邮箱登录 -->
        <el-button circle class="ml-15">
          <template #icon>
            <div class="other-login-btn">
              <img
                src="http://img.zphlplay.top/vue-ts-cms/email-lock.png"
                alt="邮箱登录"
              />
            </div>
          </template>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style lang="scss" scoped>
.title {
  text-align: center;
  margin-bottom: 30px;
}
.submit {
  width: 100%;
  .btn {
    width: 100%;
  }
}

.other-login-btn {
  width: 80%;
  height: 80%;
  transform: scale(1.6);
  > img {
    width: 100%;
    height: 100%;
  }
}
:deep(.el-form-item__content) {
  justify-content: center;
}
:deep(.el-form-item) {
  padding-bottom: 10px;
}
</style>
