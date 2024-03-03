"use client";

import {
  Accordion,
  AccordionItem,
  Avatar,
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
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
import { changelog } from "~/app/changelog/changelog";
import { ChevronDownIcon, DiscordIcon, LogoutIcon } from "../icons";
import { MenuItem, UserData } from "../nav";

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

export function NavMenuLogged({ menuItems, userData }: INavMenu) {
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
          <NavbarItem key={`${item.name}-${index}`}>
            {item.subitems ? (
              <Dropdown placement="bottom-start" backdrop="blur">
                <DropdownTrigger>
                  <Button
                    disableRipple
                    radius="sm"
                    variant="light"
                    endContent={<ChevronDownIcon />}
                  >
                    {item.name}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Zarządzanie" variant="flat">
                  {item.subitems.map((subitem, index) => (
                    <DropdownItem
                      key={`${subitem.name}-${index}`}
                      href={subitem.link}
                      startContent={subitem.icon}
                    >
                      {subitem.name}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            ) : (
              <Button
                disableRipple
                radius="sm"
                variant="light"
                as={Link}
                href={item.link}
                endContent={item.icon}
              >
                {item.name}
              </Button>
            )}
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarMenu>
        <Spacer y={4} />
        {menuItems?.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            {item.subitems ? (
              <Accordion>
                <AccordionItem
                  key={`${item.name}-${index}`}
                  aria-label={item.name}
                  title={item.name}
                >
                  {item.subitems.map((subitem, index) => (
                    <>
                      <Button
                        as={Link}
                        key={`${subitem.name}-${index}`}
                        variant="light"
                        className="bg-transparent p-2 data-[hover=true]:bg-transparent"
                        href={subitem.link}
                        startContent={subitem.icon}
                      >
                        {subitem.name}
                      </Button>
                      <br />
                    </>
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
  const currentVersion = changelog[0]?.version;

  return (
    <NavbarContent as="div" justify="end">
      <Dropdown placement="bottom-end" backdrop="blur">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            color="primary"
            name={userData.name ?? "username"}
            src={userData.image ?? ""}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownSection showDivider>
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Zalogowano jako</p>
              <p className="text-default-500">{userData.email}</p>
            </DropdownItem>
          </DropdownSection>
          <DropdownSection showDivider>
            {/* <DropdownItem
              key="settings"
              href="/settings"
              endContent={<SettingsIcon />}
            >
              Ustawienia
            </DropdownItem> */}
            <DropdownItem
              key="changelog"
              href="/changelog"
              endContent={
                <Chip color="secondary" size="sm">
                  {currentVersion}
                </Chip>
              }
            >
              Changelog
            </DropdownItem>
          </DropdownSection>
          <DropdownItem
            key="discord"
            href="https://discord.gg/fD7xM55CAC"
            endContent={<DiscordIcon />}
          >
            Pomoc & Feedback
          </DropdownItem>
          <DropdownItem
            key="logout"
            color="danger"
            href="/api/auth/signout"
            endContent={<LogoutIcon />}
          >
            Wyloguj Się
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </NavbarContent>
  );
}
