import PersonalInfoForm from "./form";

export default function PersonalInfo() {
  return (
    <div className="m-auto max-w-[600px]">
      <div className="my-4 w-full text-center">
        <h2 className="text-neutral-content p-8 text-2xl">
          Podaj pełne imię i nazwisko
        </h2>
      </div>
      <PersonalInfoForm />
    </div>
  );
}
