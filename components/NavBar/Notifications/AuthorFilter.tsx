import Image from "next/image";
import { SearchBar } from "@/components/SearchBar";
import { useState, useEffect } from "react";
import { Author, CommentFilters } from "@/types";
import { addToAuthorFilter } from "@/lib/utils/filtersHelpers";

export const AuthorFilter = ({
  setFilters,
  activeAuthors,
  closeMenus,
}: {
  setFilters: React.Dispatch<React.SetStateAction<CommentFilters>>;
  activeAuthors: number[];
  closeMenus: () => void;
}) => {
  const [authors, setAuthors] = useState<Author[] | null>(null);
  const [authorSearch, setAuthorSearch] = useState<string>("");
  useEffect(() => {
    const getAuthors = async () => {
      const res = await fetch(`/api/authors?q=${authorSearch}`);
      const data = await res.json();
      setAuthors(data);
    };
    getAuthors();
  }, [authorSearch]);
  const handleClick = (author: Author) => {
    addToAuthorFilter(author, setFilters, true);
    closeMenus();
  };

  return (
    <div className="flex flex-col">
      <SearchBar
        placeHolderText="Author"
        classes="h-12 rounded-b-none rounded-t-xl"
        escapeButton={true}
        setInputValue={setAuthorSearch}
        inputValue={authorSearch}
      />
      <div className="p-2 ">
        {authors?.map((author, i) => (
          <button
            className="flex h-10 w-full items-center justify-between rounded-md px-2 py-1 text-sm text-white hover:bg-neutral-900"
            key={i}
            onClick={() => handleClick(author)}
          >
            <div className="flex items-center">
              <Image
                src={author.avatar}
                alt="Author Avatar"
                height={16}
                width={16}
                className="rounded-full"
              ></Image>
              <span className="px-2">{author.name}</span>
            </div>
            {activeAuthors.includes(author.id) && (
              <span className=" text-neutral-200">
                <svg
                  fill="none"
                  height="18"
                  shapeRendering="geometricPrecision"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  width="18"
                >
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
