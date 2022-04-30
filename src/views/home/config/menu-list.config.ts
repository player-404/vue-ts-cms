import { ItableOption } from "./types";
const tableOptions: Array<ItableOption> = [
  { prop: "name", label: "菜单名称", "min-width": 120 },
  { prop: "type", label: "菜单类型", "min-width": 80 },
  { prop: "url", label: "菜单url", "min-width": 80 },
  { prop: "icon", label: "图标", "min-width": 80 },
  { prop: "permission", label: "按钮权限", "min-width": 100 },
  {
    prop: "createAt",
    label: "创建时间",
    "min-width": 200,
    slotName: "createAt",
  },
  {
    prop: "updateAt",
    label: "更新时间",
    "min-width": 200,
    slotName: "updateAt",
  },
  {
    prop: "tool",
    label: "操作",
    "min-width": 140,
    slotName: "tool",
  },
];

const otherOptions = {
  title: "菜单列表",
  showHeader: true,
  showFooter: false,
};

const treeOptions = {
  "row-key": "id",
  "tree-props": {
    hasChildren: "hasChildren",
    children: "children",
  },
};

export default {
  options: tableOptions,
  otherOptions,
  showColumnIndex: false,
  showColumnSelect: false,
  treeOptions,
};
