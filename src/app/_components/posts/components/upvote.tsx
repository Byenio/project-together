"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "~/trpc/react";

export function BiUpvote() {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth={0}
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
    >
      <path d="M12.781,2.375C12.4,1.9,11.6,1.9,11.219,2.375l-8,10c-0.24,0.301-0.286,0.712-0.12,1.059C3.266,13.779,3.615,14,4,14h2h2 v3v4c0,0.553,0.447,1,1,1h6c0.553,0,1-0.447,1-1v-5v-2h2h2c0.385,0,0.734-0.221,0.901-0.566c0.166-0.347,0.12-0.758-0.12-1.059 L12.781,2.375z M15,12h-1v1v3v4h-4v-3v-4v-1H9H6.081L12,4.601L17.919,12H15z" />
    </svg>
  );
}

export function BiDownvote() {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth={0}
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
    >
      <path d="M20.901,10.566C20.734,10.221,20.385,10,20,10h-2h-2V7V3c0-0.553-0.447-1-1-1H9C8.447,2,8,2.447,8,3v5v2H6H4 c-0.385,0-0.734,0.221-0.901,0.566c-0.166,0.347-0.12,0.758,0.12,1.059l8,10C11.409,21.862,11.696,22,12,22 s0.591-0.138,0.781-0.375l8-10C21.021,11.324,21.067,10.913,20.901,10.566z M12,19.399L6.081,12H9h1v-1V8V4h4v3v4v1h1h2.919 L12,19.399z" />
    </svg>
  );
}

export default function UpvoteButton({
  postId,
  upvoted,
}: {
  postId: string;
  upvoted: boolean;
}) {
  const router = useRouter();
  const postUpvotes = api.upvote.upvotesByPostId.useQuery({ postId }).data;
  const [upvotes, setUpvotes] = useState(postUpvotes ?? 0);

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

  return (
    <div className="card-actions justify-end">
      {upvoted ? (
        <button
          className="btn btn-warning btn-sm text-warning-content"
          onClick={() => {
            setUpvotes((prev) => prev! - 1);
            downvote.mutate({ postId });
          }}
          disabled={downvote.isLoading}
        >
          <BiDownvote />
          {upvotes ?? 0}
        </button>
      ) : (
        <button
          className="btn btn-outline btn-warning btn-sm text-warning-content"
          onClick={() => {
            setUpvotes((prev) => prev! + 1);
            upvote.mutate({ postId });
          }}
          disabled={upvote.isLoading}
        >
          <BiUpvote />
          {upvotes ?? 0}
        </button>
      )}
    </div>
  );
}
