<script setup lang="ts">
import { ref, watch } from "vue";

import { Check } from "@element-plus/icons-vue";

const props = defineProps(["resultStatus"]);
const percentage = ref(0);
const status = ref("");

const timer = setInterval(() => {
  percentage.value < 99 ? percentage.value++ : 99;
}, 300);
watch(
  () => props,
  (newv) => {
    if (newv.resultStatus) {
      percentage.value = 100;
      status.value = "success";
      clearInterval(timer);
    }
  },
  { deep: true }
);
</script>
<template>
  <div class="progress">
    <el-progress
      type="circle"
      :percentage="percentage"
      :indeterminate="true"
      :duration="15"
      :status="status"
    >
      <el-button
        type="success"
        :icon="Check"
        circle
        v-if="props.resultStatus"
      ></el-button>
      <template #default="{ percentage }" tag="div" v-if="!props.resultStatus">
        <span class="percentage-value">{{ percentage }}%</span>
        <span class="percentage-label">注册中...</span>
      </template>
    </el-progress>
  </div>
</template>
<style lang="scss" scoped>
.percentage-value {
  display: block;
  margin-top: 10px;
  font-size: 28px;
}
.percentage-label {
  display: block;
  margin-top: 10px;
  font-size: 12px;
}
</style>
