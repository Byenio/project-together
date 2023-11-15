import CreateSubjectForm from "./create-subject-form";
import SubjectList from "./create-subject-list";

export default function CreateSubject() {

  return (
    <div className="max-w-[600px] m-auto">
      <div className="w-full text-center my-4">
        <h2 className="text-accent-content text-2xl p-8">Add post type</h2>
      </div>
      <CreateSubjectForm />
      <div className="w-full text-center my-4">
        <h2 className="text-accent-content text-2xl p-8">Created types</h2>
      </div>
      <SubjectList />
    </div>
  );
}
