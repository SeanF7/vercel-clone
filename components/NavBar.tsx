import React from "react";
import Image from "next/image";
import { BottomNavBar } from "./BottomNavBar";
import { UserDropdown } from "./UserDropdown";
import { NavButton } from "./NavButton";
import { HighlightedTextButton } from "./HighlightedTextButton";
import { NotificationButton } from "./NotificationButton";

export const NavBar = () => {
  const navButtons = [
    {
      name: "Changelog",
      path: "/changelog",
    },
    {
      name: "Help",
      path: "/help",
    },
    {
      name: "Docs",
      path: "/docs",
    },
  ];

  return (
    <div className="relative">
      <nav className="flex h-16  items-center justify-between  text-neutral-400">
        <div className="flex items-center [@media(max-width:600px)]:pl-4">
          <div className="flex items-center pl-6 [@media(max-width:600px)]:hidden ">
            <Image src="/vercel.svg" alt="Vercel Logo" width={26} height={26} />
            <div className="p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                className="fill-current text-neutral-900"
              >
                <path d="M16.88 3.549L7.12 20.451" stroke="currentColor" />
              </svg>
            </div>
          </div>
          <UserDropdown />
        </div>
        <div className="flex items-center px-6">
          <div className="hidden p-2 md:block">
            <HighlightedTextButton
              text="Feedback"
              link="/feedback"
              classes="rounded-md bg-neutral-950 px-3 py-2  shadow-[0_0px_0px_1px] shadow-neutral-800 "
            />
          </div>
          {navButtons.map((link) => (
            <HighlightedTextButton
              text={link.name}
              link={link.path}
              classes="hidden px-3 md:block"
              key={link.name}
            />
          ))}
          <div className="p-2">
            <NotificationButton />
          </div>
          <NavButton />
        </div>
      </nav>
      <BottomNavBar />
    </div>
  );
};
