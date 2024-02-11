import { redirect } from "next/navigation";
import { api } from "~/trpc/server";
import CreatePostTypeForm from "./form";
import PostTypeList from "./list";

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
        <h2 className="text-neutral-content p-8 text-2xl">
          Dodaj nowy typ postu
        </h2>
      </div>
      <CreatePostTypeForm />
      <div className="my-4 w-full text-center">
        <h2 className="text-neutral-content p-8 text-2xl">Utworzone typy</h2>
      </div>
      <PostTypeList />
    </div>
  );
}
