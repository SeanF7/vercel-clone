"use client";
import { useState, useEffect, useRef } from "react";
import { SearchBar } from "./SearchBar";

export const DesktopNotificationPopup = () => {
  const [index, setIndex] = useState(0);
  const tabs = ["Inbox", "Archive", "Comments"];

  const handleTabClick = (index: number) => {
    setIndex(index);
  };

  return (
    <div className="fixed z-10 w-[400px]  -translate-x-full pt-3 font-sans">
      <div className="relative left-10 rounded-xl bg-black  shadow-[0_0px_1px_1px] shadow-neutral-800">
        <div className="flex flex-col border-b border-neutral-700">
          <div className="flex items-center justify-between pl-4 pr-2">
            <div className="flex w-full gap-5 text-sm">
              {tabs.map((tab, i) => (
                <button
                  className={`py-3 ${
                    index === i ? "border-b border-white" : ""
                  }`}
                  key={i}
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
          <div className="">
            <div className="flex items-center gap-2 p-2">
              <SearchBar placeHolderText="Search comments..." classes="h-8" />
              <div className="flex rounded-md bg-neutral-950 p-2 shadow-[0_0px_0px_1px] shadow-neutral-700">
                <button className="flex items-center text-white">
                  <svg
                    height="16"
                    viewBox="0 0 24 24"
                    width="16"
                    stroke="currentColor"
                  >
                    <path d="M12 5v14"></path>
                    <path d="M5 12h14"></path>
                  </svg>
                  <span className="text-sm">Filter</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
