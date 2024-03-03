"use client";

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { DownvoteIcon, UpvoteIcon } from "~/app/(components)/icons";
import { api } from "~/trpc/react";

export default function VoteButton({
  postId,
  upvoted,
  currentUpvotes,
}: {
  postId: string;
  upvoted: boolean;
  currentUpvotes: number;
}) {
  const router = useRouter();

  const upvote = api.upvote.handleUpvote.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const downvote = api.upvote.handleDownvote.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const handleVote = () => {
    upvoted ? downvote.mutate({ postId }) : upvote.mutate({ postId });
  };

  return (
    <>
      <Button
        size="sm"
        isIconOnly
        color={upvoted ? "secondary" : "default"}
        className="w-[60px]"
        onClick={handleVote}
        isDisabled={downvote.isLoading || upvote.isLoading}
      >
        <div className="flex flex-wrap items-center gap-1">
          {upvoted ? <DownvoteIcon /> : <UpvoteIcon />}
          {currentUpvotes ?? 0}
        </div>
      </Button>
    </>
  );
}
