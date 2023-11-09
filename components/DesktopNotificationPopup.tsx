"use client";
import { useState, useEffect, useRef } from "react";
import { SearchBar } from "./SearchBar";
import { DesktopFiltersPopup } from "./DesktopFiltersPopup";
import { useCustomPopupExits } from "@/lib/hooks/usePopupExits";

type Props = {
  controllingButton: React.RefObject<HTMLButtonElement>;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DesktopNotificationPopup = ({
  controllingButton,
  setVisible,
}: Props) => {
  const [index, setIndex] = useState(0);
  const tabs = ["Inbox", "Archive", "Comments"];
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [childMenuOpen, setChildMenuOpen] = useState(false);
  const filterButton = useRef<HTMLButtonElement>(null);
  const { menuPopup } = useCustomPopupExits(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && !childMenuOpen) {
        setVisible(false);
        controllingButton.current?.focus();
      }
    },
    (event: MouseEvent) => {
      if (
        menuPopup.current &&
        !menuPopup.current.contains(event.target as Node) &&
        !childMenuOpen
      ) {
        setVisible(false);
      }
    }
  );

  const handleTabClick = (index: number) => {
    setIndex(index);
  };

  return (
    <div
      className="absolute z-20 w-[400px]  -translate-x-full pt-2 font-sans"
      ref={menuPopup}
    >
      <div className="relative left-12 rounded-md bg-black  shadow-[0_0px_1px_1px] shadow-neutral-800">
        <div className="flex flex-col border-b border-neutral-700">
          <div className="flex items-center justify-between pl-4 pr-2">
            <div className="flex w-full gap-5 text-sm">
              {tabs.map((tab, i) => (
                <button
                  className={`py-3 ${
                    index === i ? "border-b border-white" : ""
                  }`}
                  key={i}
                  tabIndex={0}
                  onClick={() => handleTabClick(i)}
                >
                  {tab}
                </button>
              ))}
            </div>
            <button className="rounded-full p-2 transition-colors duration-200 hover:bg-neutral-700 hover:text-white">
              <svg
                fill="none"
                height="16"
                stroke="currentColor"
                viewBox="0 0 24 24"
                width="16"
              >
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"></path>
              </svg>
            </button>
          </div>
        </div>
        <div>
          {index === 0 && (
            <div className="flex  flex-col justify-between">
              <div className="grid min-h-[400px] auto-rows-max grid-cols-1">
                <div className="flex p-4 pr-2 text-sm shadow-[inset_0px_-1px_1px] shadow-neutral-700">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-400 to-blue-500" />
                  <div className="flex flex-col pl-6">
                    <h1 className="text-white">
                      seanfirsching@gmail.com email change confirmed
                    </h1>
                    <p>235d ago</p>
                  </div>
                </div>
                <div className="flex p-4 pr-2 text-sm shadow-[inset_0px_-1px_1px] shadow-neutral-700">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-400 to-blue-500" />
                  <div className="flex flex-col pl-6">
                    <h1 className="text-white">
                      seanfirsching@gmail.com email change confirmed
                    </h1>
                    <p>235d ago</p>
                  </div>
                </div>
              </div>
              <div className="flex h-12 items-center p-2 shadow-[inset_0px_1px_1px] shadow-neutral-700">
                <button className="ml-auto mr-auto rounded-md p-2 text-white hover:bg-neutral-800">
                  Archive All
                </button>
              </div>
            </div>
          )}
        </div>
        {index === 1 && (
          <div className="flex  flex-col justify-between">
            <div className="grid min-h-[400px] auto-rows-max grid-cols-1">
              <div className="flex p-4 pr-2 text-sm shadow-[inset_0px_-1px_1px] shadow-neutral-700">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-400 to-blue-500" />
                <div className="flex flex-col pl-6">
                  <h1 className="text-white">
                    seanfirsching@gmail.com email change confirmed
                  </h1>
                  <p>235d ago</p>
                </div>
              </div>
              <div className="flex p-4 pr-2 text-sm shadow-[inset_0px_-1px_1px] shadow-neutral-700">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-400 to-blue-500" />
                <div className="flex flex-col pl-6">
                  <h1 className="text-white">
                    seanfirsching@gmail.com email change confirmed
                  </h1>
                  <p>235d ago</p>
                </div>
              </div>
            </div>
            <div className="flex h-12 items-center p-2 shadow-[inset_0px_1px_1px] shadow-neutral-700">
              <button className="ml-auto mr-auto rounded-md p-2 text-white hover:bg-neutral-800">
                Archive All
              </button>
            </div>
          </div>
        )}
        {index === 2 && (
          <div className="flex flex-col">
            <div className="flex p-4">
              <SearchBar
                placeHolderText="Search comments..."
                classes="h-8"
                focusColors={true}
              />
              <div className="ml-4 flex h-8 w-20 rounded-md bg-neutral-950 shadow-[0_0px_0px_1px] shadow-neutral-800">
                <button
                  className="flex w-full flex-1  items-center px-2 text-white"
                  onClick={() => setShowFilterMenu(true)}
                  ref={filterButton}
                >
                  <span className="mr-2">
                    <svg
                      height="16"
                      viewBox="0 0 24 24"
                      width="16"
                      stroke="currentColor"
                    >
                      <path d="M12 5v14"></path>
                      <path d="M5 12h14"></path>
                    </svg>
                  </span>
                  <span className="flex-1 text-sm">Filter</span>
                </button>
                <DesktopFiltersPopup
                  showFilterMenu={showFilterMenu}
                  setShowFilterMenu={setShowFilterMenu}
                  setChildMenuOpen={setChildMenuOpen}
                  button={filterButton}
                />
              </div>
            </div>
            <div className="flex min-h-[400px] w-full items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <div className="rounded-full bg-neutral-900 p-4 text-neutral-400">
                  <svg
                    fill="none"
                    height="20"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    width="20"
                    aria-label="Empty inbox"
                  >
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                  </svg>
                </div>
                <span className="text-sm "> No new comments</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
