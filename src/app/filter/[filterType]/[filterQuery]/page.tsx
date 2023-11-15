import { api } from "~/trpc/server"

export async function getPosts({ params }: { params: { filterType: string, filterQuery: string } }) {
  const posts = await api.post.getBySubject.query({ subjectId: params.filterQuery });
  return posts;
}

export default async function FilterQuery(
  { params }: { params: { filterType: string, filterQuery: string } }
) {

  const posts = await getPosts({ params });

  return (
    <>
      {params.filterQuery}
      <div>
        {posts.map((post) => (
          <p>{post.title}</p>
        ))}
      </div>
    </>
  )
}