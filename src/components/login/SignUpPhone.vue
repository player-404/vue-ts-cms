<script setup lang="ts">
const props = defineProps(["step"]);
const emit = defineEmits(["update:step"]);

const preStep = () => {
  emit("update:step", props.step - 1);
};
const submit = () => {
  emit("update:step", props.step + 1);
};
</script>
<template>
  <div class="signUpPhone">
    <el-form class="phone-form">
      <el-form-item>
        <el-input
          placeholder="请输入你的手机号"
          input-style="width: 250px"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="验证码" input-style="width: 140px"></el-input>
        <el-button class="ml-8">获取验证码</el-button>
      </el-form-item>
      <el-form-item>
        <el-button style="width: 110px" @click="preStep">上一步</el-button>
        <el-button style="width: 110px" type="primary" @click="submit"
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
  }
}
</style>
