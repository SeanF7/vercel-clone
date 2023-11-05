import React from "react";

export const UserDropdown = () => {
  return (
    <div className="flex text-white">
      <div className="flex items-center">
        <div className="h-5 w-5 rounded-full bg-gradient-to-r from-green-400 to-blue-500" />
        <h1 className="mx-2 text-sm">Sean Firsching</h1>
        <span className="hidden h-2 items-center rounded-lg bg-neutral-800 p-2 py-2 md:flex">
          <span className="text-xs font-medium ">Hobby</span>
        </span>
      </div>
      <div className="flex items-center">
        <button className="flex h-10 w-7 flex-shrink-0 items-center justify-center rounded-lg text-sm text-gray-400 hover:bg-neutral-800">
          <svg
            aria-hidden="true"
            fill="none"
            height="16"
            viewBox="0 0 16 24"
            className="stroke-current text-gray-400"
          >
            <path d="M13 8.517L8 3 3 8.517M3 15.48l5 5.517 5-5.517"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};
