"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";

export default function CreatePostForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [postType, setPostType] = useState("");
  const [subject, setSubject] = useState("");

  const subjects = api.subject.getAll.useQuery().data;
  const postTypes = api.postType.getAll.useQuery().data;

  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      router.replace(`/`);
      router.refresh();
      setTitle("");
      setDescription("");
      setPostType("");
      setSubject("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createPost.mutate({ title, description, postType, subject });
      }}
      className="flex flex-col gap-2"
    >
      <input
        type="text"
        placeholder="Tytuł posta"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input input-bordered input-accent w-full rounded-md px-4 py-2 text-neutral-content"
      />
      <textarea
        placeholder="Opis"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="textarea textarea-accent w-full rounded-md px-4 py-2 text-neutral-content"
        maxLength={190}
      />
      <select
        name="subject"
        className="select select-accent flex flex-col gap-2 rounded-md px-4 py-2 text-neutral-content"
        onChange={(e) => setSubject(e.target.value)}
      >
        <option disabled selected>
          {" "}
          -- wybierz przedmiot --{" "}
        </option>
        {subjects?.map((subject) => (
          <option key={subject.id} value={subject.id}>
            {subject.name}
          </option>
        ))}
      </select>
      <select
        name="post type"
        className="gapp-2 select select-accent flex flex-col rounded-md px-4 py-2 text-neutral-content"
        onChange={(e) => setPostType(e.target.value)}
      >
        <option disabled selected>
          {" "}
          -- wybierz typ --{" "}
        </option>
        {postTypes?.map((postType) => (
          <option key={postType.id} value={postType.id}>
            {postType.name}
          </option>
        ))}
      </select>
      <div className="flex w-full justify-end">
        <button
          type="submit"
          className="w-max-[150px] my-4 rounded-md bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createPost.isLoading}
        >
          {createPost.isLoading ? "Przesyłanie..." : "Prześlij"}
        </button>
      </div>
    </form>
  );
}
