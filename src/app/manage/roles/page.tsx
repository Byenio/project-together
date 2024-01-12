import Link from "next/link";
import { redirect } from "next/navigation";
import { api } from "~/trpc/server";

export default async function Manage() {
  const { role } = (await api.user.getRole.query()) ?? {
    role: {
      name: "USER",
      level: 0,
    },
  };

  if (!role) return null;
  const canAccess = role.level >= 6;
  if (!canAccess) redirect("/");

  return (
    <div className="text-center">
      <h2 className="m-3 text-3xl">Page currently under construction</h2>
      <Link className="btn btn-link" href={"/"}>
        Go back
      </Link>
    </div>
  );
}
