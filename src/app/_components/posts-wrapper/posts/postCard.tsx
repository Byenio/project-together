import Link from "next/link";

export function PostCard(
  { postData }: {
    postData:
    { id: string, title: string, postType: string, postSubject: string, description: string, createdBy: string }
  }
) {
  const { id, title, postType, postSubject, description, createdBy } = postData;

  return (
    <div key={id} className="card min-w-[350px] w-[500px] m-auto my-2 bg-primary text-primary-content">
      <div className="card-body">
        <PostTitle postTitle={title} />
        <div className="flex justify-between">
          <PostType postType={postType} />
          <PostSubject postSubject={postSubject} />
        </div>
        <PostDescription postDescription={description} />
        <PostCreatedBy postCreatedBy={createdBy} />
        <PostDetailsButton postId={id} />
      </div>
    </div>
  )

}

export function PostTitle({ postTitle }: { postTitle: string }) {
  return (
    <h2 className="card-title">{postTitle}</h2>
  )
}

export function PostType({ postType }: { postType: string }) {
  return (
    <h3 className="capitalize text-accent-content badge badge-secondary p-4 my-2">{postType}</h3>
  )
}

export function PostSubject({ postSubject }: { postSubject: string }) {
  return (
    <h3 className="capitalize text-accent-content badge badge-secondary p-4 my-2">{postSubject}</h3>
  )
}

export function PostDescription({ postDescription }: { postDescription: string }) {
  return (
    <p className="h-[100px] overflow-y-auto">{postDescription}</p>
  )
}

export function PostCreatedBy({ postCreatedBy }: { postCreatedBy: string }) {
  return (
    <p className="text-right text-accent-content badge badge-secondary p-4 mt-2">{postCreatedBy}</p>
  )
}

export function PostDetailsButton({ postId }: { postId: string }) {
  return (
    <div className="card-actions justify-end mt-[-50px]">
      <Link href={`/post/${postId}`}>
        <button className="btn btn-secondary text-accent-content">Details</button>
      </Link>
    </div>
  )
}