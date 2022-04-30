import router from "@/router";
import menu from "@/router/module/menu";

export let firstMenu: string;

function getMenus(menus, arr) {
  menus.forEach((item) => {
    if (item.type !== 2 && item?.children.length > 0) {
      getMenus(item.children, arr);
    } else {
      // 默认跳转页面
      if (!firstMenu) {
        firstMenu = item.url;
      }
      const m = menu.find((menuItem) => `/main/${menuItem.path}` === item.url);
      arr.push(m);
    }
  });
}

//动态添加路由
export function addMenus(menus) {
  const homeRoutes: any[] = [];
  getMenus(menus, homeRoutes);
  homeRoutes.forEach((route) => {
    if (!router.hasRoute(route.name)) {
      router.addRoute("Home", route);
    }
  });
}

// 获取面包屑
export function pathMatchBreadcrumbs(
  userMenus: any[],
  currentPath: string,
  breadcrumbs: any[]
): any {
  for (let i = 0; i < userMenus.length; i++) {
    if (userMenus[i].type === 1) {
      const findMenu = pathMatchBreadcrumbs(
        userMenus[i].children ?? [],
        currentPath,
        breadcrumbs
      );
      if (findMenu) {
        breadcrumbs.push(userMenus[i]);
        breadcrumbs.push(findMenu);
        break;
      }
    }

    if (userMenus[i].type === 2) {
      if (userMenus[i].url === currentPath) {
        return userMenus[i];
      }
    }
  }
}
