import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

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
      <li className="mb-2 text-center text-lg font-bold text-neutral-content">
        {session?.user.name}
      </li>
    </>
  );
}

export async function UserProfileDropdownItems() {
  const { role } = (await api.user.getRole.query()) ?? {
    role: {
      name: "USER",
      level: 0,
    },
  };

  if (!role) return null;

  const canPost = role.level >= 3;
  const canManage = role.level >= 6;

  return (
    <>
      {canPost && (
        <li>
          <Link href={"/create-post"} className="rounded-xl">
            Nowy Post
          </Link>
        </li>
      )}
      {canManage && (
        <li>
          <Link href={"/manage"} className="rounded-xl">
            Zarządzanie
          </Link>
        </li>
      )}
      {/* <li>
        <Link href={"/"} className="rounded-xl">
          Ustawienia
        </Link>
      </li>
      <li>
        <Link href={"/profile"} className="rounded-xl">
          Profil
        </Link>
      </li> */}
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
        Wyloguj się
      </Link>
    </li>
  );
}
