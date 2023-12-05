import { getServerAuthSession } from "~/server/auth";

export async function UserProfileAvatar() {
  const session = await getServerAuthSession();

  return (
    <label tabIndex={0} className="avatar btn btn-circle btn-ghost">
      <div className="w-10 rounded-full">
        <img src={session?.user.image ?? ""} />
      </div>
    </label>
  );
}
