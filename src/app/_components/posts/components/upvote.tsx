"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";

export function BiUpvote() {
  return <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 24 24" height="1em" width="1em"><path d="M12.781,2.375C12.4,1.9,11.6,1.9,11.219,2.375l-8,10c-0.24,0.301-0.286,0.712-0.12,1.059C3.266,13.779,3.615,14,4,14h2h2 v3v4c0,0.553,0.447,1,1,1h6c0.553,0,1-0.447,1-1v-5v-2h2h2c0.385,0,0.734-0.221,0.901-0.566c0.166-0.347,0.12-0.758-0.12-1.059 L12.781,2.375z M15,12h-1v1v3v4h-4v-3v-4v-1H9H6.081L12,4.601L17.919,12H15z" /></svg>;
}

export default function UpvoteButton({ postId }: { postId: string }) {

  const router = useRouter();
  const upvotes = api.upvote.upvotesByPostId.useQuery({ postId }).data;

  const upvote = api.upvote.handleVote.useMutation({
    onSuccess: () => {
      router.refresh();
    }
  })

  return (
    <div className="card-actions justify-end">
      <button
        className="btn btn-warning btn-sm text-error-content"
        onClick={() => {
          upvote.mutate({ postId })
        }}>
        <BiUpvote />{upvotes ?? 0}
      </button>
    </div >
  )
}