<script setup lang="ts">
import { defineEmits } from "vue";

const emit = defineEmits(["btnClick"]);
const click = () => {
  emit("btnClick");
};
</script>
<template>
  <button class="my-btn" @click="click">
    <slot />
  </button>
</template>
<style lang="scss" scoped>
.my-btn {
  width: 100px;
  height: 40px;
  border: none;
  border-radius: 4px;
  font: {
    size: 18px;
  }
  color: white;
  background-color: transparent;
  border: 1px solid #fff;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background-color: #409eff;
    border-color: #409eff;
    box-shadow: 0 0 10px rgba($color: #409eff, $alpha: 0.6);
  }
}
</style>
