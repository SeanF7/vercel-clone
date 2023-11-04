"use client";
import React, { useState } from "react";

export const NavButton = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleButtonClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="relative">
      <button className="flex h-8 w-8 " onClick={handleButtonClick}>
        <div className="hidden rounded-full bg-gradient-to-r from-green-400 to-blue-500 md:block" />
        <div className="flex h-full w-full items-center justify-center rounded-full border border-gray-800">
          <div className="absolute h-[1.5px] w-[14px] translate-y-1 bg-neutral-500" />
          <div className="absolute h-[1.5px] w-[14px] -translate-y-1 bg-neutral-500" />
        </div>
      </button>
      {showMenu && (
        <div className="absolute left-full right-0 pt-3 font-sans">
          <div className="flex w-64 -translate-x-full flex-col rounded-lg bg-neutral-950  p-4 shadow-[0_0px_1px_1px] shadow-neutral-800">
            <div className="pb-3">
              <h1 className="text-sm font-semibold text-white">
                Sean Firsching
              </h1>
              <h2 className="text-sm text-neutral-400">
                seanfirsching@gmail.com
              </h2>
            </div>
            <ul className="flex flex-col space-y-3 text-neutral-500">
              <li>Dashboard</li>
              <li className="flex items-center justify-between">
                Settings
                <svg
                  fill="none"
                  height="16"
                  stroke="currentColor"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  width="16"
                >
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"></path>
                </svg>
              </li>
              <li className="flex items-center justify-between">
                Create Team
                <svg
                  fill="none"
                  height="16"
                  stroke="currentColor"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  width="16"
                >
                  <path d="M12 5v14"></path>
                  <path d="M5 12h14"></path>
                </svg>
              </li>
              <hr className="my-4 border-t border-gray-200" />
              <li className="flex items-center justify-between">
                Command Menu
              </li>
              <li className="flex items-center justify-between">
                Theme
                <svg
                  fill="none"
                  height="16"
                  stroke="currentColor"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  width="16"
                >
                  <path d="M12 5v14"></path>
                  <path d="M5 12h14"></path>
                </svg>
              </li>{" "}
              <hr className="my-4 border-t border-gray-200" />
              <li className="flex items-center justify-between">
                Vercel homepage
              </li>
              <li className="flex items-center justify-between">
                Log Out
                <svg
                  fill="none"
                  height="16"
                  stroke="currentColor"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  width="16"
                >
                  <path d="M12 5v14"></path>
                  <path d="M5 12h14"></path>
                </svg>
              </li>
              <hr className="my-4 border-t border-gray-200" />
              <button className="ml-auto mr-auto h-8 w-full rounded-md bg-white text-sm font-medium text-black">
                Upgrade to Pro
              </button>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
