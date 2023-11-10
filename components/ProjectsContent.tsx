"use client";
import { Project } from "@/components/Project";
import { SearchBar } from "@/components/SearchBar";
import { useState } from "react";

export const ProjectsContent = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="ml-auto mr-auto min-h-screen max-w-[1200px] px-4 py-3">
      <div className="flex w-full items-center">
        <SearchBar
          placeHolderText="Search..."
          focusColors={true}
          inputValue={search}
          setInputValue={setSearch}
          clearButton={true}
          classes="hover:shadow-neutral-600"
        />
        <div className="p-2">
          <div className="flex rounded-md bg-neutral-950 px-2 py-1 shadow-[0_0px_0px_1px] shadow-neutral-800 transition-colors hover:shadow-neutral-500">
            <button className="rounded-md bg-neutral-800 px-3 py-2">
              <svg
                data-testid="geist-icon"
                height="16"
                viewBox="0 0 16 16"
                width="16"
                className="fill-current text-white"
              >
                <path d="M2.5 5.5V2.5H5.5V5.5H2.5ZM1 2C1 1.44772 1.44772 1 2 1H6C6.55228 1 7 1.44772 7 2V6C7 6.55228 6.55228 7 6 7H2C1.44772 7 1 6.55228 1 6V2ZM2.5 13.5V10.5H5.5V13.5H2.5ZM1 10C1 9.44772 1.44772 9 2 9H6C6.55228 9 7 9.44772 7 10V14C7 14.5523 6.55228 15 6 15H2C1.44772 15 1 14.5523 1 14V10ZM10.5 2.5V5.5H13.5V2.5H10.5ZM10 1C9.44772 1 9 1.44772 9 2V6C9 6.55228 9.44772 7 10 7H14C14.5523 7 15 6.55228 15 6V2C15 1.44772 14.5523 1 14 1H10ZM10.5 13.5V10.5H13.5V13.5H10.5ZM9 10C9 9.44772 9.44772 9 10 9H14C14.5523 9 15 9.44772 15 10V14C15 14.5523 14.5523 15 14 15H10C9.44772 15 9 14.5523 9 14V10Z"></path>
              </svg>
            </button>
            <button className="rounded-sm px-3 py-2">
              {/* WIP/TODO: Have to make the classnames dynamic on switch */}
              <svg
                height="16"
                viewBox="0 0 16 16"
                width="16"
                className="fill-current text-neutral-400"
              >
                <path
                  d="M2.5 4C3.19036 4 3.75 3.44036 3.75 2.75C3.75 2.05964 3.19036 1.5 2.5 1.5C1.80964 1.5 1.25 2.05964 1.25 2.75C1.25 3.44036 1.80964 4 2.5 4ZM2.5 9.25C3.19036 9.25 3.75 8.69036 3.75 8C3.75 7.30964 3.19036 6.75 2.5 6.75C1.80964 6.75 1.25 7.30964 1.25 8C1.25 8.69036 1.80964 9.25 2.5 9.25ZM3.75 13.25C3.75 13.9404 3.19036 14.5 2.5 14.5C1.80964 14.5 1.25 13.9404 1.25 13.25C1.25 12.5596 1.80964 12 2.5 12C3.19036 12 3.75 12.5596 3.75 13.25ZM6.75 2H6V3.5H6.75H14.25H15V2H14.25H6.75ZM6.75 7.25H6V8.75H6.75H14.25H15V7.25H14.25H6.75ZM6.75 12.5H6V14H6.75H14.25H15V12.5H14.25H6.75Z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <button className=" flex h-10 items-center rounded-md bg-neutral-200 px-2 text-center align-middle text-black hover:bg-neutral-300 [@media(min-width:600px)]:w-36">
          <div className="flex flex-1 items-center justify-between">
            <span className=" font-medium: medium inline-block text-sm [@media(max-width:600px)]:hidden">
              Add New...
            </span>
            <svg
              fill="none"
              height="24"
              stroke="currentColor"
              viewBox="0 0 24 24"
              width="24"
              className="[@media(max-width:600px)]:hidden"
            >
              <path d="M6 9l6 6 6-6"></path>
            </svg>
          </div>
          <svg
            fill="none"
            height="24"
            stroke="currentColor"
            viewBox="0 0 24 24"
            className="[@media(min-width:600px)]:hidden"
            width="24"
          >
            <path d="M12 5v14"></path>
            <path d="M5 12h14"></path>
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-1 gap-6 py-6  sm:grid-cols-2 [@media(min-width:1000px)]:grid-cols-3 ">
        <Project />
        <Project />
        <Project />
        <Project />
        <Project />
        <Project />
        <Project />
        <Project />
      </div>
    </div>
  );
};
