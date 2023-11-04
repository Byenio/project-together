import { Navbar } from "~/app/_components/navbar/navbar";
import { PostsWrapper } from "~/app/_components/posts-wrapper/posts-wrapper";

export default async function Home() {

  return (
    <>
      <Navbar />
      <PostsWrapper />
    </>
  );
}
