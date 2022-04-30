<script setup lang="ts">
import { watch, reactive } from "vue";

const props = defineProps({
  layout: {
    type: Object,
    default: () => ({
      xs: 24,
      sm: 12,
      lg: 8,
      xl: 6,
    }),
  },
  itemStyle: {
    type: Object,
    default: () => ({
      padding: "10px 20px",
    }),
  },
  options: {
    type: Object,
    reuqire: true,
  },
  labelWidth: {
    type: String,
    default: "100px",
  },
  formData: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});

const emit = defineEmits(["update:formData"]);
const data = reactive({ ...props.formData });

watch(data, (newv) => {
  console.log(1);
  emit("update:formData", newv);
});
</script>
<template>
  <div class="search-form mt-10">
    <!-- 标题 -->
    <div class="header mb-20">
      <slot name="header"></slot>
    </div>
    <el-form
      label-position="right"
      :label-width="props.labelWidth"
      size="default"
      :model="data"
    >
      <el-row>
        <el-col
          v-bind="props.layout"
          v-for="(item, index) in props.options.itemOptions"
          :key="index"
        >
          <el-form-item
            :label="item.label || '用户名'"
            class="form-item"
            :style="props.itemStyle"
          >
            <!-- 普通输入框 -->
            <el-input
              v-if="item.type === 'input'"
              :show-password="item['show-password']"
              :placeholder="item.placeholder"
              v-model="data[item.filed]"
            ></el-input>
            <!-- 选择器 -->
            <el-select
              v-else-if="item.type === 'select'"
              :placeholder="item.placeholder"
              style="width: 100%"
              :model-value="formData[item.filed]"
              v-model="data[item.filed]"
            >
              <el-option
                width="100%"
                v-for="option in item.options"
                :key="option.label"
                :label="option.label"
                :value="option.value"
              ></el-option>
            </el-select>
            <!-- 时间选择器 -->
            <el-date-picker
              :label="item.label"
              :range-separator="item['range-placeholder']"
              v-else-if="item.type === 'date'"
              :type="item.dateType || 'datetimerange'"
              :start-placeholder="item['start-placeholder'] || '开始'"
              :end-placeholder="item['end-placeholder'] || '结束'"
              v-model="data[item.filed]"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<style lang="scss">
.search-form {
  border: 1px solid #d8dce5;
  border-radius: 4px;
  padding: 30px 30px;
  text-align: center;
  .header {
    font: {
      size: 25px;
      weight: bold;
    }
  }
  .footer {
    text-align: right;
  }
}
</style>
