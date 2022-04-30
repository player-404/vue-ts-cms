<script setup lang="ts">
const props = defineProps({
  options: {
    type: Object,
    default: () => ({}),
  },
  otherOptions: {
    type: Object,
  },
  showColumnIndex: {
    type: Boolean,
    default: false,
  },
  showColumnSelect: {
    type: Boolean,
    default: false,
  },

  tableData: {
    type: Array,
    default: () => [],
  },
  treeOptions: {
    type: Object,
  },
});

const select = (selection) => {
  console.log("selection", selection);
};

const selectAll = (selection) => {
  console.log("selectionall", selection);
};
</script>
<template>
  <div class="table">
    <!-- 头部 -->
    <div class="table-header mb-10" v-if="otherOptions?.showHeader">
      <slot name="header"></slot>
    </div>
    <!-- 表格主体 -->
    <el-table
      :data="props.tableData"
      border
      @select="select"
      @select-all="selectAll"
      v-bind="treeOptions"
    >
      <el-table-column
        type="selection"
        width="50"
        align="center"
        v-if="showColumnSelect"
      />
      <el-table-column
        type="index"
        label="序号"
        width="80"
        align="center"
        v-if="showColumnIndex"
      />
      <el-table-column
        v-bind="item"
        v-for="(item, index) in options"
        :key="index"
        align="center"
        show-overflow-tooltip
      >
        <template #default="scoped" v-if="item.slotName">
          <slot :row="scoped.row" :name="item.slotName">{{
            scoped.row[item.prop]
          }}</slot>
        </template>
      </el-table-column>
    </el-table>
    <!-- 尾部 -->
    <div class="footer" v-if="otherOptions?.showFooter">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.footer-container {
  display: flex;
  flex-wrap: nowrap;
}
</style>
