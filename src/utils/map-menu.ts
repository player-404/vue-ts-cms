function mapMenu(userMneus) {
  const permission: string[] = [];
  const reduceMenus = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        reduceMenus(menu.children ?? []);
      } else if (menu.type === 3) {
        permission.push(menu.permission);
      }
    }
  };
  reduceMenus(userMneus);
  return permission;
}
export default mapMenu;
