import Link from "next/link";

export default function Manage() {
  return (
    <div className="w-[100%]">
      <div className="m-auto text-center my-8">
        <Link href={'/manage/create-post-type'} className="btn btn-accent">Utwórz nowy typ postu</Link>
      </div>
      <div className="m-auto text-center my-8">
        <Link href={'/manage/create-subject'} className="btn btn-accent">Utwórz nowy przedmiot</Link>
      </div>
    </div>
  )
}