"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";

export function CreateSubject() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [level, setLevel] = useState(0);

  const createSubject = api.subject.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
      setLevel(0);
    }
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createSubject.mutate({ name, level });
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
      <input
        type="number"
        min="1"
        max="5"
        placeholder="Subject level"
        value={level}
        onChange={(e) => setLevel(parseInt(e.target.value))}
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
  );
}
