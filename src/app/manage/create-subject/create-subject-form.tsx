"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";

export default function CreateSubjectForm() {
  const router = useRouter();
  const [name, setName] = useState("");

  const createSubject = api.subject.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
    }
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createSubject.mutate({ name });
      }}
      className="flex flex-col gap-2"
    >
      <input
        type="text"
        placeholder="Subject name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input input-bordered input-accent text-accent-content w-full rounded-md px-4 py-2"
      />
      <div className="w-full flex justify-end">
        <button
          type="submit"
          className="w-max-[150px] rounded-md bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20 my-4"
          disabled={createSubject.isLoading}
        >
          {createSubject.isLoading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
}
