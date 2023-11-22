import Link from "next/link";

export function PostCreatedBy({ user }: { user: { user: string; userId: string; userImage: string; }; }) {
  return (
    <div className="card-actions justify-start">
      <Link href={`/search/user/${user.userId}`}>
        <button className="">
          <img src={user.userImage} alt="user's profile pic" className="h-[2.5rem]" title={user.user} />
        </button>
      </Link>
    </div>
  );
}
