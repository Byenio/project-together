import Link from 'next/link';
import DeletePostButton from '~/app/_components/posts/components/deletePostButton';
import { getServerAuthSession } from '~/server/auth';
import { api } from '~/trpc/server'

async function getPost(id: string) {
  const res = await api.post.getById.query({ id });
  return res;
}

export default async function Post({ params }: { params: { id: string } }) {

  const session = await getServerAuthSession();

  const post = await getPost(params.id);

  const isAuthor = post?.createdBy.id === session?.user.id;
  const isAdmin = () => {
    if (session?.user.id) return api.admin.isAdmin.query();
    return false;
  }

  return (
    <>
      <div className='card max-w-[800px] w-4/5 m-auto my-2 bg-neutral text-primary-content'>
        <div className='card-body'>
          <div className='flex justify-between'>
            <div className='card-title px-2 text-center'>{post?.title}</div>
            <div className="card-actions justify-start">
              <Link href={`/search/user/${post?.createdBy.id}`}>
                <button className="">
                  <img src={post?.createdBy.image ?? ""} alt="user's profile pic" className="h-[2.5rem]" title={post!.createdBy.name ?? ""} />
                </button>
              </Link>
            </div>
          </div>
          <div className='flex justify-between'>
            <div className="card-actions justify-start">
              <Link href={`/filter/type/${post?.postType.id}`}>
                <button className="btn btn-accent btn-xs text-accent-content">{post?.postType.name}</button>
              </Link>
            </div>
            <div className="card-actions justify-start">
              <Link href={`/filter/subject/${post?.subject.id}`}>
                <button className="btn btn-accent btn-xs text-accent-content">{post?.subject.name}</button>
              </Link>
            </div>
          </div>
          <div className="h-[100px] px-2 overflow-auto">{post?.description}</div>
          <div className="flex justify-end gap-4">
            {(isAuthor || isAdmin()) &&
              <DeletePostButton postId={post!.id} />
            }
          </div>
        </div>
      </div>
    </>
  )
}
