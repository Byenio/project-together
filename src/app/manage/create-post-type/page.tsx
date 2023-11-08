"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";

export default function CreatePostType() {
  const router = useRouter();
  const [name, setName] = useState("");

  const createPostType = api.postType.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
    }
  })

  return (
    <>
      <h2>Add post type</h2>
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
          className="w-full rounded-full px-4 py-2 text-black"
        />
        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createPostType.isLoading}
        >
          {createPostType.isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </>
  );
}
