<script setup lang="ts">
import SignUpAccountForm from "./SignUpAccountForm.vue";
import SignUpPhone from "./SignUpPhone.vue";
import SignUpComplete from "./SignUpComplete.vue";

import { ref, computed } from "vue";
const active = ref(1);

const activeComponent = computed(() => {
  return active.value === 1
    ? SignUpAccountForm
    : active.value === 2
    ? SignUpPhone
    : SignUpComplete;
});
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
    <component :is="activeComponent" v-model:step="active" />
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
