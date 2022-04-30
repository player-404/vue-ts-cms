export default function usePermission(
  permission: string[],
  pageName: string,
  role: string
) {
  const permissionName = `system:${pageName}:${role}`;
  return permission.includes(permissionName);
}
