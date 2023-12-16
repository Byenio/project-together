import Link from "next/link";
import DeletePostButton from "~/app/_components/posts/components/deletePostButton";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

async function getPost(id: string) {
  const res = await api.post.getById.query({ id });
  return res;
}

export default async function Post({ params }: { params: { id: string } }) {
  const session = await getServerAuthSession();

  const post = await getPost(params.id);

  const isAuthor = post?.createdBy.id === session?.user.id;

  return (
    <>
      <div className="card m-auto my-2 w-4/5 max-w-[800px] bg-neutral text-neutral-content">
        <div className="card-body">
          <div className="flex justify-between">
            <div className="card-title px-2 text-center">{post?.title}</div>
            <div className="card-actions justify-start">
              <Link href={`/search/user/${post?.createdBy.id}`}>
                <button className="">
                  <img
                    src={post?.createdBy.image ?? ""}
                    alt="user's profile pic"
                    className="h-[2.5rem]"
                    title={post!.createdBy.name ?? ""}
                  />
                </button>
              </Link>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="card-actions justify-start">
              <Link href={`/search?type=${post?.postType.id}`}>
                <button className="btn btn-accent btn-xs text-accent-content">
                  {post?.postType.name}
                </button>
              </Link>
            </div>
            <div className="card-actions justify-start">
              <Link href={`/search?subject=${post?.subject.id}`}>
                <button className="btn btn-accent btn-xs text-accent-content">
                  {post?.subject.name}
                </button>
              </Link>
            </div>
          </div>
          <div className="h-[100px] overflow-auto px-2">
            {post?.description}
          </div>
          <div className="flex justify-end gap-4">
            {isAuthor && <DeletePostButton postId={post!.id} />}
          </div>
        </div>
      </div>
    </>
  );
}
