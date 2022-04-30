<script setup lang="ts">
import { ref } from "vue";
import {
  Monitor,
  Setting,
  Goods,
  ChatLineRound,
} from "@element-plus/icons-vue";

const props = defineProps(["icon"]);
const iconCaseName = ref<string>();
const iconName = props.icon.split("el-icon")[1];
const iconObj = {
  Monitor,
  Setting,
  Goods,
  ChatLineRound,
};
if (iconName.includes("-")) {
  const arr: string[] = iconName
    .split("-")
    .map((item) => `${item.substring(0, 1).toUpperCase()}${item.substring(1)}`);
  iconCaseName.value = arr.join("");
} else {
  iconCaseName.value = iconName;
}
</script>
<template>
  <el-icon>
    <component :is="iconObj[iconCaseName]"></component>
  </el-icon>
</template>
