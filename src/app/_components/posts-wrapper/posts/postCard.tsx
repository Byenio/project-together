import { getServerAuthSession } from "~/server/auth";
import DeletePostButton from "./components/deletePostButton";
import { PostTitle } from "./components/PostTitle";
import { PostType } from "./components/PostType";
import { PostSubject } from "./components/PostSubject";
import { PostDescription } from "./components/PostDescription";
import { PostCreatedBy } from "./components/PostCreatedBy";
import { PostDetailsButton } from "./components/PostDetailsButton";

export async function PostCard(
  { postData }: {
    postData:
    { id: string, title: string, postType: string, postTypeId: string, postSubject: string, postSubjectId: string, description: string, user: string, userId: string, userImage: string }
  }
) {
  const { id, title, postType, postTypeId, postSubject, postSubjectId, description, user, userId, userImage } = postData;

  const session = await getServerAuthSession()

  return (
    <div key={id} className="card min-w-[350px] w-[500px] m-auto my-2 bg-neutral text-primary-content">
      <div className="card-body">
        <div className="flex justify-between">
          <PostTitle postTitle={title} />
          <PostCreatedBy user={{ user, userId, userImage }} />
        </div>
        <div className="flex justify-between">
          <PostType type={{ postType, postTypeId }} />
          <PostSubject subject={{ postSubject, postSubjectId }} />
        </div>
        <PostDescription postDescription={description} />
        <div className="flex justify-end gap-4">
          {userId === session?.user.id &&
            <DeletePostButton postId={id} />
          }
          <PostDetailsButton postId={id} />
        </div>
      </div>
    </div>
  )

}