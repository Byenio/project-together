import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "~/server/api/root";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { getSingleElementFromParams } from "../(utils)/util-client-functions";
import {
  canUserAdmin,
  canUserManage,
  canUserPost,
} from "../(utils)/util-server-functions";
import PostContainer from "./post-container";

type RouterOutput = inferRouterOutputs<AppRouter>;
export type PostsGetAll = RouterOutput["post"]["getAll"];
export type SubjectsGetAll = RouterOutput["subject"]["getAll"];
export type PostTypesGetAll = RouterOutput["postType"]["getAll"];

export type User = {
  id: string | undefined;
  isAdmin: boolean;
  isModerator: boolean;
  canPost: boolean;
};

export default async function Search({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const session = await getServerAuthSession();
  const posts = await api.post.getAll.query();
  const subjects = await api.subject.getAll.query();
  const postTypes = await api.postType.getAll.query();
  const userFilter = await api.user.getFullNameById.query({
    id: getSingleElementFromParams({
      params: searchParams,
      element: "user",
      defaultValue: "",
    }),
  });

  const user: User = {
    id: session?.user.id,
    isAdmin: await canUserAdmin(),
    isModerator: await canUserManage(),
    canPost: await canUserPost(),
  };

  return (
    <div className="w-100 m-auto my-3 flex max-w-[1100px] flex-wrap gap-4">
      <PostContainer
        searchParams={searchParams}
        posts={posts}
        user={user}
        subjects={subjects}
        postTypes={postTypes}
        userFilter={userFilter?.fullname ?? ""}
      />
    </div>
  );
}
