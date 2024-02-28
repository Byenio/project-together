import PostCard from "./new_post-card";
import { PostTypesGetAll, PostsGetAll, SubjectsGetAll, User } from "./page";

export default function PostsContainer({
  posts,
  user,
  subjects,
  postTypes,
  searchParams,
}: {
  posts: PostsGetAll;
  user: User;
  subjects: SubjectsGetAll;
  postTypes: PostTypesGetAll;
  searchParams: Record<string, string | string[] | undefined>;
}) {
  return (
    <div className="w-100 m-auto my-3 flex max-w-[1100px] flex-wrap gap-4">
      <PostCard
        searchParams={searchParams}
        posts={posts}
        user={user}
        subjects={subjects}
        postTypes={postTypes}
      />
    </div>
  );
}
