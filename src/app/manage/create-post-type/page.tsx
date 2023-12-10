import CreatePostTypeForm from "./create-post-type-form";
import PostTypeList from "./create-post-type-list";

export default function CreatePostType() {
  return (
    <div className="m-auto max-w-[600px]">
      <div className="my-4 w-full text-center">
        <h2 className="p-8 text-2xl text-neutral-content">Add post type</h2>
      </div>
      <CreatePostTypeForm />
      <div className="my-4 w-full text-center">
        <h2 className="p-8 text-2xl text-neutral-content">Created types</h2>
      </div>
      <PostTypeList />
    </div>
  );
}
