import CreatePostForm from "./create-post-form";

export default function CreatePost() {
  return (
    <div className="m-auto max-w-[600px]">
      <div className="my-4 w-full text-center">
        <h1 className="p-8 text-2xl text-neutral-content">Utwórz nowy post</h1>
      </div>
      <CreatePostForm />
    </div>
  );
}
