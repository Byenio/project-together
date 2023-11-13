import Link from "next/link";

export function PostCard(
  { postData }: {
    postData:
    { id: string, title: string, postType: string, postSubject: string, description: string, user: string, userImage: string }
  }
) {
  const { id, title, postType, postSubject, description, user, userImage } = postData;

  return (
    <div key={id} className="card min-w-[350px] w-[500px] m-auto my-2 bg-neutral text-primary-content">
      <div className="card-body">
        <div className="flex justify-between">
          <PostTitle postTitle={title} />
          <PostCreatedBy user={{ user, userImage }} />
        </div>
        <div className="flex justify-between">
          <PostType postType={postType} />
          <PostSubject postSubject={postSubject} />
        </div>
        <PostDescription postDescription={description} />
        <PostDetailsButton postId={id} />
      </div>
    </div>
  )

}

export function PostTitle({ postTitle }: { postTitle: string }) {
  return (
    <h2 className="card-title px-2">{postTitle}</h2>
  )
}

export function PostType({ postType }: { postType: string }) {
  return (
    <div className="card-actions justify-start">
      <Link href={`/search/type/${postType}`}>
        <button className="btn btn-accent btn-xs text-accent-content">{postType}</button>
      </Link>
    </div>
  )
}

export function PostSubject({ postSubject }: { postSubject: string }) {
  return (
    <div className="card-actions justify-start">
      <Link href={`/search/subject/${postSubject}`}>
        <button className="btn btn-accent btn-xs text-accent-content">{postSubject}</button>
      </Link>
    </div>
  )
}

export function PostDescription({ postDescription }: { postDescription: string }) {
  return (
    <p className="h-[100px] px-2 overflow-y-auto">{postDescription}</p>
  )
}

export function PostCreatedBy({ user }: { user: { user: string, userImage: string } }) {
  return (
    <div className="card-actions justify-start">
      <Link href={`/search/user/${user.user}`}>
        <button className="">
          <img src={user.userImage} alt="user's profile pic" className="h-[2.5rem]" title={user.user} />
        </button>
      </Link>
    </div>
  )
}

export function PostDetailsButton({ postId }: { postId: string }) {
  return (
    <div className="card-actions justify-end">
      <Link href={`/search/post/${postId}`}>
        <button className="btn btn-accent text-accent-content">Więcej</button>
      </Link>
    </div>
  )
}