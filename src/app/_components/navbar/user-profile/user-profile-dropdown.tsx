import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";

export function UserProfileDropdown() {
  return (
    <>
      <ul
        tabIndex={0}
        className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-xl bg-base-300 px-3 py-4 shadow"
      >
        <UserProfileData />
        <UserProfileDropdownItems />
        <SignOutButton />
      </ul>
    </>
  );
}

export async function UserProfileData() {
  const session = await getServerAuthSession();

  return (
    <>
      <li className="text-center text-xs font-bold text-secondary-content">
        {session?.user.name}
      </li>
      <li className="mb-5 text-center text-xs text-secondary-content">
        {session?.user.email}
      </li>
    </>
  );
}

export async function UserProfileDropdownItems() {
  return (
    <>
      {true && (
        <li>
          <Link href={"/create-post"} className="rounded-xl">
            Nowy Post
          </Link>
        </li>
      )}
      {true && (
        <li>
          <Link href={"/manage"} className="rounded-xl">
            Zarządzanie
          </Link>
        </li>
      )}
      <li>
        <Link href={"/"} className="rounded-xl">
          Ustawienia
        </Link>
      </li>
      <li>
        <Link href={"/profile"} className="rounded-xl">
          Profil
        </Link>
      </li>
    </>
  );
}

export function SignOutButton() {
  return (
    <li>
      <Link
        href="/api/auth/signout"
        className="m-auto mt-8 rounded-md bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
      >
        Sign out
      </Link>
    </li>
  );
}
