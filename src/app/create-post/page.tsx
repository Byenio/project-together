import { redirect } from "next/navigation";
import { api } from "~/trpc/server";
import CreatePostForm from "./form";

export default async function CreatePost() {
  const { role } = (await api.user.getRole.query()) ?? {
    role: {
      name: "USER",
      level: 0,
    },
  };

  if (!role) return null;
  const canAccess = role.level >= 3;
  if (!canAccess) redirect("/");

  return (
    <div className="m-auto max-w-[650px]">
      <div className="my-4 w-full text-center">
        <h1 className="text-neutral-content p-8 text-2xl">Utwórz nowy post</h1>
      </div>
      <CreatePostForm />
    </div>
  );
}
