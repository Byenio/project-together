import CreatePostForm from "./create-post-form";

export default function CreatePost() {

  return (
    <div className="max-w-[600px] m-auto">
      <div className="w-full text-center my-4">
        <h1 className="text-accent-content text-2xl p-8">Utwórz nowy post</h1>
      </div>
      <CreatePostForm />
    </div>
  )

}