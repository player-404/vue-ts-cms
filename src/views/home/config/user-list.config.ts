import { ItableOption } from "./types";
const tableOptions: Array<ItableOption> = [
  { prop: "name", label: "用户名", "min-width": 100 },
  { prop: "realname", label: "真实姓名", "min-width": 100 },
  { prop: "cellphone", label: "手机号码", "min-width": 200 },
  { prop: "enable", label: "状态", "min-width": 100, slotName: "enable" },
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
  title: "用户列表",
  btnText: "新建用户",
  showHeader: true,
  showFooter: true,
};

export default {
  options: tableOptions,
  otherOptions,
  showColumnIndex: true,
  showColumnSelect: true,
};
