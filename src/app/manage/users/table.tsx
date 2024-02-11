"use client";

import {
  Link,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  User,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  CancelIcon,
  CheckIcon,
  DeleteIcon,
  EditIcon,
  ExternalLinkIcon,
} from "~/app/_components/icons";
import { api } from "~/trpc/react";
import RoleSelect from "./role-select";

export default function UsersTable() {
  const router = useRouter();
  const { data, isFetching } = api.user.getAll.useQuery();
  const [editMode, setEditMode] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");

  const columns = [
    { label: "Użytkownik" },
    { label: "Rola użytkownika" },
    { label: "Akcje" },
  ];

  const updateRole = api.user.updateRole.useMutation({
    onSuccess: () => {
      setEditMode(false);
      router.replace("/manage/users");
    },
  });

  if (isFetching) return <Spinner />;
  if (!data)
    return (
      <div>
        Wystąpił błąd. Wróć do{" "}
        <Link href="/" underline="always">
          strony głównej
        </Link>{" "}
        i spróbuj ponownie
      </div>
    );

  return (
    <Table isStriped>
      <TableHeader>
        {columns.map((column) => (
          <TableColumn>{column.label}</TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {data.map((user) => (
          <TableRow key={user.id}>
            <TableCell>
              <User
                avatarProps={{ radius: "lg", src: user.image ?? "" }}
                description={user.email}
                name={user.fullname}
              >
                {user.email}
              </User>
            </TableCell>
            <TableCell>
              {!editMode ? (
                user?.role?.name
              ) : (
                <RoleSelect
                  currentRole={user.roleId}
                  selectedRole={setSelectedRole}
                />
              )}
            </TableCell>
            {!editMode ? (
              <TableCell>
                <div className="flex items-center gap-4">
                  <Tooltip content="Edytuj rolę">
                    <span
                      className="cursor-pointer text-lg text-default-400 active:opacity-50"
                      onClick={() => setEditMode(true)}
                    >
                      <EditIcon />
                    </span>
                  </Tooltip>
                  <Tooltip content="Przejdź do postów">
                    <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
                      <ExternalLinkIcon />
                    </span>
                  </Tooltip>
                  <Tooltip color="danger" content="Usuń użytkownika">
                    <span className="cursor-pointer text-lg text-danger active:opacity-50">
                      <DeleteIcon />
                    </span>
                  </Tooltip>
                </div>
              </TableCell>
            ) : (
              <TableCell>
                <div className="flex items-center gap-4">
                  <Tooltip content="Potwierdź" color="success">
                    <span
                      className="cursor-pointer text-lg text-success active:opacity-50"
                      onClick={(e) => {
                        e.preventDefault();
                        updateRole.mutate({
                          roleId: selectedRole,
                          userId: user.id,
                        });
                      }}
                    >
                      <CheckIcon />
                    </span>
                  </Tooltip>
                  <Tooltip content="Anuluj" color="danger">
                    <span
                      className="cursor-pointer text-lg text-danger active:opacity-50"
                      onClick={() => setEditMode(false)}
                    >
                      <CancelIcon />
                    </span>
                  </Tooltip>
                </div>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
