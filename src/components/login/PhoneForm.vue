<script setup lang="ts">
import type { FormInstance } from "element-plus";

import { ElNotification } from "element-plus";

import { ref, reactive, computed, watch, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();
defineProps(["formInstance", "phone"]);
const emit = defineEmits(["update:formInstance", "update:phone"]);

//发送的验证码
const code = computed<number>(() => store.state.login.code);
//手机号码验证状态
const phoneCheckStatus = ref<boolean>(true);
//表单数据
const formData = reactive<{
  phoneNumber: number | undefined;
  authCode: number | undefined;
}>({
  phoneNumber: undefined,
  authCode: undefined,
});

//手机验证表单实例
const phoneForm = ref<FormInstance>();

// 获取验证码的消息
const getCodeMsg = ref("获取验证码");

//倒计时时间
const time = ref(60);

// 手机号码验证规则
const validatePhoneNumber = (rule: any, value: any, callback: any) => {
  if (!value) {
    phoneCheckStatus.value = false;
    callback(new Error("手机号码不能为空"));
    return;
  }
  if (!Number.isInteger(value)) {
    phoneCheckStatus.value = false;
    callback(new Error("请输入正确的手机号"));
    return;
  }
  if (!rule.rule.test(value)) {
    phoneCheckStatus.value = false;
    callback(new Error("手机号码格式错误"));
    return;
  }
  phoneCheckStatus.value = true;
  callback();
};

// 验证码验证
const validateAuthCode = (rule: any, value: any, callback: any) => {
  if (!value) callback(new Error("请输入验证码"));
  if (value !== code.value) callback(new Error("验证码输入错误"));
  callback();
};

//手机表单验证规则
const rules = reactive({
  phoneNumber: [
    {
      validator: validatePhoneNumber,
      trigger: "change",
      rule: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/,
    },
  ],
  authCode: [{ validator: validateAuthCode, trigger: "change" }],
});

//双向数据绑定phone
const phoneChange = () => {
  emit("update:phone", formData.phoneNumber);
};

//获取验证码
const getCode = () => {
  if (!formData.phoneNumber) {
    ElNotification({
      title: "手机号码不能为空",
      message: "请输入手机号码",
      type: "warning",
      duration: 2000,
    });
    return;
  } else if (!phoneCheckStatus.value) {
    ElNotification({
      title: "手机号码格式不正确",
      message: "请输入正确的手机号码",
      type: "warning",
      duration: 2000,
    });
    return;
  }
  getCodeMsg.value = `${time.value}秒后重试`;
  countDown();
  // 发送请求获取验证码
  //TODO:发送获取验证码请求
  store
    .dispatch("login/getCode")
    .then(() => {
      console.log("数据发送成功");
      ElNotification({
        title: "发送成功",
        message: "验证码已发送至手机",
        type: "success",
        duration: 1000,
      });

      // 更新手机号码数据
      emit("update:phone", formData.phoneNumber);
    })
    .catch(() => {
      console.log("数据请求失败");
      ElNotification({
        title: "出错了",
        message: "验证码发送失败，请稍后再试",
        type: "error",
        duration: 1000,
      });
    });
};

//验证码提示
watch(code, (newv) => {
  ElNotification({
    type: "info",
    title: "验证码",
    message: `${newv}`,
  });
});

//倒计时
const countDown = () => {
  const timer = setInterval(() => {
    if (time.value === 0) {
      time.value = 60;
      clearInterval(timer);
      getCodeMsg.value = "重新获取";
      return;
    }
    time.value--;
    getCodeMsg.value = `${time.value}秒后重试`;
  }, 1000);
};

onMounted(() => {
  emit("update:formInstance", phoneForm.value);
});
</script>
<template>
  <div class="signUpPhone">
    <el-form
      class="phone-form"
      ref="phoneForm"
      :rules="rules"
      :model="formData"
    >
      <!-- 手机号 -->
      <el-form-item prop="phoneNumber">
        <el-input
          placeholder="请输入你的手机号"
          input-style="width: 250px"
          v-model.number="formData.phoneNumber"
          @input="phoneChange"
        ></el-input>
      </el-form-item>
      <!-- 验证码 -->
      <el-form-item prop="authCode">
        <el-input
          placeholder="验证码"
          input-style="width: 134px"
          v-model.number="formData.authCode"
        ></el-input>
        <el-button @click="getCode" :disabled="time != 60" class="code-btn">{{
          getCodeMsg
        }}</el-button>
      </el-form-item>
    </el-form>
    <!-- 按钮插槽 -->
    <slot :formInstance="phoneForm"></slot>
  </div>
</template>
<style lang="scss" scoped>
.signUpPhone {
  .phone-form {
    width: 250px;
    display: block;
    margin: 0 auto;
    :deep(.el-form-item__content) {
      justify-content: space-between;
    }
    .code-btn {
      width: 105px;
    }
  }
}
:deep(.el-form-item) {
  padding-bottom: 10px;
}
</style>
