import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import Cookie from "js-cookie";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to) => {
  if (to.name != "Login" && !Cookie.get("token")) {
    return { name: "Login" };
  }

  if (Cookie.get("token") && to.name === "Login") {
    return { name: "Home" };
  }
});

export default router;
