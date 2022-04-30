import { IitemOptions } from "./types";

const itemOptions: Array<IitemOptions> = [
  {
    type: "input",
    label: "菜单名称",
    placeholder: "请输入菜单名称",
    filed: "name",
  },
  {
    type: "input",
    label: "菜单类型",
    placeholder: "请输入菜单类型",
    filed: "type",
  },

  {
    type: "date",
    label: "注册时间",
    "range-placeholder": "To",
    "allow-control": true,
    filed: "createAt",
  },
];

export default {
  itemOptions,
};
