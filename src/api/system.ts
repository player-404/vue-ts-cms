import request from "./request";
import { queryConfig } from "./types";

// 用户列表
export function getUserList(config: queryConfig) {
  console.log("获取用户数据");
  console.log("config", config);
  return request.post({
    url: "/users/list",
    data: config,
  });
}

// 部门列表
export function getDepartment(config: queryConfig) {
  return request.get({
    url: "/department",
    params: config,
  });
}

//角色列表
export function getRoleList(config: queryConfig) {
  return request.post({
    url: "/role/list",
    data: config,
  });
}

//商品列表
export function getGoodsList(config: queryConfig) {
  return request.post({
    url: "/goods/list",
    data: config,
  });
}

// 菜单列表
export function getMenuList(config: queryConfig) {
  return request.post({
    url: "/menu/list",
    data: config,
  });
}
