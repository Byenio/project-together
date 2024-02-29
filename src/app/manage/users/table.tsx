"use client";

import {
  Chip,
  Input,
  Link,
  Pagination,
  Select,
  SelectItem,
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
import { useCallback, useMemo, useState } from "react";
import {
  CancelIcon,
  CheckIcon,
  EditIcon,
  ExternalLinkIcon,
  SearchIcon,
} from "~/app/(components)/icons";
import { perPageOptions } from "~/app/(utils)/util-consts";
import { api } from "~/trpc/react";
import RoleSelect from "./role-select";

type RoleColor =
  | "danger"
  | "warning"
  | "success"
  | "secondary"
  | "default"
  | "primary"
  | undefined;

export default function UsersTable() {
  const [editMode, setEditMode] = useState({ edit: false, id: "" });
  const [selectedRole, setSelectedRole] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const columns = [{ label: "Użytkownik" }, { label: "Akcje" }];

  const roleColors = [
    { name: "ADMIN", color: "danger" },
    { name: "MODERATOR", color: "warning" },
    { name: "TUTOR", color: "success" },
    { name: "USER", color: "secondary" },
  ];

  const roleColor = (role: string): RoleColor => {
    const filtered = roleColors.find((item) => item.name === role);
    return filtered?.color as RoleColor;
  };

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilter(value);
      setPage(1);
    } else {
      setFilter("");
    }
  }, []);

  const hasSearchFilter = Boolean(filter);

  const onClear = useCallback(() => {
    setFilter("");
    setPage(1);
  }, []);

  const {
    data: users,
    isFetching: isUsersFetching,
    refetch: refetchUsers,
  } = api.user.getAll.useQuery();

  const updateRole = api.user.updateRole.useMutation({
    onSuccess: () => {
      setEditMode({ edit: false, id: "" });
      void refetchUsers();
    },
  });

  const filteredUsers = useMemo(() => {
    let filtered = users;

    if (hasSearchFilter) {
      filtered = filtered?.filter((user) =>
        user.fullname?.toLowerCase().includes(filter.toLowerCase()),
      );
    }

    return filtered;
  }, [users, filter]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredUsers?.slice(start, end);
  }, [page, filteredUsers, rowsPerPage]);

  if (isUsersFetching) return <Spinner className="m-auto h-3/4 w-full" />;

  if (!filteredUsers || !items)
    return (
      <div className="m-auto h-3/4 w-full">
        Wystąpił błąd. Wróć do{" "}
        <Link href="/" underline="always">
          strony głównej
        </Link>{" "}
        i spróbuj ponownie
      </div>
    );

  const pages = Math.ceil(filteredUsers.length / rowsPerPage);

  return (
    <>
      <div className="wrap m-auto mb-4 mt-4 flex max-w-[600px] justify-between">
        <Input
          isClearable
          size="sm"
          radius="lg"
          variant="bordered"
          className="w-[70%]"
          placeholder="Wyszukaj użytkownika"
          startContent={<SearchIcon />}
          value={filter}
          onClear={() => onClear()}
          onValueChange={onSearchChange}
        />
        <Select
          items={perPageOptions}
          label="Na stronę"
          className="w-[28%]"
          size="sm"
          radius="lg"
          variant="bordered"
          defaultSelectedKeys={[rowsPerPage.toString()]}
          onChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
        >
          {(option) => (
            <SelectItem key={`${option.value}`} value={option.value}>
              {option.label}
            </SelectItem>
          )}
        </Select>
      </div>
      <Table
        isStriped
        className="m-auto max-w-[600px]"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={setPage}
            />
          </div>
        }
      >
        <TableHeader>
          {columns.map((column, index) => (
            <TableColumn key={`${column.label}-${index}`}>
              {column.label}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {items.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <User
                  avatarProps={{ radius: "lg", src: user.image ?? "" }}
                  description={user.email}
                  name={user.fullname}
                >
                  {user.email}
                </User>
                {editMode.edit && editMode.id === user.id ? (
                  <RoleSelect
                    currentRole={user.roleId}
                    selectedRole={setSelectedRole}
                  />
                ) : (
                  <Chip
                    className="mt-1 block h-5 text-center"
                    color={roleColor(user?.role?.name ?? "USER")}
                    variant={user?.role?.name ? "solid" : "flat"}
                  >
                    {user?.role?.name ?? "BRAK ROLI"}
                  </Chip>
                )}
              </TableCell>
              {editMode && editMode.id === user.id ? (
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
                        onClick={() => setEditMode({ edit: false, id: "" })}
                      >
                        <CancelIcon />
                      </span>
                    </Tooltip>
                  </div>
                </TableCell>
              ) : (
                <TableCell>
                  <div className="flex items-center gap-4">
                    <Tooltip content="Edytuj rolę">
                      <span
                        className="cursor-pointer text-lg text-default-400 hover:text-primary active:opacity-50"
                        onClick={() => setEditMode({ edit: true, id: user.id })}
                      >
                        <EditIcon />
                      </span>
                    </Tooltip>
                    <Link href={`/search?user=${user.id}`}>
                      <Tooltip content="Przejdź do postów">
                        <span className="cursor-pointer text-lg text-default-400 hover:text-primary active:opacity-50">
                          <ExternalLinkIcon />
                        </span>
                      </Tooltip>
                    </Link>
                    {/* <Tooltip color="danger" content="Usuń użytkownika">
                    <span className="cursor-pointer text-lg text-danger-500 hover:text-danger active:opacity-50">
                      <DeleteIcon />
                    </span>
                  </Tooltip> */}
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
