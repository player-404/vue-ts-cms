<script setup lang="ts">
import type { FormInstance } from "element-plus";

import { ElNotification } from "element-plus";

import { ref, reactive, computed, watch } from "vue";
import { useStore } from "vuex";

const props = defineProps(["step"]);
const emit = defineEmits(["update:step"]);
const store = useStore();

//发送的验证码
const code = computed<number>(() => store.state.login.code);

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
  if (!value) callback(new Error("手机号码不能为空"));
  if (!Number.isInteger(value)) callback(new Error("请输入正确的手机号"));
  if (!rule.rule.test(value)) callback(new Error("手机号码格式错误"));
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

//获取验证码
const getCode = () => {
  getCodeMsg.value = `${time.value}秒后重试`;
  countDown();
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

//返回上一步
const preStep = () => {
  emit("update:step", props.step - 1);
};

// 提交验证数据
const submit = (phoneForms: FormInstance | undefined) => {
  phoneForms?.validate((valite) => {
    if (valite) {
      emit("update:step", props.step + 1);
    } else {
      ElNotification({
        title: "验证失败",
        message: "手机验证失败，请重试",
        type: "warning",
      });
    }
  });
};
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
      <el-form-item>
        <el-button style="width: 110px" @click="preStep">上一步</el-button>
        <el-button
          style="width: 110px"
          type="primary"
          @click="submit(phoneForm)"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<style lang="scss" scoped>
.signUpPhone {
  height: 270px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
</style>
