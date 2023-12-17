import { redirect } from "next/navigation";
import { api } from "~/trpc/server";
import CreatePostTypeForm from "./create-post-type-form";
import PostTypeList from "./create-post-type-list";

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

  return (
    <div className="m-auto max-w-[600px]">
      <div className="my-4 w-full text-center">
        <h2 className="p-8 text-2xl text-neutral-content">
          Dodaj nowy typ postu
        </h2>
      </div>
      <CreatePostTypeForm />
      <div className="my-4 w-full text-center">
        <h2 className="p-8 text-2xl text-neutral-content">Utworzone typy</h2>
      </div>
      <PostTypeList />
    </div>
  );
}
