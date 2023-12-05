"use client";

import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

function RiDeleteBinLine() {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth={0}
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
    >
      <g>
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z" />
      </g>
    </svg>
  );
}

export default function DeletePostButton({ postId }: { postId: string }) {
  const router = useRouter();

  const postDelete = api.post.deleteById.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <div className="card-actions justify-end">
      <button
        className="btn btn-error btn-sm text-error-content"
        onClick={() => postDelete.mutate({ postId })}
      >
        <RiDeleteBinLine />
      </button>
    </div>
  );
}
