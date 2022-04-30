import { ItableOption } from "./types";
const tableOptions: Array<ItableOption> = [
  { prop: "name", label: "角色名", "min-width": 100 },
  { prop: "intro", label: "权限", "min-width": 100 },
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
  title: "角色列表",
  btnText: "新建角色",
  showHeader: true,
  showFooter: true,
};
export default {
  options: tableOptions,
  otherOptions,
  showColumnIndex: true,
  showColumnSelect: true,
};
