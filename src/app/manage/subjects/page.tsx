import { redirect } from "next/navigation";
import { api } from "~/trpc/server";
import CreateSubjectForm from "./form";
import SubjectList from "./list";

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

  return (
    <div className="m-auto max-w-[600px]">
      <div className="my-4 w-full text-center">
        <h2 className="text-neutral-content p-8 text-2xl">
          Dodaj nowy przedmiot
        </h2>
      </div>
      <CreateSubjectForm />
      <div className="my-4 w-full text-center">
        <h2 className="text-neutral-content p-8 text-2xl">
          Utworzone przedmioty
        </h2>
      </div>
      <SubjectList />
    </div>
  );
}
