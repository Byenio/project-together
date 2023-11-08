"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";

export default function CreateSubject() {
  const router = useRouter();
  const [name, setName] = useState("");

  const createSubject = api.subject.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
    }
  })

  return (
    <>
      <h2>Add subject</h2>
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
          className="w-full rounded-full px-4 py-2 text-black"
        />
        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createSubject.isLoading}
        >
          {createSubject.isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </>
  );
}
