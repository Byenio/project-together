"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";

export function CreatePost() {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");
  const [subject, setSubject] = useState("");

  const subjects = api.subject.getAll.useQuery().data;
  const tags = api.tag.getAll.useQuery().data;

  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setContent("");
      setTag("");
      setSubject("");
    }
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createPost.mutate({ content, tag, subject });
      }}
      className="flex flex-col gap-2"
    >
      <input
        type="text"
        placeholder="Post content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <select
        name="subject"
        className="flex flex-col gap-2 text-black px-4 py-2 rounded-full"
        onChange={(e) => setSubject(e.target.value)}>
        <option disabled selected> -- select an option -- </option>
        {subjects?.map((subject) => (
          <option key={subject.id} value={subject.id}>
            {subject.name} | {subject.level}
          </option>
        ))}
      </select>
      <select
        name="tag"
        className="flex flex-col gapp-2 text-black px-4 py-2 rounded-full"
        onChange={(e) => setTag(e.target.value)}>
        <option disabled selected> -- select an option -- </option>
        {tags?.map((tag) => (
          <option key={tag.id} value={tag.id}>
            {tag.name}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={createPost.isLoading}
      >
        {createPost.isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}

