import React from 'react'
import { api } from '~/trpc/server'

async function getPost(id: string) {
  const res = await api.post.getById.query({ id });
  return res;
}

export default async function Post({ params }: { params: { id: string } }) {

  const post = await getPost(params.id);

  return (
    <>
      <div className='max-w-[1200px] w-4/5 m-auto'>
        <div className='text-center'>{post?.title}</div>
        <div className='flex'>
          <p className='text-start w-1/2'>{post?.subject.name}</p>
          <p className='text-end w-1/2'>{post?.postType.name}</p>
        </div>
        <div className="text-center">{post?.description}</div>
        <div className="text-end">{post?.createdBy.name}</div>
      </div>
    </>
  )
}
