import Link from "next/link"
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export function UserProfileDropdown() {

  return (
    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-300 rounded-xl w-52">
      <UserProfileData />
      <UserProfileDropdownItems />
      <SignOutButton />
    </ul>
  )
}

export async function UserProfileData() {

  const session = await getServerAuthSession();

  return (
    <>
      <li className="text-center text-primary-focus font-bold">{session?.user.name}</li>
      <li className="text-center text-primary-focus mb-5">{session?.user.email}</li>
    </>
  )
}

export async function UserProfileDropdownItems() {

  const isAdmin = await api.admin.isAdmin.query();
  const isTutor = await api.tutor.isTutor.query();

  return (
    <>
      {isTutor &&
        <li>
          <Link href={"/create-post"} className="rounded-xl">Nowy Post</Link>
        </li>
      }
      {isAdmin &&
        <li>
          <Link href={"/manage"} className="rounded-xl">Zarządzanie</Link>
        </li>
      }
      <li>
        <Link href={"/"} className="rounded-xl">Ustawienia</Link>
      </li>
      <li>
        <Link href={"/profile"} className="rounded-xl">Profil</Link>
      </li>
    </>
  )
}

export function SignOutButton() {
  return (
    <li>
      <Link
        href="/api/auth/signout"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20 m-auto mt-8"
      >
        Sign out
      </Link>
    </li>
  )
}