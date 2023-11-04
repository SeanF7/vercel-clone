import React from "react";
import Image from "next/image";
import { BottomNavBar } from "./BottomNavBar";
import Link from "next/link";
import { UserDropdown } from "./UserDropdown";
import { NavButton } from "./NavButton";
import { HighlightedTextButton } from "./HighlightedTextButton";

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
    <div>
      <nav className="flex h-10 items-center justify-between px-6 pb-5 pt-8 text-neutral-400">
        <div className="flex items-center">
          <Image
            src="/vercel.svg"
            alt="Vercel Logo"
            width={26}
            height={26}
            className="hidden md:block"
          />
          <div className="p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              className="hidden fill-current text-neutral-900 md:block"
            >
              <path
                d="M16.88 3.549L7.12 20.451"
                stroke-width="2"
                stroke="currentColor"
              />
            </svg>
          </div>
          <UserDropdown />
        </div>
        <div className="flex items-center">
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
            <button className="rounded-full border border-gray-800 p-2 ">
              <span>
                <svg
                  data-testid="geist-icon"
                  height="16"
                  stroke-linejoin="round"
                  width="16"
                  viewBox="0 0 16 16"
                  className="fill-current text-gray-400 "
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.9925 0C4.95079 0 2.485 2.46579 2.485 5.5075V8.22669C2.485 8.77318 2.21321 9.28388 1.75992 9.58912L1.33108 9.8779L1 10.1009V10.5V11.25V12H1.75H14.25H15V11.25V10.5V10.0986L14.666 9.87596L14.2306 9.58565C13.7741 9.28137 13.5 8.76913 13.5 8.22059V5.5075C13.5 2.46579 11.0342 0 7.9925 0ZM3.985 5.5075C3.985 3.29422 5.77922 1.5 7.9925 1.5C10.2058 1.5 12 3.29422 12 5.5075V8.22059C12 9.09029 12.36 9.91233 12.9801 10.5H3.01224C3.62799 9.91235 3.985 9.09303 3.985 8.22669V5.5075ZM10.7486 13.5H9.16778L9.16337 13.5133C9.09591 13.716 8.94546 13.9098 8.72067 14.0501C8.52343 14.1732 8.27577 14.25 8.00002 14.25C7.72426 14.25 7.47661 14.1732 7.27936 14.0501C7.05458 13.9098 6.90412 13.716 6.83666 13.5133L6.83225 13.5H5.25143L5.41335 13.9867C5.60126 14.5516 5.99263 15.0152 6.48523 15.3226C6.92164 15.5949 7.44461 15.75 8.00002 15.75C8.55542 15.75 9.07839 15.5949 9.5148 15.3226C10.0074 15.0152 10.3988 14.5516 10.5867 13.9867L10.7486 13.5Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </span>
            </button>
          </div>
          <NavButton />
        </div>
      </nav>
      <BottomNavBar />
    </div>
  );
};
