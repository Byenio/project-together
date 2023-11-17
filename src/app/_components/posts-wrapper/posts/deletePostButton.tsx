"use client"

import { useRouter } from "next/navigation";
import { api } from "~/trpc/react"

export function DeletePostButton({ postId }: { postId: string }) {

  const router = useRouter();

  const postDelete = api.post.deleteById.useMutation({
    onSuccess: () => {
      router.refresh();
    }
  })

  return (
    <div className="card-actions justify-end">
      <button
        className="btn btn-error text-error-content"
        onClick={() => postDelete.mutate({ postId })}>
        Usun post
      </button>
    </div>
  )
}