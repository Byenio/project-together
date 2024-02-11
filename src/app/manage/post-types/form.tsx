"use client";

import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { api } from "~/trpc/react";

export default function CreatePostTypeForm() {
  const router = useRouter();
  const [name, setName] = useState("");

  const nameInvalid = validateName(name);

  const createPostType = api.postType.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createPostType.mutate({ name });
      }}
      className="flex flex-col gap-4"
    >
      <Input
        value={name}
        type="text"
        label="Typ posta"
        isRequired
        variant="bordered"
        isInvalid={nameInvalid}
        errorMessage={nameInvalid && "Typ postu jest zbyt krótki. 5-50 znaków"}
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
          {createPostType.isLoading ? "Tworzenie..." : "Utwórz"}
        </Button>
      </div>
    </form>
  );
}

export function validateName(name: string) {
  const validate = (value: string) => value.match(/^(?!\s+$).{5,}$/);
  const isInvalid = useMemo(() => {
    if (name === "") return false;
    return validate(name) ? false : true;
  }, [name]);

  return isInvalid;
}
