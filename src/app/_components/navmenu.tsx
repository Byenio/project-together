"use client";

import {
  Accordion,
  AccordionItem,
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Spacer,
} from "@nextui-org/react";
import { useState } from "react";
import { ChevronDownIcon } from "./icons";
import { MenuItem, UserData } from "./nav";

interface MenuItems {
  menuItems?: MenuItem[];
}

interface INavMenu {
  menuItems?: MenuItem[];
  userData: UserData;
}

interface INavMenuAvatar {
  userData: UserData;
}

export default function NavMenuLogged({ menuItems, userData }: INavMenu) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Navbar onMenuOpenChange={setIsOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavMenuLogo />
      </NavbarContent>
      <NavMenuItems menuItems={menuItems} />
      <NavMenuAvatar userData={userData} />
    </Navbar>
  );
}

export function NavMenuNotLogged() {
  return (
    <Navbar>
      <NavbarContent>
        <NavMenuLogo />
      </NavbarContent>
      <NavMenuLogin />
    </Navbar>
  );
}

export function NavMenuLogo() {
  return (
    <NavbarBrand>
      <Link
        className="btn btn-ghost rounded-xl text-xl font-bold normal-case"
        color="foreground"
        href={"/"}
      >
        ZSTI Together
      </Link>
    </NavbarBrand>
  );
}

export function NavMenuLogin() {
  return (
    <NavbarContent justify="end">
      <NavbarItem>
        <Button
          as={Link}
          color="primary"
          href="/api/auth/signin"
          variant="flat"
        >
          Zaloguj się
        </Button>
      </NavbarItem>
    </NavbarContent>
  );
}

export function NavMenuItems({ menuItems }: MenuItems) {
  return (
    <>
      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        {menuItems?.map((item, index) => (
          <NavbarItem key={`${item}-${index}`}>
            {item.subitems ? (
              <Dropdown placement="bottom-start">
                <DropdownTrigger>
                  <Button
                    disableRipple
                    className="bg-transparent p-2 data-[hover=true]:bg-transparent"
                    radius="sm"
                    size="lg"
                    endContent={<ChevronDownIcon />}
                  >
                    {item.name}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Zarządzanie" variant="flat">
                  {item.subitems.map((subitem, index) => (
                    <DropdownItem
                      key={`${subitem}-${index}`}
                      href={subitem.link}
                    >
                      <p>
                        {subitem.icon} {subitem.name}
                      </p>
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            ) : (
              <Link color="foreground" href={item.link}>
                {item.name}
              </Link>
            )}
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarMenu>
        <Spacer y={4} />
        {menuItems?.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            {item.subitems ? (
              <Accordion>
                <AccordionItem
                  key={`${item}-${index}`}
                  aria-label={item.name}
                  title={item.name}
                >
                  {item.subitems.map((subitem, index) => (
                    <Button
                      as={Link}
                      key={`${subitem}-${index}`}
                      variant="light"
                      disableRipple
                      className="block bg-transparent p-2 data-[hover=true]:bg-transparent"
                      radius="sm"
                      size="lg"
                      href={subitem.link}
                    >
                      {subitem.icon} {subitem.name}
                    </Button>
                  ))}
                </AccordionItem>
              </Accordion>
            ) : (
              <Link
                color="foreground"
                className="w-full px-[.4em] text-center text-lg"
                href={item.link}
              >
                {item.name}
              </Link>
            )}
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </>
  );
}

export function NavMenuAvatar({ userData }: INavMenuAvatar) {
  return (
    <NavbarContent as="div" justify="end">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            color="primary"
            name={userData.name ?? "username"}
            size="sm"
            src={userData.image ?? ""}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Zalogowano jako</p>
            <p className="font-semibold">{userData.email}</p>
          </DropdownItem>
          <DropdownItem key="settings" href="/settings">
            Ustawienia
          </DropdownItem>
          <DropdownItem key="logout" color="danger" href="/api/auth/signout">
            Wyloguj się
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </NavbarContent>
  );
}
