import { useGetStorage } from "@/utils/storage";
import { SET_MENU } from "@/store/type";
import { addMenus } from "@/utils/get-user-menu-list";
import store from "@/store/index";
import Cookies from "js-cookie";

export default function () {
  if (!Cookies.get("token")) return;
  if (!store.getters.menu || store.getters.menu.length === 0) {
    const { value } = useGetStorage("menu");
    if (!value.value) {
      console.log("请求数据");
      store.dispatch("login/userInfo");
    } else {
      console.log("获取缓存");
      const { value } = useGetStorage("menu");
      //添加路由
      addMenus(value.value);

      store.commit(`login/${SET_MENU}`, { menu: value.value });
    }
  }
}
