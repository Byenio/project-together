import { getServerAuthSession } from "~/server/auth";

export async function UserProfileAvatar() {

  const session = await getServerAuthSession();

  return (
    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
      <div className="w-10 rounded-full">
        <img src={session?.user.image || ""} />
      </div>
    </label>
  )
} 