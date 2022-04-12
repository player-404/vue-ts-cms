<script setup lang="ts">
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();

const account = computed(() => store.state.login.account);
const password = computed(() => store.state.login.password);
const phone = computed(() => store.state.login.phone);
const signIn = () => {
  // TODO：注册完成，点击登录按钮发送登录请求
  console.log("account:", account.value);
  console.log("password:", password.value);
  console.log("phone", phone.value);
  // TODO: 登录后页面跳转
};
</script>
<template>
  <div class="sign-up-success">
    <el-row>
      <el-col>
        <el-result
          icon="success"
          title="注册成功"
          sub-title="点击登录按钮立即登录吧~"
        >
          <template #extra>
            <el-button type="primary" @click="signIn">登录</el-button>
          </template>
        </el-result>
      </el-col>
    </el-row>
  </div>
</template>
<style lang="scss" scoped></style>
