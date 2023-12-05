"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";

export default function CreatePostTypeForm() {
  const router = useRouter();
  const [name, setName] = useState("");

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
        placeholder="Post type name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input input-bordered input-accent w-full rounded-md px-4 py-2 text-accent-content"
      />
      <div className="flex w-full justify-end">
        <button
          type="submit"
          className="w-max-[150px] my-4 rounded-md bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createPostType.isLoading}
        >
          {createPostType.isLoading ? "Przesylanie..." : "Przeslij"}
        </button>
      </div>
    </form>
  );
}
