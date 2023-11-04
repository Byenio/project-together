export function PostCard(
  { postData }: { postData: { id: string, title: string, description: string, createdBy: string } }
) {
  const { id, title, description, createdBy } = postData;

  return (
    <div key={id} className="card min-w-[500px] m-auto my-2 bg-primary text-primary-content">
      <div className="card-body">
        <PostTitle postTitle={title} />
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

export function PostDescription({ postDescription }: { postDescription: string }) {
  return (
    <p>{postDescription}</p>
  )
}

export function PostCreatedBy({ postCreatedBy }: { postCreatedBy: string }) {
  return (
    <p className="text-right">{postCreatedBy}</p>
  )
}

export function PostDetailsButton() {
  return (
    <div className="card-actions justify-end">
      <button className="btn">Details</button>
    </div>
  )
}