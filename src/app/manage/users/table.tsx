"use client";

import {
  Chip,
  Input,
  Link,
  Pagination,
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
import { useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import {
  CancelIcon,
  CheckIcon,
  EditIcon,
  ExternalLinkIcon,
  SearchIcon,
} from "~/app/_components/icons";
import { api } from "~/trpc/react";
import RoleSelect from "./role-select";

export default function UsersTable() {
  const [editMode, setEditMode] = useState({ edit: false, id: "" });
  const [selectedRole, setSelectedRole] = useState("");
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");

  const rowsPerPage = [
    { value: 1, label: "10" },
    { value: 2, label: "20" },
    { value: 5, label: "50" },
  ];

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
  } = api.user.getAllPage.useQuery({
    limit: limit,
    page: page,
  });
  const { data: rows, isFetching: isRowsFetching } =
    api.user.getRows.useQuery();

  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  const columns = [{ label: "Użytkownik" }, { label: "Akcje" }];

  const updateRole = api.user.updateRole.useMutation({
    onSuccess: () => {
      setEditMode({ edit: false, id: "" });
      refetchUsers();
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

  if (isUsersFetching || isRowsFetching)
    return <Spinner className="m-auto w-full" />;

  if (!rows || !filteredUsers)
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
    <>
      <div className="wrap m-auto mb-4 mt-4 flex max-w-[600px] justify-between">
        <Input
          isClearable
          size="sm"
          radius="lg"
          variant="bordered"
          className="w-[75%]"
          placeholder="Wyszukaj użytkownika"
          startContent={<SearchIcon />}
          value={filter}
          onClear={() => onClear()}
          onValueChange={onSearchChange}
        />
        {/* <Select
          items={rowsPerPage}
          label="Rekordy"
          className="w-[23%]"
          onChange={(e) => setLimit(parseInt(e.target.value, 10))}
        >
          {(option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          )}
        </Select> */}
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
              total={Math.ceil(rows / limit)}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
      >
        <TableHeader>
          {columns.map((column) => (
            <TableColumn>{column.label}</TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
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
                    className="mt-1 block h-5 text-center text-default-600"
                    color="secondary"
                    variant="solid"
                  >
                    {user?.role?.name}
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
                    <Link
                      href={`/search?${createQueryString("user", user.id)}`}
                    >
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
