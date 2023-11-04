import Link from 'next/link';

export function HomeButton() {
  return (
    <div className="flex-1">
      <Link
        className="btn btn-ghost normal-case text-xl rounded-xl"
        href={"/"}
      >
        ZSTI Together
      </Link>
    </div>
  )
}