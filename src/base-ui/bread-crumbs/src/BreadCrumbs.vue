<script setup lang="ts">
import { computed, watchEffect, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { pathMatchBreadcrumbs } from "@/utils/get-user-menu-list";

const store = useStore();
const route = useRoute();
const menu = ref<any[]>([]);
const menus = computed(() => store.getters.menu);
const currentPath = computed(() => route.path);

watchEffect(() => {
  menu.value = [];
  pathMatchBreadcrumbs(menus.value, currentPath.value, menu.value);
});
</script>
<template separator="/">
  <el-breadcrumb>
    <el-breadcrumb-item v-for="(item, index) in menu" :key="index">{{
      item.name
    }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<style lang="scss" scoped></style>
