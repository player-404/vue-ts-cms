<script setup lang="ts">
const emit = defineEmits(["preStep", "submit"]);
const preStep = () => {
  emit("preStep");
};

const submit = () => {
  emit("submit");
};
</script>
<template>
  <div class="sign-up-button">
    <el-button style="width: 110px" @click="preStep">上一步</el-button>
    <el-button style="width: 110px" type="primary" @click="submit()"
      >提交</el-button
    >
  </div>
</template>
<style lang="scss"></style>
