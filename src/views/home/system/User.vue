<script setup lang="ts">
import PageSearch from "@/components/page-search";
import PageContent from "@/components/page-content";
import config from "../config/user-list.config";
import userConfig from "../config/search-form.config";
import { useSetListData } from "@/hooks/set-list-data";
import { nextTick } from "vue";
const { pageContentRef, resetHandler, searchHandler } = useSetListData();
nextTick(() => {
  console.log(pageContentRef.value);
});
</script>
<template>
  <page-search
    :options="userConfig"
    @reset="resetHandler"
    @search="searchHandler"
  />
  <page-content ref="pageContentRef" :config="config" pageName="users">
    <template #enable="{ row }">
      <el-button plain :type="row.enable == 1 ? 'success' : 'danger'">{{
        row.enable == 1 ? "启用" : "禁用"
      }}</el-button>
    </template>
  </page-content>
</template>
<style lang="scss" scoped></style>
