import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import {
  ManageIcon,
  NewPostIcon,
  PostTypesIcon,
  RolesIcon,
  SubjectsIcon,
  UsersIcon,
} from "./icons";
import NavMenuLogged, { NavMenuNotLogged } from "./nav/nav-items";

export interface MenuSubitem {
  name: string;
  link: string;
  icon: JSX.Element;
}

export interface MenuItem {
  name: string;
  link?: string;
  icon: JSX.Element;
  subitems?: MenuSubitem[];
}

export interface UserData {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export default async function Nav() {
  const session = await getServerAuthSession();

  if (!session) return <NavMenuNotLogged />;

  const menuItems = await getMenuItems();
  const userData: UserData = session.user;

  return <NavMenuLogged menuItems={menuItems} userData={userData} />;
}

async function getUserRole() {
  const { role } = (await api.user.getRole.query()) ?? {
    role: {
      name: "USER",
      level: 0,
    },
  };
  return { role };
}

async function getMenuItems(): Promise<MenuItem[] | undefined> {
  const { role } = await getUserRole();

  if (!role) return undefined;

  const canPost = role.level >= 3;
  const canManage = role.level >= 6;

  const icons = {
    new: <NewPostIcon />,
    manage: <ManageIcon />,
    subjects: <SubjectsIcon />,
    types: <PostTypesIcon />,
    roles: <RolesIcon />,
    users: <UsersIcon />,
  };

  const postMenu = {
    name: "Nowy Post",
    link: "/create-post",
    icon: icons.new,
  };

  const manageMenu = {
    name: "Zarządzanie",
    icon: icons.manage,
    subitems: [
      {
        name: "Użytkownicy",
        link: "/manage/users",
        icon: icons.users,
      },
      {
        name: "Przedmioty",
        link: "/manage/subjects",
        icon: icons.subjects,
      },
      {
        name: "Typy postów",
        link: "/manage/post-types",
        icon: icons.types,
      },
      {
        name: "Role użytkowników",
        link: "/manage/roles",
        icon: icons.roles,
      },
    ],
  };

  if (canManage) {
    return [postMenu, manageMenu];
  }

  if (canPost) {
    return [postMenu];
  }

  return undefined;
}
