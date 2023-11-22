import { Posts } from "~/app/_components/posts/posts";
import { api } from "~/trpc/server";

async function getPosts({ params }: { params: { filterType: string, filterQuery: string } }) {

  switch (true) {
    case (params.filterType === "subject"):
      return await api.post.getBySubject.query({ subjectId: params.filterQuery });
    case (params.filterType === "type"):
      return await api.post.getByType.query({ typeId: params.filterQuery });
  }

  return await api.post.getAll.query();

}

export default async function FilterQuery(
  { params }: { params: { filterType: string, filterQuery: string } }
) {

  const posts = await getPosts({ params });

  return (
    <Posts posts={posts} />
  )
}