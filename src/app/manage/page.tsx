import Link from "next/link";

export default function Manage() {
  return (
    <>
      <Link href={'/manage/create-post-type'} className="btn">cpt</Link>
      <Link href={'/manage/create-subject'} className="btn">cs</Link>
    </>
  )
}