"use client";

import { Select, SelectItem } from "@nextui-org/react";
import type { Dispatch, SetStateAction } from "react";
import { api } from "~/trpc/react";

export default function RoleSelect({
  currentRole,
  selectedRole,
}: {
  currentRole: string | null;
  selectedRole: Dispatch<SetStateAction<string>>;
}) {
  const { data } = api.role.getAll.useQuery();

  if (!data) return null;

  const roles = data.filter((role) => {
    return role.id !== currentRole;
  });

  return (
    <Select
      name="role"
      id="role"
      size="sm"
      label="Wybór roli"
      onChange={(e) => selectedRole(e.target.value)}
    >
      {roles.map((role) => {
        return (
          <SelectItem value={role.id} key={role.id}>
            {role.name}
          </SelectItem>
        );
      })}
    </Select>
  );
}
