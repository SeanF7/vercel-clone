"use client";
import React, { useState } from "react";

type Props = {
  placeHolderText: string;
  classes?: string;
  hoverColor?: string;
  escapeButton?: boolean;
};

export const SearchBar = ({
  placeHolderText,
  classes,
  hoverColor,
  escapeButton,
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleClear = () => {
    setInputValue("");
  };

  return (
    <div
      className={`flex w-full rounded-md bg-neutral-950 p-2  shadow-[0_0px_0px_1px] shadow-neutral-800  ring-neutral-500 transition-all focus-within:shadow-neutral-400 focus-within:ring-[0_0_0_4px]${
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
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      />
      {inputValue.length > 0 && (
        <button onClick={handleClear} className=" text-neutral-500">
          <svg
            fill="none"
            height="16"
            stroke="currentColor"
            stroke-width="1.5"
            viewBox="0 0 24 24"
            width="16"
          >
            <circle cx="12" cy="12" r="10" fill="var(--geist-fill)"></circle>
            <path d="M15 9l-6 6" stroke="var(--geist-stroke)"></path>
            <path d="M9 9l6 6" stroke="var(--geist-stroke)"></path>
          </svg>
        </button>
      )}
      {escapeButton && (
        <button className="flex items-center rounded-md bg-neutral-950 p-2 text-sm text-white shadow-[0_0px_0px_1px] shadow-neutral-800">
          Esc
        </button>
      )}
    </div>
  );
};
