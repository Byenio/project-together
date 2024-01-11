import { DiscordButton } from "./discord";
import { HomeButton } from "./home-button/home-button";
import { UserProfile } from "./user-profile/user-profile";

export function Navbar() {
  return (
    <>
      <div className="w-100 m-auto my-3 flex max-w-[1200px]">
        <div className="navbar rounded-xl">
          <HomeButton />
          <div className="flex-none">
            <DiscordButton />
            <UserProfile />
          </div>
        </div>
      </div>
    </>
  );
}
