"use client";

import { Spinner } from "@nextui-org/react";
import { api } from "~/trpc/react";
import CreateSubjectForm from "./form";
import SubjectList from "./list";

export default function SubjectRefetchWrapper() {
  const {
    data: list,
    isFetching: isSubjectsFetching,
    refetch,
  } = api.subject.getAll.useQuery();

  if (isSubjectsFetching) return <Spinner className="m-auto h-3/4 w-full" />;

  if (!list) return null;

  return (
    <div className="m-auto max-w-[600px]">
      <div className="my-4 w-full text-center">
        <h2 className="text-neutral-content p-8 text-2xl">
          Dodaj nowy przedmiot
        </h2>
      </div>
      <CreateSubjectForm refetch={refetch} />
      <div className="my-4 w-full text-center">
        <h2 className="text-neutral-content p-8 text-2xl">
          Utworzone przedmioty
        </h2>
      </div>
      <SubjectList list={list} refetch={refetch} />
    </div>
  );
}
