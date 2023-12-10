import Link from "next/link";
import { redirect } from "next/navigation";
import { api } from "~/trpc/server";

export default async function Manage() {
  const { role } = (await api.role.getByUser.query()) ?? { role: "USER" };
  const canAccess = role == "MODERATOR" || role == "ADMIN";
  if (!canAccess) redirect("/");

  return (
    <div className="w-[100%]">
      <div className="m-auto my-8 text-center">
        <Link href={"/manage/create-post-type"} className="btn btn-accent">
          Utwórz nowy typ postu
        </Link>
      </div>
      <div className="m-auto my-8 text-center">
        <Link href={"/manage/create-subject"} className="btn btn-accent">
          Utwórz nowy przedmiot
        </Link>
      </div>
    </div>
  );
}
