<script setup lang="ts">
import PageContent from "@/components/page-content";
import PageSearch from "@/components/page-search";
import itemOptions from "../config/role-search.config";
import options from "../config/role-list.config";
import { useSetListData } from "@/hooks/set-list-data";
const { pageContentRef, resetHandler, searchHandler } = useSetListData();
</script>
<template>
  <page-search
    :options="itemOptions"
    @reset="resetHandler"
    @search="searchHandler"
  />
  <page-content ref="pageContentRef" :config="options" pageName="role" />
</template>
