<script setup lang="ts">
import SearchForm from "@/base-ui/searchForm";
import { RefreshLeft, Search } from "@element-plus/icons-vue";
import { ref } from "vue";
const props = defineProps({
  options: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["search", "reset"]);
const originFormData = {};
const formData = ref({});
props.options.itemOptions.forEach((item) => {
  originFormData[item.filed] = "";
});

formData.value = originFormData;

const resetFormData = () => {
  for (let key in formData.value) {
    formData.value[key] = originFormData[key];
  }
  emit("reset", formData);
};

const search = () => {
  console.log(formData.value);
  emit("search", formData);
};
</script>
<template>
  <search-form :options="options" v-model:formData="formData">
    <template #header>高级检索</template>
    <template #footer>
      <el-button :icon="RefreshLeft" @click="resetFormData">重置</el-button>
      <el-button type="primary" :icon="Search" @click="search">搜索</el-button>
    </template>
  </search-form>
</template>
<style lang="scss" scoped></style>
