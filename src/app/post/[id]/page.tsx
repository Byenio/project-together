import React from 'react'
import { api } from '~/trpc/server'

export async function getPost(id: string) {
  const res = await api.post.getById.query({ id });
  return res;
}

export default async function Post({ params }: { params: { id: string } }) {

  const post = await getPost(params.id);

  return (
    <div>{post?.title}</div>
  )
}
