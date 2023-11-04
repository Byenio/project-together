import Link from "next/link";

import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

import { Navbar } from "~/app/_components/navbar/navbar";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <>
      <Navbar />
      <p className="text-center text-2xl">
        {session && <span>Logged in as {session.user?.email}</span>}
      </p>
      <Link
        href={session ? "/api/auth/signout" : "/api/auth/signin"}
        className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
      >
        {session ? "Sign out" : "Sign in"}
      </Link>

      <CrudShowcase />
    </>
  );
}

async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const allPosts = await api.post.getAll.query();

  return (
    <>
      <div className="w-full max-w-xs">
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
