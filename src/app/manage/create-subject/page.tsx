import { redirect } from "next/navigation";
import { api } from "~/trpc/server";
import CreateSubjectForm from "./create-subject-form";
import SubjectList from "./create-subject-list";

export default async function CreateSubject() {
  const { role } = (await api.role.getByUser.query()) ?? { role: "USER" };
  const canAccess = role == "MODERATOR" || role == "ADMIN";
  if (!canAccess) redirect("/");

  return (
    <div className="m-auto max-w-[600px]">
      <div className="my-4 w-full text-center">
        <h2 className="p-8 text-2xl text-neutral-content">Add subject</h2>
      </div>
      <CreateSubjectForm />
      <div className="my-4 w-full text-center">
        <h2 className="p-8 text-2xl text-neutral-content">Created subjects</h2>
      </div>
      <SubjectList />
    </div>
  );
}
