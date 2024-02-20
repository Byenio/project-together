import { redirect } from "next/navigation";
import React from "react";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function ManageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  if (!session?.user) redirect("/landing");

  const user = await api.user.get.query();
  if (!(user?.role?.level && user.role.level >= 6)) redirect("/search");

  return <>{children}</>;
}
