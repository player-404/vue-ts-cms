import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import Cookie from "js-cookie";
import store from "@/store/index";
import { useGetStorage } from "@/utils/useStorage";
import { SET_MENU } from "@/store/type";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to) => {
  console.log("store", store.getters);
  if (!store.getters.menu || store.getters.menu.length === 0) {
    const { value } = useGetStorage("menu");
    if (!value.value) {
      console.log("请求数据");
      store.dispatch("login/userInfo");
    } else {
      console.log("获取缓存");
      const { value } = useGetStorage("menu");
      store.commit(`login/${SET_MENU}`, { menu: value.value });
    }
  }

  if (to.name != "Login" && !Cookie.get("token")) {
    return { name: "Login" };
  } else if (to.name == "Login" && Cookie.get("token")) {
    return { name: "Home" };
  }
});

export default router;
