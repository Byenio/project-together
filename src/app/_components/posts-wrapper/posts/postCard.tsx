export function PostCard(
  { postData }: {
    postData:
    { id: string, title: string, postType: string, postSubject: string, description: string, createdBy: string }
  }
) {
  const { id, title, postType, postSubject, description, createdBy } = postData;

  return (
    <div key={id} className="card min-w-[500px] m-auto my-2 bg-primary text-primary-content">
      <div className="card-body">
        <PostTitle postTitle={title} />
        <div className="flex justify-between">
          <PostType postType={postType} />
          <PostSubject postSubject={postSubject} />
        </div>
        <PostDescription postDescription={description} />
        <PostCreatedBy postCreatedBy={createdBy} />
        <PostDetailsButton />
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
    <h3 className="capitalize text-base-content">{postType}</h3>
  )
}

export function PostSubject({ postSubject }: { postSubject: string }) {
  return (
    <h3 className="capitalize text-base-content">{postSubject}</h3>
  )
}

export function PostDescription({ postDescription }: { postDescription: string }) {
  return (
    <p className="h-[100px] overflow-y-auto">{postDescription}</p>
  )
}

export function PostCreatedBy({ postCreatedBy }: { postCreatedBy: string }) {
  return (
    <p className="text-right text-base-content">{postCreatedBy}</p>
  )
}

export function PostDetailsButton() {
  return (
    <div className="card-actions justify-end">
      <button className="btn">Details</button>
    </div>
  )
}