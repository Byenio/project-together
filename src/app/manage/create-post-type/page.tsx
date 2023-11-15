import CreatePostTypeForm from "./create-post-type-form";
import PostTypeList from "./create-post-type-list";

export default function CreatePostType() {

  return (
    <div className="max-w-[600px] m-auto">
      <div className="w-full text-center my-4">
        <h2 className="text-accent-content text-2xl p-8">Add post type</h2>
      </div>
      <CreatePostTypeForm />
      <div className="w-full text-center my-4">
        <h2 className="text-accent-content text-2xl p-8">Created types</h2>
      </div>
      <PostTypeList />
    </div>
  );
}
