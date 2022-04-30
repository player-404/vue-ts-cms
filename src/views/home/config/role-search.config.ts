import { IitemOptions } from "./types";

const itemOptions: Array<IitemOptions> = [
  {
    type: "input",
    label: "用户id",
    placeholder: "请输入用户id",
    filed: "id",
  },
  {
    type: "input",
    label: "角色名称",
    placeholder: "请输入角色名称",
    filed: "name",
  },
  {
    type: "input",
    label: "用户权限",
    placeholder: "请输入用户权限",
    filed: "intro",
  },
];

export default {
  itemOptions,
};
