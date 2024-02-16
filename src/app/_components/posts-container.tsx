import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Link,
  Tooltip,
} from "@nextui-org/react";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "~/server/api/root";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { ChevronRightIcon } from "./icons";
import { PostDelete } from "./posts-container/post-delete";
import { PostSubject } from "./posts-container/post-subject";
import { PostType } from "./posts-container/post-type";

type RouterOutput = inferRouterOutputs<AppRouter>;
type PostsGetOutput = RouterOutput["post"]["getAll"];

export async function PostsContainer({ posts }: { posts: PostsGetOutput }) {
  const session = await getServerAuthSession();
  const { role } = (await api.user.getRole.query()) ?? {
    role: {
      name: "USER",
      level: 0,
    },
  };

  const isModerator = role!.level >= 6;

  return posts.map((post) => {
    const isAuthor = post.createdBy.id === session?.user.id;
    const canDelete = isAuthor || isModerator;

    return (
      <Card
        key={post.id}
        className="w-min-[350px] mx-auto my-3 h-auto w-[500px] px-2 py-1"
      >
        <CardHeader className="justify-between">
          <div className="font-[600]">{post.title}</div>
          <Tooltip
            content={post.createdBy.fullname}
            placement="top"
            color="primary"
            showArrow
          >
            <Avatar
              src={post.createdBy.image ?? ""}
              isBordered
              color="primary"
            />
          </Tooltip>
        </CardHeader>
        <CardBody className="py-0 text-small text-default-500">
          <div className="flex justify-between">
            <PostType
              type={{ name: post.postType.name, id: post.postType.id }}
            />
            <PostSubject
              subject={{ name: post.subject.name, id: post.subject.id }}
            />
          </div>
          <div>
            <p className="px-1 pt-4">{post.description}</p>
          </div>
        </CardBody>
        <CardFooter className="flex justify-end gap-3">
          {canDelete && <PostDelete id={post.id} />}
          <Button
            as={Link}
            href={`/search/post/${post.id}`}
            isIconOnly
            color="primary"
            size="sm"
            variant="flat"
          >
            <ChevronRightIcon />
          </Button>
        </CardFooter>
      </Card>
    );
  });
}
