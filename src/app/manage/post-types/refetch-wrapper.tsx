"use client";

import { Spinner } from "@nextui-org/react";
import { TRPCClientErrorLike } from "@trpc/client";
import { UseTRPCQueryResult } from "@trpc/react-query/shared";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "~/server/api/root";
import { api } from "~/trpc/react";
import CreatePostTypeForm from "./form";
import PostTypeList from "./list";

export type refetchPostsTypesType = UseTRPCQueryResult<
  inferRouterOutputs<AppRouter>["postType"]["getAll"],
  TRPCClientErrorLike<AppRouter>
>["refetch"];

export default function PostTypeRefetchWrapper() {
  const {
    data: list,
    isFetching: isPostTypesFetching,
    refetch,
  } = api.postType.getAll.useQuery();

  if (isPostTypesFetching) return <Spinner className="m-auto h-3/4 w-full" />;

  if (!list) return null;

  return (
    <div className="m-auto max-w-[600px]">
      <div className="my-4 w-full text-center">
        <h2 className="text-neutral-content p-8 text-2xl">
          Dodaj nowy typ postu
        </h2>
      </div>
      <CreatePostTypeForm refetch={refetch} />
      <div className="my-4 w-full text-center">
        <h2 className="text-neutral-content p-8 text-2xl">Utworzone typy</h2>
      </div>
      <PostTypeList list={list} refetch={refetch} />
    </div>
  );
}
