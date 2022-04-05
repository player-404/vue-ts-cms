<script setup lang="ts"></script>
<template>
  <div class="form-container">
    <slot />
  </div>
</template>
<style lang="scss" scoped>
.form-container {
  width: 400px;
  height: 100%;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 10px;
  box-sizing: border-box;
}
</style>
