import { HomeButton } from "./home-button/home-button"
import { Menu } from "./menu/menu"
import { UserProfile } from "./user-profile/user-profile"


export function Navbar() {

  return (
    <>
      <div className="w-100 max-w-[1200px] m-auto my-3 flex">
        <div className="navbar rounded-xl bg-base-300">
          <HomeButton />
          <Menu />
          <div className="flex-none">
            <UserProfile />
          </div>
        </div>
      </div >
    </>
  )
}