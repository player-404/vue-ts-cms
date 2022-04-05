<script setup lang="ts">
import { reactive, ref } from "vue";
import { UserFilled, Lock } from "@element-plus/icons-vue";
import type { FormInstance } from "element-plus";

// 提交按钮l oading
const loading = ref(false);

//表单实例
const signUpFormInstance = ref<FormInstance>();

// 步骤条 active
const props = defineProps(["step"]);
console.log(props.step);

const emit = defineEmits(["update:step"]);

//表单数据
const signUpData = reactive({
  account: "",
  password: "",
  confirmPassword: "",
});

// 账号验证规则
const validateAccount = (rule: any, value: any, callback: any) => {
  const reg = /^[a-zA-Z]\w{4,15}$/;
  if (!value) callback(new Error("账号不不能为空"));
  if (!reg.test(value))
    callback(new Error("字母开头，5-16位，字母数字下划线组合"));
  callback();
};

//密码验证规则
const validatePassword = (rule: any, value: any, callback: any) => {
  const reg = /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])\S*$/;
  if (!value) callback(new Error("密码不能为空"));
  if (!reg.test(value)) {
    return callback(new Error("密码至少6位，包含大小写字母及数字"));
  }
  callback();
};

//确认密码验证规则
const validateConofirmPassoword = (rule: any, value: any, callback: any) => {
  if (!value) callback(new Error("确认密码不能为空"));
  if (value != signUpData.password) {
    return callback(new Error("两次密码不一致"));
  }
  callback();
};

//表单验证规则
const rules = reactive({
  account: [{ validator: validateAccount, trigger: "change" }],
  password: [{ validator: validatePassword, trigger: "change" }],
  confirmPassword: [
    { validator: validateConofirmPassoword, trigger: "change" },
  ],
});

//提交表单
const submit = (formInstance: FormInstance | undefined) => {
  emit("update:step", props.step + 1);
  // loading.value = true;
  // if (!formInstance) {
  //   loading.value = false;
  //   return;
  // }

  // formInstance.validate((valid) => {
  //   if (valid) {
  //     console.log("表单提交成功");
  //     loading.value = false;

  //     emit("update:step", props.step + 1);
  //   } else {
  //     loading.value = false;
  //     return false;
  //   }
  // });
};
</script>
<template>
  <!-- 账号注册表单 -->
  <div class="sign-up-account">
    <el-form :model="signUpData" :rules="rules" ref="signUpFormInstance">
      <!-- 账号 -->
      <el-form-item prop="account">
        <el-input
          v-model="signUpData.account"
          dsfdsdfsdf
          input-style="width: 250px"
          :prefix-icon="UserFilled"
          size="default"
          placeholder="请输入你的账号"
          clearable
        ></el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item prop="password">
        <el-input
          v-model="signUpData.password"
          :prefix-icon="Lock"
          type="password"
          clearable
          input-style="width: 250px"
          placeholder="请输入你的密码"
        ></el-input>
      </el-form-item>
      <!-- 确认密码 -->
      <el-form-item prop="confirmPassword">
        <el-input
          v-model="signUpData.confirmPassword"
          input-style="width: 250px"
          :prefix-icon="Lock"
          size="default"
          placeholder="请输入你的确认密码"
          type="password"
          clearable
        ></el-input>
      </el-form-item>
      <!-- 提交 -->
      <el-form-item>
        <div class="submit">
          <el-button
            type="primary"
            style="width: 100%"
            :loading="loading"
            @click="submit(signUpFormInstance)"
            >注册</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<style lang="scss" scoped>
.sign-up-account {
  height: 270px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .submit {
    width: 100%;
  }
}
:deep .el-form-item {
  padding-bottom: 10px;
}
</style>
