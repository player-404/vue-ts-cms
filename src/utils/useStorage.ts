import { ref } from "vue";
const localstorage = window.localStorage;

export function useSetStorage(key: string, value: any) {
  console.log(value);
  localstorage.setItem(key, JSON.stringify(value));
}

export function useGetStorage(key: string) {
  const item = localstorage.getItem(key);
  const value = ref(item);

  return { value };
}

export function useClearStorage(key: string) {
  localstorage.removeItem(key);
}
