import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Home() {
  const session = await getServerAuthSession();
  if (!session?.user) redirect("/login");

  const user = await api.user.getRole.query();
  if (!user?.role) await api.user.setDefaultRole.query();

  redirect("/search");
}
