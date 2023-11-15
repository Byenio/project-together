import { api } from "~/trpc/server"

async function getPosts({ params }: { params: { filterType: string, filterQuery: string } }) {

  if (params.filterType === "subject") {
    return await api.post.getBySubject.query({ subjectId: params.filterQuery });
  }

  if (params.filterType === "type") {
    return await api.post.getByType.query({ typeId: params.filterQuery });
  }

  return await api.post.getAll.query();

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