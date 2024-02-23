import { redirect } from "next/navigation";
import { api } from "~/trpc/server";
import SubjectRefetchWrapper from "./refetch-wrapper";

export default async function CreateSubject() {
  const { role } = (await api.user.getRole.query()) ?? {
    role: {
      name: "USER",
      level: 0,
    },
  };

  if (!role) return null;
  const canAccess = role.level >= 6;
  if (!canAccess) redirect("/");

  return <SubjectRefetchWrapper />;
}
