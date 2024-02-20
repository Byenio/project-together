"use client";

import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import { api } from "~/trpc/react";

export default function CreatePostForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [postType, setPostType] = useState("");
  const [subject, setSubject] = useState("");

  const [typeTouched, setTypeTouched] = useState(false);
  const [subjectTouched, setSubjectTouched] = useState(false);

  const subjects = api.subject.getAll.useQuery().data;
  const postTypes = api.postType.getAll.useQuery().data;

  const titleInvalid = useValidateTitle(title);
  const descriptionInvalid = useValidateDescription(description);

  const handleSubjectSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSubject(e.target.value);
  };

  const handleTypeSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPostType(e.target.value);
  };

  const subjectValid = subjects?.some((e) => e.id === subject);
  const typeValid = postTypes?.some((e) => e.id === postType);

  const isValid = useMemo(() => {
    const notEmpty = !(title === "") && !(description === "");
    const valid =
      !titleInvalid && !descriptionInvalid && subjectValid && typeValid;
    return notEmpty && valid;
  }, [title, description, postType, subject]);

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

  if (!subjects || !postTypes) return null;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createPost.mutate({ title, description, postType, subject });
      }}
      className="flex flex-col gap-4"
    >
      <Input
        value={title}
        type="text"
        label="Tytuł posta"
        isRequired
        variant="bordered"
        isInvalid={titleInvalid}
        errorMessage={titleInvalid && "Tytuł jest zbyt krótki. 5-50 znaków"}
        onValueChange={setTitle}
        color={titleInvalid ? "danger" : "default"}
        maxLength={50}
      />
      <Textarea
        value={description}
        label="Opis posta"
        isRequired
        variant="bordered"
        isInvalid={descriptionInvalid}
        errorMessage={
          descriptionInvalid && "Opis jest zbyt krótki. 5-200 znaków"
        }
        onValueChange={setDescription}
        color={descriptionInvalid ? "danger" : "default"}
        maxLength={200}
      />
      <div className="flex flex-wrap justify-between gap-2">
        <Select
          label="Wybierz przedmiot"
          isRequired
          variant="bordered"
          className="m-auto basis-[49%]"
          errorMessage={
            !subjectValid && subjectTouched ? "Wybierz przedmiot" : ""
          }
          isInvalid={!subjectValid && subjectTouched ? true : false}
          selectedKeys={[subject]}
          onChange={handleSubjectSelection}
          onClose={() => setSubjectTouched(true)}
        >
          {subjects?.map((subject) => (
            <SelectItem key={subject.id} value={subject.id}>
              {subject.name}
            </SelectItem>
          ))}
        </Select>
        <Select
          label="Wybierz typ"
          isRequired
          variant="bordered"
          className="m-auto basis-[49%]"
          errorMessage={!typeValid && typeTouched ? "Wybierz typ" : ""}
          isInvalid={!typeValid && typeTouched ? true : false}
          selectedKeys={[postType]}
          onChange={handleTypeSelection}
          onClose={() => setTypeTouched(true)}
        >
          {postTypes?.map((type) => (
            <SelectItem key={type.id} value={type.id}>
              {type.name}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div className="flex w-full justify-end">
        <Button
          color="primary"
          isDisabled={!isValid}
          variant={isValid ? "ghost" : "light"}
          type="submit"
        >
          {createPost.isLoading ? "Tworzenie..." : "Utwórz"}
        </Button>
      </div>
    </form>
  );
}

export function useValidateTitle(title: string) {
  const validate = (value: string) => value.match(/^(?!\s+$).{5,}$/);
  const isInvalid = useMemo(() => {
    if (title === "") return false;
    return validate(title) ? false : true;
  }, [title]);

  return isInvalid;
}

export function useValidateDescription(description: string) {
  const validate = (value: string) => value.match(/^(?!\s+$).{5,}$/);
  const isInvalid = useMemo(() => {
    if (description === "") return false;
    return validate(description) ? false : true;
  }, [description]);

  return isInvalid;
}
