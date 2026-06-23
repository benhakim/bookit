"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SignInButton, UserButton, useUser, Show } from "@clerk/nextjs";

const navItems = [
  {
    label: "Library",
    href: "/",
  },
  {
    label: "Add New",
    href: "/books/new",
  },
];
const Navbar = () => {
  const pathName = usePathname();
  const { user} = useUser();
  return (
    <header className="w-full fixed z-50 bg-(--bg-primary)">
      <div className="wrapper navbar-right py-4 flex items-center justify-between">
        <Link href="/" className="flex gap-0.5 items-center ">
          <Image
            src="/assets/logo.png"
            alt="Bookit Logo"
            width={42}
            height={26}
            className="rounded-sm"
          />
          <span className="logo-text">Bookified</span>
        </Link>
        <nav className="flex w-fit gap-7.5 items-center">
          {navItems.map(({ label, href }) => {
            const isActive =
              pathName === href || (href !== "/" && pathName.startsWith(href));
            return (
              <Link
                key={label}
                href={href}
                className={cn(
                  "nav-link-base",
                  isActive ? "nav-link-active" : "text-black hover:opacity-70",
                )}
              >
                {label}
              </Link>
            );
          })}

          <div className="flex items-center gap-7.5">
            <Show when="signed-out">
              <SignInButton mode="modal" />
            </Show>
            <Show when="signed-in">
              <div className="nav-user-link">
                <UserButton />
                {user?.firstName && (
                  <Link href="/subscription" className="nav-user-name">
                    {user.firstName}
                  </Link>
                )}
               
              </div>
            </Show>

          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
