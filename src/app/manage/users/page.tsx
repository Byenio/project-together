import { api } from "~/trpc/server";
import RoleSelect from "./role-select";

export default async function ManageUsers() {
  const users = await api.user.getAll.query();
  const fields = ["Username", "Email", "Role"];

  return (
    <>
      <div className="flex">
        {fields.map((field) => (
          <h2 className="basis-1/4">{field}</h2>
        ))}
        <h2 className="basis-[12%] text-center">Confirm All</h2>
        <h2 className="basis-[12%] text-center">Cancel All</h2>
      </div>
      {users.map((user) => (
        <div className="flex py-2">
          <div className="basis-1/4 py-1">{user.name}</div>
          <div className="basis-1/4 py-1">{user.email}</div>
          <RoleSelect currentRole={user.roleId} userId={user.id} />
        </div>
      ))}
    </>
  );
}
