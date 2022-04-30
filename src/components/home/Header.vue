<script setup lang="ts">
import { Fold, Expand } from "@element-plus/icons-vue";
import { ref } from "vue";
import { useRoute } from "vue-router";
import BreadCrumbs from "@/base-ui/bread-crumbs";

const props = defineProps(["isCollapse"]);
const route = useRoute();
const emit = defineEmits(["update:isCollapse"]);

console.log(route.matched);

const status = ref(props.isCollapse);
const iconClick = () => {
  status.value = !status.value;
  emit("update:isCollapse", status.value);
};
const userManager = () => {
  // TODO: 跳转至用户管理
  console.log("用户管理");
};
const signOut = () => {
  // TODO: 用户退出登录
  console.log("退出登录");
};
</script>
<template>
  <div class="header">
    <div class="left-container">
      <el-icon class="icon" @click="iconClick">
        <Fold v-if="!status" />
        <Expand v-else />
      </el-icon>
      <bread-crumbs class="ml-15" />
    </div>
    <div class="avatar">
      <el-dropdown>
        <div class="avatar-icon">
          <el-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
          <span class="username ml-10">username</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="userManager">用户管理</el-dropdown-item>
            <el-dropdown-item @click="signOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<style scoped lang="scss">
.header {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 7px 10px -13px rgba($color: #000000, $alpha: 0.5);
  .left-container {
    display: flex;
    align-items: center;
    .icon {
      cursor: pointer;
      font-size: 30px;
    }
  }
  .avatar {
    display: flex;
    align-items: center;
    margin-right: 20px;
    cursor: pointer;
    .avatar-icon {
      display: flex;
      align-items: center;
      .username {
        display: inline-block;
        max-width: 100px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
