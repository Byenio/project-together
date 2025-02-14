"use client";

import { TRPCClientErrorLike } from "@trpc/client";
import { UseTRPCQueryResult } from "@trpc/react-query/shared";
import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "~/server/api/root";
import { api } from "~/trpc/react";
import CreateSubjectForm from "./form";
import SubjectList from "./list";

export type refetchSubjectsType = UseTRPCQueryResult<
  inferRouterOutputs<AppRouter>["subject"]["getAll"],
  TRPCClientErrorLike<AppRouter>
>["refetch"];

export default function SubjectRefetchWrapper() {
  const { data: list, refetch } = api.subject.getAll.useQuery();

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
