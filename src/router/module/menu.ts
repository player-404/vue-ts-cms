// 所有的路由列表 根据用户权限 动态的添加符合权限的路由

export default [
  {
    name: "overview",
    path: "analysis/overview",
    component: () => import("@/views/home/analysis/Overview.vue"),
  },
  {
    name: "dashboard",
    path: "analysis/dashboard",
    component: () => import("@/views/home/analysis/Dashboard.vue"),
  },
  {
    name: "user",
    path: "system/user",
    component: () => import("@/views/home/system/User.vue"),
  },
  {
    name: "department",
    path: "system/department",
    component: () => import("@/views/home/system/Department.vue"),
  },
  {
    name: "menu",
    path: "system/menu",
    component: () => import("@/views/home/system/Menu.vue"),
  },
  {
    name: "role",
    path: "system/role",
    component: () => import("@/views/home/system/Role.vue"),
  },
  {
    name: "category",
    path: "product/category",
    component: () => import("@/views/home/product/Category.vue"),
  },
  {
    name: "goods",
    path: "product/goods",
    component: () => import("@/views/home/product/Goods.vue"),
  },
  {
    name: "chat",
    path: "story/chat",
    component: () => import("@/views/home/story/Chat.vue"),
  },
  {
    name: "list",
    path: "story/list",
    component: () => import("@/views/home/story/List.vue"),
  },
];
