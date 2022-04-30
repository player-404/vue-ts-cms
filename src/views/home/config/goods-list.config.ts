import { ItableOption } from "./types";
const tableOptions: Array<ItableOption> = [
  { prop: "name", label: "商品信息", "min-width": 150 },
  { prop: "imgUrl", label: "图片Url", "min-width": 180, slotName: "image" },
  { prop: "oldPrice", label: "原价", "min-width": 80 },
  { prop: "newPrice", label: "现价", "min-width": 80 },
  { prop: "desc", label: "商品描述", "min-width": 150 },
  { prop: "status", label: "状态", "min-width": 100, slotName: "status" },
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
  title: "商品列表",
  btnText: "新建商品",
  showHeader: true,
  showFooter: true,
};

export default {
  options: tableOptions,
  otherOptions,
  showColumnIndex: true,
  showColumnSelect: true,
};
