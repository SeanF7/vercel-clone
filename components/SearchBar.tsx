"use client";
import React, { useState } from "react";

type Props = {
  placeHolderText: string;
  classes?: string;
  hoverColor?: string;
};

export const SearchBar = ({ placeHolderText, classes, hoverColor }: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div
      className={`flex w-full rounded-md bg-neutral-950 p-2  shadow-[0_0px_0px_1px] shadow-neutral-800 transition-all focus-within:shadow-neutral-400 ${
        !isFocused ? `hover:${hoverColor}` : ""
      } ${classes} `}
    >
      <span className="flex items-center stroke-current text-neutral-400">
        <svg height="20" stroke="currentColor" viewBox="0 0 24 24" width="20">
          <path d="M11 17.25a6.25 6.25 0 110-12.5 6.25 6.25 0 010 12.5z"></path>
          <path d="M16 16l4.5 4.5"></path>
        </svg>
      </span>
      <input
        className="ml-2 w-full bg-transparent text-sm outline-none"
        placeholder={placeHolderText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
};
