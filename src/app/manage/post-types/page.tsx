import { redirect } from "next/navigation";
import { api } from "~/trpc/server";
import PostTypeRefetchWrapper from "./refetch-wrapper";

export default async function CreatePostType() {
  const { role } = (await api.user.getRole.query()) ?? {
    role: {
      name: "USER",
      level: 0,
    },
  };

  if (!role) return null;
  const canAccess = role.level >= 6;
  if (!canAccess) redirect("/");

  return <PostTypeRefetchWrapper />;
}
