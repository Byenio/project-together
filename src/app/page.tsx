import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Home() {
  const session = await getServerAuthSession();
  if (!session?.user) redirect("/login");

  const admin = await api.role.create.mutate({ name: "ADMIN", level: 9 });
  const moderator = await api.role.create.mutate({
    name: "MODERATOR",
    level: 6,
  });
  const tutor = await api.role.create.mutate({ name: "TUTOR", level: 3 });
  const u = await api.role.create.mutate({ name: "USER", level: 0 });

  const user = await api.user.get.query();
  if (!user?.fullname) redirect("/personal-info");
  if (!user?.role) await api.user.setDefaultRole.query();

  redirect("/search");
}
