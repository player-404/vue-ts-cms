<script setup lang="ts">
import ZpButton from "./ZpButton.vue";

const props = defineProps({
  modelValue: Boolean,
  titles: {
    type: String,
    default: "没有账号？",
  },
  msg: {
    type: String,
    default: "快来加入我们吧～",
  },
  btnTitle: {
    type: String,
    default: "注册",
  },
});

const emit = defineEmits(["update:modelValue"]);
const switchs = () => {
  emit("update:modelValue", !props.modelValue);
};
</script>
<template>
  <div class="tip-message">
    <h2 class="title">{{ titles }}</h2>
    <p class="no-account">{{ msg }}</p>
    <zp-button @btnClick="switchs" class="">{{ btnTitle }}</zp-button>
  </div>
</template>
<style lang="scss" scoped>
.tip-message {
  text-align: center;
  color: #fff;
  .title {
    text-align: center;
  }
  .no-account {
    text-align: center;
  }
}
</style>
