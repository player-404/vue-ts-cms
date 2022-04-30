<script lang="ts" setup>
import { ref } from "vue";
import Headers from "@/components/home/Header.vue";
import SlideMenu from "@/components/home/SlideMenu.vue";
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
const isCollapse = ref<boolean>(false);
</script>
<template>
  <el-container>
    <!-- 侧边菜单导航 -->
    <el-aside :width="isCollapse ? '60px' : '210px'">
      <slide-menu :isCollapse="isCollapse" />
    </el-aside>
    <el-container>
      <!-- 头 -->
      <el-header>
        <headers v-model:isCollapse="isCollapse" />
      </el-header>
      <!-- 主体 -->
      <el-main>
        <div class="main-container">
          <el-config-provider :locale="zhCn">
            <router-view />
          </el-config-provider>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.el-container {
  height: 100%;
}
.el-aside {
  transition: width 0.3s;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
}
.main-container {
  width: 100%;
  height: 100%;
}
</style>
