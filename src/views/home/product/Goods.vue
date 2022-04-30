<script setup lang="ts">
import PageContent from "@/components/page-content";
import PageSearch from "@/components/page-search";
import listOptions from "../config/goods-list.config";
import searchOptions from "../config/goods-search.config";
import { useSetListData } from "@/hooks/set-list-data";
const { pageContentRef, resetHandler, searchHandler } = useSetListData();
</script>
<template>
  <page-search
    :options="searchOptions"
    @reset="resetHandler"
    @search="searchHandler"
  />
  <page-content ref="pageContentRef" :config="listOptions" pageName="goods">
    <template #image="{ row }">
      <el-image
        :src="row.imgUrl"
        fit="cover"
        style="width: 60px; height: 60px"
        :preview-src-list="[row.imgUrl]"
        :preview-teleported="true"
      ></el-image>
    </template>
    <template #status="{ row }">
      <el-button plain :type="row.status == 1 ? 'success' : 'danger'">{{
        row.status == 1 ? "启用" : "禁用"
      }}</el-button>
    </template>
  </page-content>
</template>
<style lang="scss"></style>
