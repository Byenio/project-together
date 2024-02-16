"use client";

import { Select, SelectItem, Spinner } from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";
import { api } from "~/trpc/react";

export default function RoleSelect({
  currentRole,
  selectedRole,
}: {
  currentRole: string | null;
  selectedRole: Dispatch<SetStateAction<string>>;
}) {
  const { data, isLoading } = api.role.getAll.useQuery();

  if (isLoading) return <Spinner size="sm" />;
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
