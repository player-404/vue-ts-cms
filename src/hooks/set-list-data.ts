import { ref } from "vue";
import PageContent from "@/components/page-content";
export function useSetListData() {
  const pageContentRef = ref<InstanceType<typeof PageContent>>();
  const resetHandler = () => {
    pageContentRef.value.getListData();
  };
  const searchHandler = (query) => {
    pageContentRef.value.getListData(query.value);
  };
  return { pageContentRef, resetHandler, searchHandler };
}
