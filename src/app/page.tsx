import Link from "next/link";

import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

import { Navbar } from "~/app/_components/navbar/navbar";

export default async function Home() {

  return (
    <>
      <Navbar />
      <Posts />
    </>
  );
}

async function Posts() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const allPosts = await api.post.getAll.query();

  return (
    <>
      <div className="w-100 max-w-[1200px] m-auto my-3 flex flex-wrap">
        {allPosts ? (
          allPosts.map((post) => (
            <div key={post.id}>
              <div>{post.title}</div>
              <div>{post.description}</div>
              <div>{post.createdBy.name}</div>
            </div>
          ))
        ) : (
          <p>No posts to show right now.</p>
        )}
      </div>
    </>
  );
}
