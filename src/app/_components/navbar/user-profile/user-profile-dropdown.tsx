import Link from "next/link"
import { getServerAuthSession } from "~/server/auth";

export const menuItems = [
  {
    name: "Profile",
    link: "/"
  },
  {
    name: "Settings",
    link: '/'
  }
]

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

export function UserProfileDropdownItems() {

  return (
    <>
      {
        menuItems.map((item) => (
          <li>
            <Link href={item.link} className="rounded-xl">{item.name}</Link>
          </li>
        ))
      }
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