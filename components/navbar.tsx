"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { useState } from "react";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { HeartFilledIcon, SearchIcon, Logo } from "@/components/icons";
import { poppins } from "@/app/fonts";
import { removeUser } from "@/lib/cookies";
import { UserFull } from "@/types";

export const Navbar = ({ user }: { user: UserFull }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentPath = usePathname();
  const normalizePath = (path?: string) => {
    if (!path) return "/";

    const base = path.split("?")[0].split("#")[0];
    const trimmed = base.replace(/\/+$/, "");

    return trimmed === "" ? "/" : trimmed;
  };

  const isActive = (href: string) => {
    const current = normalizePath(currentPath);
    const target = normalizePath(href);

    return current === target;
  };

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <HeroUINavbar
      isMenuOpen={isMenuOpen}
      maxWidth="xl"
      position="sticky"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className={`font-bold ${poppins.className}`}>NomadHub</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                aria-current={isActive(item.href) ? "page" : undefined}
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-default-500 data-[active=true]:font-medium",
                )}
                color="foreground"
                data-active={isActive(item.href)}
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Button
            as={Link}
            className="text-sm font-normal text-default-600 bg-default-100"
            href="/donate"
            startContent={<HeartFilledIcon className="text-danger" />}
            variant="flat"
          >
            Faire un don
          </Button>
        </NavbarItem>

        <NavbarItem className="hidden md:flex">
          {user ? (
            <Button as={Link} onPress={removeUser}>
              Logout
            </Button>
          ) : (
            <Button as={Link} href="/sign-in">
              Connexion
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        />
      </NavbarContent>

      <NavbarMenu>
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className={clsx(isActive(item.href) && "text-default-500")}
                color="foreground"
                href={item.href}
                size="lg"
                onPress={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
