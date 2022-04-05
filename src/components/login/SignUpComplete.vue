<script setup lang="ts">
const props = defineProps(["step"]);
</script>
<template>
  <div class="sign-up-complete">
    <el-row>
      <el-col>
        <el-result
          icon="success"
          title="注册成功"
          sub-title="点击登录按钮立即登录吧~"
        >
          <template #extra>
            <el-button type="primary">立即登录</el-button>
          </template>
        </el-result>
      </el-col>
    </el-row>
  </div>
</template>
<style lang="scss" scoped>
.sign-up-complete {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>
