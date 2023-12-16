import { redirect } from "next/navigation";
import { api } from "~/trpc/server";
import CreatePostForm from "./create-post-form";

export default async function CreatePost() {
  const { role } = (await api.user.getRole.query()) ?? {
    role: {
      name: "USER",
      level: 0,
    },
  };

  if (!role) return null;
  const canAccess = role.level >= 0;
  if (!canAccess) redirect("/");

  return (
    <div className="m-auto max-w-[600px]">
      <div className="my-4 w-full text-center">
        <h1 className="p-8 text-2xl text-neutral-content">Utwórz nowy post</h1>
      </div>
      <CreatePostForm />
    </div>
  );
}
