"use client";

import { Button, Input } from "@nextui-org/react";
import { useMemo, useState } from "react";
import { api } from "~/trpc/react";
import { refetchSubjects } from "./refetch-wrapper";

export default function CreateSubjectForm({
  refetch,
}: {
  refetch: refetchSubjects;
}) {
  const [name, setName] = useState("");

  const nameInvalid = useValidateName(name);

  const createSubject = api.subject.create.useMutation({
    onSuccess: () => {
      void refetch();
      setName("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createSubject.mutate({ name });
      }}
      className="flex flex-col gap-4"
    >
      <Input
        value={name}
        type="text"
        label="Przedmiot"
        isRequired
        variant="bordered"
        isInvalid={nameInvalid}
        errorMessage={
          nameInvalid && "Nazwa przedmiotu jest zbyt krótka. 5-50 znaków"
        }
        onValueChange={setName}
        color={nameInvalid ? "danger" : "default"}
        maxLength={50}
      />
      <div className="flex w-full justify-end">
        <Button
          color="primary"
          isDisabled={nameInvalid || name === ""}
          variant={nameInvalid || name === "" ? "light" : "ghost"}
          type="submit"
        >
          {createSubject.isLoading ? "Tworzenie..." : "Utwórz"}
        </Button>
      </div>
    </form>
  );
}

export function useValidateName(name: string) {
  const validate = (value: string) => value.match(/^(?!\s+$).{5,}$/);
  const isInvalid = useMemo(() => {
    if (name === "") return false;
    return validate(name) ? false : true;
  }, [name]);

  return isInvalid;
}
