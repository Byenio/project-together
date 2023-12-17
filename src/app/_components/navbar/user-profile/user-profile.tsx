import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";
import { UserProfileAvatar } from "./user-profile-avatar";
import { UserProfileDropdown } from "./user-profile-dropdown";

export async function UserProfile() {
  const session = await getServerAuthSession();

  return (
    <div className="dropdown dropdown-end">
      {session ? (
        <>
          <UserProfileAvatar />
          <UserProfileDropdown />
        </>
      ) : (
        <SignInButton />
      )}
    </div>
  );
}

export function SignInButton() {
  return (
    <Link
      href="/api/auth/signin"
      className="m-auto mt-8 rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
    >
      Zaloguj się
    </Link>
  );
}
