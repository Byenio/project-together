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
    }
  })

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
        className="input input-bordered input-accent text-accent-content w-full rounded-md px-4 py-2"
      />
      <div className="w-full flex justify-end">
        <button
          type="submit"
          className="w-max-[150px] rounded-md bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20 my-4"
          disabled={createPostType.isLoading}
        >
          {createPostType.isLoading ? "Przesylanie..." : "Przeslij"}
        </button>
      </div>
    </form>
  );
}
