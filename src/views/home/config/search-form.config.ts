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
    label: "用户名",
    placeholder: "请输入用户名",
    filed: "name",
  },
  {
    type: "input",
    label: "真实姓名",
    placeholder: "请输入真实姓名",
    filed: "realname",
  },
  {
    type: "select",
    label: "状态",
    placeholder: "选择运状态",
    options: [
      {
        label: "启用",
        value: "1",
      },
      {
        label: "禁用",
        value: "0",
      },
    ],
    filed: "enable",
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
