"use client";

import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { api } from "~/trpc/react";

export default function PersonalInfoForm() {
  const router = useRouter();
  const [fullname, setFullname] = useState("");

  const nameInvalid = useValidateName(fullname);

  const createSubject = api.user.updateFullname.useMutation({
    onSuccess: () => {
      router.replace("/");
      setFullname("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createSubject.mutate({ fullname });
      }}
      className="flex flex-col gap-4"
    >
      <Input
        value={fullname}
        type="text"
        label="Imię i nazwisko"
        isRequired
        variant="bordered"
        isInvalid={nameInvalid}
        errorMessage={
          nameInvalid && "Twoje dane są zbyt krótkie, wpisz poprawne."
        }
        onValueChange={setFullname}
        color={nameInvalid ? "danger" : "default"}
        maxLength={50}
      />
      <div className="flex w-full justify-end">
        <Button
          color="primary"
          isDisabled={nameInvalid || fullname === ""}
          variant={nameInvalid || fullname === "" ? "light" : "ghost"}
          type="submit"
        >
          {createSubject.isLoading ? "Przesyłanie..." : "Prześlij"}
        </Button>
      </div>
    </form>
  );
}

export function useValidateName(fullname: string) {
  const validate = (value: string) => value.match(/^(?!\s+$).{5,}$/);
  const isInvalid = useMemo(() => {
    if (fullname === "") return false;
    return validate(fullname) ? false : true;
  }, [fullname]);

  return isInvalid;
}
