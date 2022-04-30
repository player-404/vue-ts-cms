<script setup lang="ts">
import pageSearch from "@/components/page-search";
import PageContent from "@/components/page-content";
import searchConfig from "../config/menu-search.config";
import listConfig from "../config/menu-list.config";
import { useSetListData } from "@/hooks/set-list-data";
const { pageContentRef, resetHandler, searchHandler } = useSetListData();
</script>
<template>
  <page-search
    :options="searchConfig"
    @reset="resetHandler"
    @search="searchHandler"
  />
  <page-content ref="pageContentRef" :config="listConfig" pageName="menu" />
</template>
<style lang="scss"></style>
