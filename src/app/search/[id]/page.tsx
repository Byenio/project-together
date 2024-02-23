import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Tooltip,
} from "@nextui-org/react";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { PostDelete } from "../post-card/post-delete";
import { PostSubject } from "../post-card/post-subject";
import { PostType } from "../post-card/post-type";

export default async function Post({ params }: { params: { id: string } }) {
  const session = await getServerAuthSession();
  const { role } = (await api.user.getRole.query()) ?? {
    role: {
      name: "USER",
      level: 0,
    },
  };

  const post = await api.post.getById.query({ id: params.id });

  const isAuthor = post?.createdBy.id === session?.user.id;
  const isModerator = role!.level >= 6;

  const canDelete = isAuthor || isModerator;

  return (
    <div className="w-100 m-auto my-3 flex max-w-[1200px] flex-wrap gap-4">
      <Card
        key={post?.id}
        className="w-min-[350px] mx-auto my-3 h-auto w-[600px] px-2 py-1"
      >
        <CardHeader className="justify-between">
          <div className="font-[600]">{post?.title}</div>
          <Tooltip
            content={post?.createdBy.fullname ?? ""}
            placement="top"
            color="primary"
            showArrow
          >
            <Avatar
              src={post?.createdBy.image ?? ""}
              isBordered
              color="primary"
            />
          </Tooltip>
        </CardHeader>
        <CardBody className="text-small text-default-500">
          <div className="flex justify-between">
            <PostType
              type={{ name: post!.postType.name, id: post!.postType.id }}
            />
            <PostSubject
              subject={{ name: post!.subject.name, id: post!.subject.id }}
            />
          </div>
          <div>
            <p className="px-1 pt-4">{post?.description}</p>
          </div>
        </CardBody>
        <CardFooter className="flex justify-end gap-3">
          {canDelete && <PostDelete id={post!.id} />}
        </CardFooter>
      </Card>
    </div>
  );
}
