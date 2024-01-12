"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

import { api } from "~/trpc/react";

export default function CreatePostForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [postType, setPostType] = useState("");
  const [subject, setSubject] = useState("");

  const [submitEnabled, setSubmitEnabled] = useState(false);

  const [titleValidated, setTitleValidated] = useState(false);
  const [descriptionValidated, setDescriptionValidated] = useState(false);
  const [subjectValidated, setSubjectValidated] = useState(false);
  const [postTypeValidated, setPostTypeValidated] = useState(false);
  const [validationErrorMessage, setValidationErrorMessage] = useState("");

  const subjects = api.subject.getAll.useQuery().data;
  const postTypes = api.postType.getAll.useQuery().data;

  const titleSchema = z.string().min(5, {
    message: "Tytuł posta jest za krótki. Powinien mieć minimum 5 znaków.",
  });
  const descriptionSchema = z.string().min(10, {
    message: "Opis posta jest za krótki. Powinien mieć minimum 10 znaków.",
  });

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
        onChange={(e) => {
          try {
            titleSchema.parse(e.target.value);
            setTitleValidated(true);
            setValidationErrorMessage("");
            setSubmitEnabled(
              titleValidated &&
                descriptionValidated &&
                subjectValidated &&
                postTypeValidated,
            );
          } catch (error) {
            setTitleValidated(false);
            if (error instanceof z.ZodError) {
              const errorMessages = error.errors.map((err) => err.message);
              setValidationErrorMessage(
                errorMessages[0] ?? "Wystąpił nieznany błąd.",
              );
            }
          }
          setTitle(e.target.value);
        }}
        className="input input-bordered input-accent w-full rounded-md px-4 py-2 text-neutral-content"
      />
      <textarea
        placeholder="Opis"
        value={description}
        onChange={(e) => {
          try {
            descriptionSchema.parse(e.target.value);
            setDescriptionValidated(true);
            setValidationErrorMessage("");
            setSubmitEnabled(
              titleValidated &&
                descriptionValidated &&
                subjectValidated &&
                postTypeValidated,
            );
          } catch (error) {
            setDescriptionValidated(false);
            if (error instanceof z.ZodError) {
              const errorMessages = error.errors.map((err) => err.message);
              setValidationErrorMessage(
                errorMessages[0] ?? "Wystąpił nieznany błąd.",
              );
            }
          }
          setDescription(e.target.value);
        }}
        className="textarea textarea-accent w-full rounded-md px-4 py-2 text-neutral-content"
        maxLength={190}
      />
      <select
        name="subject"
        className="select select-accent flex flex-col gap-2 rounded-md px-4 py-2 text-neutral-content"
        onChange={(e) => {
          setSubject(e.target.value);
          setSubjectValidated(true);
          setSubmitEnabled(
            titleValidated && descriptionValidated && postTypeValidated,
          );
        }}
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
        onChange={(e) => {
          setPostType(e.target.value);
          setPostTypeValidated(true);
          setSubmitEnabled(
            titleValidated && descriptionValidated && subjectValidated,
          );
        }}
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
          className={`w-max-[150px] my-4 rounded-md ${
            submitEnabled
              ? "bg-white/10 hover:bg-white/20"
              : "bg-red-600/25 hover:bg-red-600/40"
          } px-10 py-3 font-semibold transition`}
          disabled={createPost.isLoading || !submitEnabled}
        >
          {createPost.isLoading ? "Przesyłanie..." : "Prześlij"}
        </button>
      </div>
      {(!titleValidated || !descriptionValidated) && (
        <div role="alert" className="alert-error text-error">
          {validationErrorMessage}
        </div>
      )}
    </form>
  );
}
