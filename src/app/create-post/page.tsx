"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";

export default function CreatePost() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [postType, setPostType] = useState("");
  const [subject, setSubject] = useState("");

  const subjects = api.subject.getAll.useQuery().data;
  const postTypes = api.postType.getAll.useQuery().data;

  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      router.replace("/");
      router.refresh();
      setTitle("");
      setDescription("");
      setPostType("");
      setSubject("");
    }
  })

  return (
    <>
      <h2>Create post</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPost.mutate({ title, description, postType, subject });
        }}
        className="flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-md px-4 py-2 text-black"
        />
        <textarea
          placeholder="Post description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-md px-4 py-2 text-black"
        />
        <select
          name="subject"
          className="flex flex-col gap-2 text-black px-4 py-2 rounded-md"
          onChange={(e) => setSubject(e.target.value)}>
          <option disabled selected> -- select an option -- </option>
          {subjects?.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </select>
        <select
          name="post type"
          className="flex flex-col gapp-2 text-black px-4 py-2 rounded-md"
          onChange={(e) => setPostType(e.target.value)}>
          <option disabled selected> -- select an option -- </option>
          {postTypes?.map((postType) => (
            <option key={postType.id} value={postType.id}>
              {postType.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-md bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createPost.isLoading}
        >
          {createPost.isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </>
  );
}

