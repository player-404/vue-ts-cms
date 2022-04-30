<script setup lang="ts">
import ZpTable from "@/base-ui/table-content";
import { useStore } from "vuex";
import { computed, ref } from "vue";
import { useFormatTime } from "@/utils/format-time";
import usePermission from "@/hooks/use-permission";
const props = defineProps({
  config: {
    type: Object,
    required: true,
  },
  pageName: {
    type: String,
    required: true,
  },
  queryConfig: {
    type: Object,
    default: () => ({ offset: 0, size: 10 }),
  },
  pageSize: {
    type: Number,
    default: 10,
  },
});
const currentPage = ref(1);
const queryObj = ref(props.queryConfig);
const store = useStore();
const currentPageSize = ref(props.pageSize);
// 表数据
const data = computed(() => {
  return props.pageName === "users"
    ? store.getters.userData
    : props.pageName === "role"
    ? store.getters.roleData
    : props.pageName === "goods"
    ? store.getters.goodsData
    : props.pageName === "menu"
    ? store.getters.menuData
    : store.getters.departmentData;
});

// 向外暴露指定的插槽
const otherSlots = computed(() => {
  return props.config.options.filter((item) => {
    if (item.slotName === "createAt") return false;
    if (item.slotName === "updateAt") return false;
    if (item.slotName === "tool") return false;
    if (!item.slotName) return false;
    return true;
  });
});

// 获取页面权限
const permission = store.getters.permission;
// 查询权限
const canQuery = usePermission(permission, props.pageName, "query");
const canDelete = usePermission(permission, props.pageName, "delete");
const canUpdate = usePermission(permission, props.pageName, "update");
// 获取页面数据
const getListData = (query?: any, offset = 0, size = 10) => {
  // 没有查询权限则不查询数据
  if (!canQuery) return [];
  queryObj.value.offset = offset;
  queryObj.value.size = size;
  console.log("queryObj", queryObj.value);
  store.dispatch("system/pageContentData", {
    queryConfig: {
      ...queryObj.value,
      ...query,
    },
    pageName: props.pageName,
  });
};

getListData();

//表右按钮触发
const headerBtnHandler = () => {
  console.log("header btn handler is click");
};
// 每页数据条数
const sizeChange = (size) => {
  getListData({}, 0, size);
};
// 当前页面
const currentChange = (currentPage) => {
  const offset = (currentPage - 1) * currentPageSize.value;
  console.log("offset", offset, "size", currentPageSize.value);
  getListData({}, offset, currentPageSize.value);
};
// setup 语法需要使用该方法暴露属性或方法，否则无法在外部访问组件内部的属性或方法
defineExpose({ getListData });
</script>
<template>
  <zp-table
    v-bind="props.config"
    :tableData="data.list"
    :footer="{ show: true }"
    class="content"
  >
    <template #header>
      <span class="title">{{ config.otherOptions.title }}</span>
      <el-button
        type="primary"
        @click="headerBtnHandler"
        v-if="config.otherOptions.btnText"
        >{{ config.otherOptions.btnText }}</el-button
      >
    </template>
    <template #createAt="{ row }">{{ useFormatTime(row.createAt) }}</template>

    <template #updateAt="{ row }">{{ useFormatTime(row.updateAt) }}</template>
    <template #tool>
      <el-button plain size="small" type="primary" v-if="canUpdate"
        >编辑</el-button
      >
      <el-button plain size="small" type="danger" v-if="canDelete"
        >删除</el-button
      >
    </template>
    <template #footer>
      <div class="footer mt-20">
        <el-pagination
          v-model:currentPage="currentPage"
          v-model:page-size="currentPageSize"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="data.count"
          @size-change="sizeChange"
          @current-change="currentChange"
        />
      </div>
    </template>
    <template
      v-for="item in otherSlots"
      :key="item.prop"
      v-slot:[item.slotName]="{ row }"
    >
      <template v-if="item.slotName">
        <slot :row="row" :name="item.slotName"></slot>
      </template>
    </template>
  </zp-table>
</template>
<style lang="scss" scoped>
.title {
  font-size: 26px;
  font-weight: bold;
}
.footer {
  display: flex;
  justify-content: center;
}
.content {
  margin-top: 100px;
  padding-bottom: 50px;
}
</style>
