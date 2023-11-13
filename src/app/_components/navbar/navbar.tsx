import { HomeButton } from "./home-button/home-button"
import { UserProfile } from "./user-profile/user-profile"


export function Navbar() {

  return (
    <>
      <div className="w-100 max-w-[1200px] m-auto my-3 flex">
        <div className="navbar rounded-xl">
          <HomeButton />
          <div className="flex-none">
            <UserProfile />
          </div>
        </div>
      </div >
    </>
  )
}