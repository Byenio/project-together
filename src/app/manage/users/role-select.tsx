"use client";

import { useEffect, useState } from "react";
import { api } from "~/trpc/react";

export default function RoleSelect({
  currentRole,
  userId,
}: {
  currentRole: string | null;
  userId: string;
}) {
  const roles = api.role.getAll.useQuery().data;
  const [hidden, setHidden] = useState(true);
  const [newRole, setNewRole] = useState("");

  useEffect(() => {
    setHidden(newRole == currentRole || newRole == "");
  }, [newRole]);

  const updateRole = api.user.updateRole.useMutation({
    onSuccess: () => {
      location.reload();
    },
  });

  return (
    <>
      <div className="basis-1/4">
        <select
          className="select select-bordered select-sm"
          name="role"
          id="role"
          onChange={(e) => {
            setNewRole(e.target.value);
          }}
        >
          {roles?.map((role) => {
            const current = currentRole == role.id;

            return (
              <option value={role.id} selected={current} key={role.id}>
                {role.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="basis-[12%] text-center">
        <button
          onClick={() => updateRole.mutate({ userId: userId, roleId: newRole })}
          className={
            (hidden ? "hidden " : "visible ") + "btn btn-accent btn-sm"
          }
        >
          +
        </button>
      </div>
      <div className="basis-[12%] text-center">
        <button
          onClick={() => setHidden(true)}
          className={(hidden ? "hidden " : "visible ") + "btn btn-error btn-sm"}
        >
          x
        </button>
      </div>
    </>
  );
}
