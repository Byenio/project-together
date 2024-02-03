"use client";

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { DeleteIcon } from "../icons";

export function PostDelete({ id }: { id: string }) {
  const router = useRouter();

  const postDelete = api.post.deleteById.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <Button
      isIconOnly
      color="danger"
      size="sm"
      variant="light"
      onClick={() => postDelete.mutate({ postId: id })}
    >
      <DeleteIcon />
    </Button>
  );
}
