<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";

import type { FormInstance } from "element-plus";

defineProps(["formInstance", "email", "password"]);
const emit = defineEmits([
  "update:formInstance",
  "update:email",
  "update:password",
]);

const formInstance = ref<FormInstance>();
const formData = reactive({
  email: "",
  password: "",
});

const emailValidate = (rules: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error("邮箱不能为空"));
    return;
  }

  if (!rules.rule.test(value)) {
    callback(new Error("邮箱格式错误"));
    return;
  }

  callback();
};
const passValidate = (rules: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error("密码不能为空"));
    return;
  }
};
const rules = reactive({
  email: [
    {
      validator: emailValidate,
      trigger: "blur",
      rule: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },
  ],
  password: [{ validator: passValidate, trigger: "blur" }],
});

const emailChange = (e: any) => {
  emit("update:email", e.target.value);
};
const passwordChange = (e: any) => {
  emit("update:password", e.target.value);
};

onMounted(() => {
  emit("update:formInstance", formInstance.value);
});
</script>
<template>
  <div class="email-form">
    <el-form :model="formData" :rules="rules" ref="formInstance">
      <el-form-item prop="email">
        <el-input
          type="text"
          placeholder="请输入你的邮箱"
          clearable
          input-style="width: 250px"
          v-model="formData.email"
          @input="emailChange"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          show-password
          clearable
          placeholder="请输入你的密码"
          input-style="width: 250px"
          v-model="formData.password"
          @input="passwordChange"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<style lang="scss" scoped>
:deep(.el-form-item) {
  padding-bottom: 10px;
}
</style>
