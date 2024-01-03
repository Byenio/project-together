"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

import { api } from "~/trpc/react";

export default function CreatePostTypeForm() {
  const router = useRouter();
  const [name, setName] = useState("");

  const [nameValidated, setNameValidated] = useState(false);
  const [validationErrorMessage, setValidationErrorMessage] = useState("");

  const nameSchema = z.string().min(5, {
    message: "Nazwa typu postu jest za krótka. Powinna mieć minimum 5 znaków.",
  });

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
      className="flex flex-col gap-2"
    >
      <input
        type="text"
        placeholder="Typ postu"
        value={name}
        onChange={(e) => {
          try {
            nameSchema.parse(e.target.value);
            setNameValidated(true);
            setValidationErrorMessage("");
          } catch (error) {
            setNameValidated(false);
            if (error instanceof z.ZodError) {
              const errorMessages = error.errors.map((err) => err.message);
              setValidationErrorMessage(
                errorMessages[0] || "Wystąpił nieznany błąd.",
              );
            }
          }
          setName(e.target.value);
        }}
        className="input input-bordered input-accent w-full rounded-md px-4 py-2 text-neutral-content"
      />
      <div className="flex w-full justify-end">
        <button
          type="submit"
          className={`w-max-[150px] my-4 rounded-md ${
            nameValidated
              ? "bg-white/10 hover:bg-white/20"
              : "bg-red-600/25 hover:bg-red-600/40"
          } px-10 py-3 font-semibold transition`}
          disabled={createPostType.isLoading || !nameValidated}
        >
          {createPostType.isLoading ? "Przesylanie..." : "Przeslij"}
        </button>
      </div>
      {!nameValidated && (
        <div role="alert" className="alert-error text-error">
          {validationErrorMessage}
        </div>
      )}
    </form>
  );
}
