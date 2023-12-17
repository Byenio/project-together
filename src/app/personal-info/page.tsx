import PersonalInfoForm from "./personal-info-form";

export default function PersonalInfo() {
  return (
    <div className="m-auto max-w-[600px]">
      <div className="my-4 w-full text-center">
        <h2 className="p-8 text-2xl text-neutral-content">Enter your full name</h2>
      </div>
      <PersonalInfoForm />
    </div>
  );
}
