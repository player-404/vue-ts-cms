<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import type { FormInstance } from "element-plus";
import { UserFilled, Lock } from "@element-plus/icons-vue";

const props = defineProps([
  "formInstance",
  "account",
  "password",
  "rememberPass",
]);
const emit = defineEmits([
  "update:formInstance",
  "update:account",
  "update:password",
]);
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
  password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
});

console.log("props account", props.account);
if (props.account) {
  signInFormData.account = ref(props.account);
}

if (props.password) {
  signInFormData.password = ref(props.password);
}

const accountChange = () => {
  emit("update:account", signInFormData.account);
};
const passwordChange = () => {
  emit("update:password", signInFormData.password);
};
onMounted(() => {
  emit("update:formInstance", signInForm.value);
});
</script>
<template>
  <div class="account-form">
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
          @input="accountChange"
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
          @input="passwordChange"
        />
      </el-form-item>
    </el-form>
  </div>
</template>
<style lang="scss" scoped>
:deep(.el-form-item) {
  padding-bottom: 10px;
}
</style>
