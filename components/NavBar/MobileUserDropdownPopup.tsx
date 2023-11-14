"use client";
import { SearchBar } from "@/components/SearchBar";
import { useState } from "react";
import Image from "next/image";
import { usePopupExits } from "@/lib/hooks/usePopupExits";

type MobileUserDropdownPopupProps = {
  avatar: string;
};

export const MobileUserDropdownPopup = ({
  avatar,
}: MobileUserDropdownPopupProps) => {
  const [search, setSearch] = useState("");

  return (
    <>
      <div className="fixed top-0 z-50 left-0 w-full h-full opacity-75 bg-black"></div>
      <div className="fixed z-50 bottom-0 left-0 h-[380px] w-full bg-black">
        <div className="flex flex-col">
          <SearchBar
            inputValue={search}
            placeHolderText="Find Team..."
            setInputValue={setSearch}
            classes="rounded-b-none"
          />
          <div>
            <div className="flex-col py-6 text-sm">
              <h1 className="px-4 pb-2 text-neutral-400">Personal Account</h1>
              <ul className="px-2">
                <li className="flex h-10 items-center justify-between gap-2 rounded-md bg-neutral-700 px-2">
                  <div className="flex items-center gap-2">
                    <Image
                      src={avatar}
                      height={20}
                      width={20}
                      className="rounded-full"
                      alt="User avatar"
                    ></Image>
                    Sean Firshcing
                  </div>
                  <svg
                    fill="none"
                    height="20"
                    shapeRendering="geometricPrecision"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width="20"
                    className="text-neutral-400"
                  >
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                </li>
                <li className="flex h-10 items-center gap-2 rounded-md px-2 hover:bg-neutral-900">
                  <svg
                    fill="none"
                    height="20"
                    width="20"
                    shapeRendering="geometricPrecision"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 8v8"></path>
                    <path d="M8 12h8"></path>
                  </svg>
                  Create Team
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
