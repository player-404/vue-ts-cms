import { IitemOptions } from "./types";

const itemOptions: Array<IitemOptions> = [
  {
    type: "input",
    label: "商品信息",
    placeholder: "请输入商品信息",
    filed: "name",
  },
  {
    type: "input",
    label: "价格",
    placeholder: "请输入价格",
    filed: "newPrice",
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
    filed: "status",
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
