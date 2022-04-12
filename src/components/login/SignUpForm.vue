<script setup lang="ts">
import SignUpAccountForm from "./SignUpAccountForm.vue";
import SignUpPhone from "./PhoneForm.vue";
import SignUpComplete from "./SignUpComplete.vue";
import SinUpButton from "./SignUpButton.vue";

import { ElNotification } from "element-plus";
import type { FormInstance } from "element-plus";

import { ref, computed } from "vue";
import { useStore } from "vuex";
import { SET_PHONE } from "@/store/type";

const store = useStore();
//步骤条当前步数
const active = ref(0);
const phoneNumber = ref<number>();

const activeComponent = computed(() => {
  return active.value === 0
    ? SignUpAccountForm
    : active.value === 1
    ? SignUpPhone
    : SignUpComplete;
});

//手机验证 上一步按钮触发
const preStep = () => {
  active.value--;
};

//手机验证结果
const phoneValidateStatus = ref(false);

//手机验证表单数据提交
const submit = (formInstance: FormInstance | undefined) => {
  console.log("instance", formInstance);
  formInstance?.validate((valite) => {
    if (valite) {
      // TODO: 手机验证成功，提交账号密码手机号数据
      console.log("注册完成", active.value);

      // 将手机号码存储值 vuex
      store.commit(`login/${SET_PHONE}`, { phone: phoneNumber.value });

      //下一步
      active.value++;

      setTimeout(() => {
        console.log("注册成功");
        phoneValidateStatus.value = true;
        active.value++;
      }, 5000);
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
  <!-- 注册 -->
  <div class="sign-up">
    <h1 class="title mb-35">注册</h1>
    <!-- 步骤条 -->
    <div class="step">
      <el-steps
        :space="200"
        :active="active"
        finish-status="success"
        align-center
      >
        <el-step title="输入账号" />
        <el-step title="手机验证" />
        <el-step title="注册完成" />
      </el-steps>
    </div>
    <!-- 注册表单 -->
    <!-- <Transition
      enter-active-class="animate__animated animate__fadeInRight"
      leave-active-class="animate__animated animate__fadeOutLeft"
      appear
      mode="out-in"
    > -->
    <div class="sign-up-form-container mt-30">
      <component
        :is="activeComponent"
        v-model:step="active"
        v-slot="slotProps"
        :phoneValidateStatus="phoneValidateStatus"
        v-model:phone="phoneNumber"
      >
        <sin-up-button
          v-if="active === 1"
          @preStep="preStep"
          @submit="submit(slotProps.formInstance)"
          class="mt-25"
        />
      </component>
    </div>
    <!-- </Transition> -->
  </div>
</template>
<style lang="scss" scoped>
.sign-up {
  width: 100%;
  .title {
    text-align: center;
  }
  .step {
    width: 100%;
    transform: scale(0.9);
  }
  .sign-up-form-container {
    width: 100%;
    height: 270px;
    display: flex;
    justify-content: center;
  }
  .v-move {
    position: absolute;
  }
}

.v-enter-active {
  animation: back 0.5s linear;
}

.v-leave-active {
  animation: leave 0.5s linear;
}
@keyframes leave {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-400px);
  }
}
@keyframes back {
  0% {
    transform: translateX(-400px);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
