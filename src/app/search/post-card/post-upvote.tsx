"use client";

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "~/trpc/react";
import { DownvoteIcon, UpvoteIcon } from "../../(components)/icons";

export default function UpvoteButton({
  postId,
  upvoted,
  currentUpvotes,
}: {
  postId: string;
  upvoted: boolean;
  currentUpvotes: number;
}) {
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);
  const [upvotes, setUpvotes] = useState(currentUpvotes ?? 0);

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

  const handleUpvote = () => {
    setDisabled(true);
    setUpvotes((prev: number) => prev + 1);
    upvote.mutate({ postId });
    setTimeout(() => {
      setDisabled(false);
    }, 1000);
  };

  const handleDownvote = () => {
    setDisabled(true);
    setUpvotes((prev: number) => prev - 1);
    downvote.mutate({ postId });
    setTimeout(() => {
      setDisabled(false);
    }, 1000);
  };

  return (
    <>
      {upvoted ? (
        <Button
          size="sm"
          isIconOnly
          color="secondary"
          className="w-[40px]"
          onClick={handleDownvote}
          isDisabled={disabled}
        >
          <div className="flex flex-wrap items-center gap-1">
            <DownvoteIcon />
            {upvotes ?? 0}
          </div>
        </Button>
      ) : (
        <Button
          size="sm"
          isIconOnly
          className="w-[40px]"
          onClick={handleUpvote}
          isDisabled={disabled}
        >
          <div className="flex flex-wrap items-center gap-1">
            <UpvoteIcon />
            {upvotes ?? 0}
          </div>
        </Button>
      )}
    </>
  );
}
