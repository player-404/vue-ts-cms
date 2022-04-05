<script setup lang="ts">
import { ref } from "vue";

import FormContainer from "component/login/FormContainer.vue";
import SwitchForm from "./SwitchForm.vue";
import SignInForm from "./SignInForm.vue";
import SignUpForm from "./SignUpForm.vue";

// 切换登录方式 false: 登录   true: 注册
const status = ref<boolean>(false);
</script>
<template>
  <div class="login-form">
    <div class="containers" :class="{ move: status }">
      <!-- 登录页面 -->
      <form-container>
        <Transition
          leave-active-class="animate__animated animate__rotateOutDownLeft animate__faster"
          enter-active-class="animate__animated animate__rotateInUpLeft animate__faster"
        >
          <sign-in-form v-show="!status" />
        </Transition>
      </form-container>
      <!-- // 页面切换 -->
      <form-container>
        <div class="switch-form" :class="{ move: status }">
          <TransitionGroup
            enter-active-class="animate__animated animate__fadeInUp"
            leave-active-class="animate__animated animate__fadeOutDown"
          >
            <!-- 登录提示界面 -->
            <switch-form
              v-model="status"
              v-if="!status"
              class="switch"
              key="1"
            />
            <!-- 注册提示界面 -->
            <switch-form
              v-model="status"
              titles="已有账号？"
              msg="登录，纵享丝滑～"
              btnTitle="登录"
              class="switch"
              v-else
              key="2"
            />
          </TransitionGroup>
        </div>
      </form-container>
      <!-- 注册页面 -->
      <form-container>
        <Transition
          enter-active-class="animate__animated animate__lightSpeedInRight"
          leave-active-class="animate__animated animate__fadeOutLeft"
          typ="transition"
        >
          <sign-up-form v-if="status" />
        </Transition>
      </form-container>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.login-form {
  width: 800px;
  height: 530px;
  box-shadow: 0 0 20px rgba($color: #000000, $alpha: 0.5);
  border-radius: 10px;
  display: flex;
  overflow: hidden;
  .containers {
    //开启硬件加速
    transform: translateZ(0);
    white-space: nowrap;
    height: 100%;
    display: flex;
    transition: all 0.5s;
    &.move {
      transform: translateX(-400px);
    }
    .switch-form {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      background: url("http://img.zphlplay.top/vue-ts-cms/bg.jpg") no-repeat;
      background-position: center right 38%;
      transition: all 0.5s;
      &.move {
        background-position: center left;
      }
      .switch {
        position: absolute;
      }
    }
  }
}
</style>
