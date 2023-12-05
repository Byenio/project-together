import Link from "next/link";

export function HomeButton() {
  return (
    <div className="flex-1">
      <Link className="btn btn-ghost rounded-xl text-xl normal-case" href={"/"}>
        ZSTI Together
      </Link>
    </div>
  );
}
