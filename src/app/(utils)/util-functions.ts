import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export async function isUserAuthenticated() {
  const session = await getServerAuthSession();

  if (!session) return false;
  return true;
}

export async function userRole() {
  const defaultRole = { role: { name: "USER", level: 0 } };
  const { role } = (await api.user.getRole.query()) ?? defaultRole;

  return { role };
}

export async function userRoleLevel() {
  const defaultRole = { role: { name: "USER", level: 0 } };
  const { role } = (await api.user.getRole.query()) ?? defaultRole;

  return role?.level ?? 0;
}

export async function canUserPost() {
  const level = await userRoleLevel();
  return level >= 3;
}

export async function canUserManage() {
  const level = await userRoleLevel();
  return level >= 6;
}

export async function canUserAdmin() {
  const level = await userRoleLevel();
  return level >= 9;
}
