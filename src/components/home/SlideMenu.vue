<script lang="ts" setup>
import { useStore } from "vuex";
import ItemIcon from "./ItemIcon.vue";
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";

const props = defineProps(["isCollapse"]);
const store = useStore();
const router = useRouter();
const route = useRoute();
const menus = store.getters.menu;
const activeMenu = computed(() => route.path);
const itemClick = (url: string) => {
  console.log("url", url);
  router.push({ path: url });
};
</script>
<template>
  <div class="slider-container">
    <div class="logo">
      <img src="http://img.zphlplay.top/vue-ts-cms/CMS2.png" alt="logo" />
      <span class="ml-20">管理中心</span>
    </div>
    <el-menu
      :default-active="activeMenu"
      :collapse="props.isCollapse"
      background-color="#304156"
      class="el-menu-container"
      text-color="#bfcbd9"
    >
      <template v-for="(item, index) in menus" :key="item.id">
        <!-- 一级菜单 -->
        <el-sub-menu v-if="item.type === 1" :index="`${index}`">
          <template #title>
            <item-icon :icon="item.icon" />
            <span class="ml-5">{{ item.name }}</span>
          </template>
          <!-- 二级菜单 -->
          <el-menu-item
            v-for="item1 in item.children"
            :index="item1.url"
            :key="item1.id"
            class="item"
            @click="itemClick(item1.url)"
          >
            {{ item1.name }}
          </el-menu-item>
        </el-sub-menu>
        <!-- 一级菜单 -->
        <el-menu-item v-else :index="`${index}`" @click="itemClick(item.url)">
          <template #title>
            <item-icon :icon="item.icon" />
            <span>{{ item.name }}</span>
          </template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
<style scoped lang="scss">
.slider-container {
  height: 100%;
  box-sizing: border-box;
  .logo {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    background-color: #304156;
    flex-wrap: nowrap;

    img {
      width: 40px;
      height: 40px;
      flex-shrink: 0;
      margin-left: 12px;
    }
    span {
      color: #bfcbd9;
      font-size: 26px;
      font-weight: bold;
      word-wrap: normal;
      flex-shrink: 0;
      margin-left: 10px;
    }
  }

  .el-menu-container {
    width: 210px;
    height: calc(100% - 60px);
    .el-menu {
      border-right: none;
      .item {
        background-color: #1f2d3d;
        &:hover {
          background-color: #001528;
        }
      }
    }
  }
}
</style>
