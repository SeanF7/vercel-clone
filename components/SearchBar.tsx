"use client";
import React from "react";

type Props = {
  placeHolderText: string;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  classes?: string;
  escapeButton?: boolean;
  focusColors?: boolean;
  clearButton?: boolean;
  inputClasses?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  replaceSVG?: React.ReactNode;
};

export const SearchBar = ({
  placeHolderText,
  classes,
  escapeButton = false,
  focusColors,
  inputValue,
  setInputValue,
  clearButton = false,
  inputClasses,
  onFocus,
  onBlur,
  replaceSVG = null,
}: Props) => {
  const handleClear = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setInputValue("");
    e.stopPropagation();
  };

  return (
    <div
      className={`flex w-full items-center rounded-md bg-neutral-950 p-2 shadow-[0_0px_0px_1px] shadow-neutral-800 ${
        focusColors
          ? " outline outline-0 outline-neutral-400 ring-neutral-700 transition-all focus-within:outline-1 focus-within:ring-4"
          : ""
      }
      ${classes ? classes : ""} `}
    >
      {replaceSVG !== null ? (
        replaceSVG
      ) : (
        <span className="flex items-center stroke-current text-neutral-400">
          <svg height="20" stroke="currentColor" viewBox="0 0 24 24" width="20">
            <path d="M11 17.25a6.25 6.25 0 110-12.5 6.25 6.25 0 010 12.5z"></path>
            <path d="M16 16l4.5 4.5"></path>
          </svg>
        </span>
      )}
      <input
        className={`ml-2 w-full bg-transparent text-sm outline-none ${inputClasses}`}
        placeholder={placeHolderText}
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <div className="flex gap-2">
        <button
          onClick={handleClear}
          className={`text-neutral-500 ${
            inputValue.length > 0 && clearButton ? "flex" : "hidden"
          }`}
        >
          <svg
            fill="none"
            height="16"
            stroke="currentColor"
            viewBox="0 0 24 24"
            width="16"
          >
            <circle cx="12" cy="12" r="10" fill="var(--geist-fill)"></circle>
            <path d="M15 9l-6 6" stroke="var(--geist-stroke)"></path>
            <path d="M9 9l6 6" stroke="var(--geist-stroke)"></path>
          </svg>
        </button>
        {escapeButton && (
          <button className="flex items-center rounded-md bg-neutral-950 p-2 text-sm text-white shadow-[0_0px_0px_1px] shadow-neutral-800">
            Esc
          </button>
        )}
      </div>
    </div>
  );
};
