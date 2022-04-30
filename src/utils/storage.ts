import { ref } from "vue";
const localstorage = window.localStorage;

export function useSetStorage(key: string, value: any) {
  console.log(value);
  localstorage.setItem(key, JSON.stringify(value));
}

export function useGetStorage(key: string) {
  let item: any = localstorage.getItem(key);
  if (item != "undefined") {
    item = JSON.parse(item);
  }

  const value = ref(item);

  return { value };
}

export function useClearStorage(key: string) {
  localstorage.removeItem(key);
}
