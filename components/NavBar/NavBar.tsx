import React, { Suspense } from "react";
import Image from "next/image";
import { BottomNavBar } from "./BottomNavBar";
import { UserDropdown } from "@/components/NavBar/UserDropdown";
import { NavButton } from "./NavButton/NavButton";
import { HighlightedTextButton } from "../HighlightedTextButton";
import { NotificationButton } from "@/components/NavBar/Notifications/NotificationButton";
import { Avatar } from "./Avatar";
import { FeedbackButton } from "./FeedbackButton";

export const NavBar = () => {
  const navButtons = [
    {
      name: "Changelog",
      path: "http://vercel.com/changelog",
    },
    {
      name: "Help",
      path: "http://vercel.com/help",
    },
    {
      name: "Docs",
      path: "http://vercel.com/docs",
    },
  ];

  return (
    <div className="relative select-none">
      <nav className="flex h-16  items-center justify-between  text-neutral-400">
        <div className="flex items-center [@media(max-width:600px)]:pl-4">
          <div className="flex items-center pl-6 [@media(max-width:600px)]:hidden ">
            <Image src="/vercel.png" alt="Vercel Logo" width={26} height={26} />
            <div className="p-2">
              <svg
                width={24}
                height={24}
                className="fill-current text-neutral-900"
              >
                <path d="M16.88 3.549L7.12 20.451" stroke="currentColor" />
              </svg>
            </div>
          </div>
          <Suspense fallback={<div className="h-5 w-52 bg-neutral-600"></div>}>
            <UserDropdown />
          </Suspense>
        </div>
        <div className="flex items-center px-6">
          <div className="hidden p-2 md:block">
            <FeedbackButton />
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
          <NavButton>
            <Avatar width={30} height={30} />
          </NavButton>
        </div>
      </nav>
      <BottomNavBar />
    </div>
  );
};
