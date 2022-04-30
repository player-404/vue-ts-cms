import { addMenus } from "@/utils/get-user-menu-list";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { SET_TOKEN, SET_PERMISSION } from "@/store/type";
//样式重置
import "normalize.css";
import "@/assets/css/index.scss";
//animate.css
import "animate.css";
import Cookie from "js-cookie";
import mapMenu from "@/utils/map-menu";
// import app from "./global/index";
//全局引入element-plus
// import ElementPlus from "element-plus";
// import "element-plus/dist/index.css";

router.beforeEach(async (to) => {
  const token = Cookie.get("token");
  if (token) {
    store.commit(`login/${SET_TOKEN}`, { token: token });
    if (to.path === "/login") {
      return { name: "Home" };
    } else {
      if (store.getters.userInfo.length === 0) {
        await store.dispatch("login/userInfo");
        await store.dispatch("login/userMenu", {
          roleId: store.getters.userInfo.role.id,
        });
        const menus = store.getters.menu;
        // 获取用户权限
        if (store.getters.permission.length === 0) {
          const permission: string[] = mapMenu(menus);
          store.commit(`login/${SET_PERMISSION}`, { permission: permission });
        }
        addMenus(menus);

        return { path: to.path };
      }
    }
  } else if (to.name != "Login") {
    return { name: "Login" };
  }
});

createApp(App).use(store).use(router).mount("#app");
