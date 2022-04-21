import router from "@/router";
import menu from "@/router/module/menu";

function getMenus(menus, arr) {
  menus.forEach((item) => {
    if (item.type !== 2 && item?.children.length > 0) {
      getMenus(item.children, arr);
    } else {
      const m = menu.find((menuItem) => `/main/${menuItem.path}` === item.url);
      arr.push(m);
    }
  });
}

export default function addMenus(menus) {
  const homeRoutes: any[] = [];
  getMenus(menus, homeRoutes);
  homeRoutes.forEach((route) => {
    router.addRoute("Home", route);
  });
}
