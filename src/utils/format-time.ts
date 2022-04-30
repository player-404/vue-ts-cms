import { ref } from "vue";

export function useFormatTime(time) {
  const dateStr = ref("1999");
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  dateStr.value = year + "年" + month + "月" + day + "日";
  return dateStr.value;
}
