import { useEffect, useState } from "react";
import { ProjectPage, CommentFilters } from "@/types";
import { SearchBar } from "@/components/SearchBar";
import Image from "next/image";
import { addToPageFilter } from "@/lib/utils/filtersHelpers";

export const PageFIlter = ({
  setFilters,
  activePagesProjectsID,
  activePagesNames,
  closeMenus,
}: {
  setFilters: React.Dispatch<React.SetStateAction<CommentFilters>>;
  activePagesProjectsID: number[];
  activePagesNames: string[];
  closeMenus: () => void;
}) => {
  const [pages, setPages] = useState<ProjectPage[] | null>(null);
  const [pageSearch, setPageSearch] = useState("");

  const checkIfPageIsInFilters = (page: ProjectPage) => {
    return (
      activePagesProjectsID.includes(page.projectId) &&
      activePagesNames.includes(page.pageName)
    );
  };

  const handleClick = (page: ProjectPage) => {
    addToPageFilter(page, setFilters, true);
    closeMenus();
  };

  useEffect(() => {
    const getPages = async () => {
      const res = await fetch(`/api/pages?q=${pageSearch}`);
      const data = await res.json();
      setPages(data);
    };
    getPages();
  }, [pageSearch]);
  return (
    <div className="flex flex-1 flex-col rounded-xl bg-neutral-950">
      <SearchBar
        placeHolderText="Page"
        classes="h-12 rounded-b-none rounded-xl"
        escapeButton={true}
        setInputValue={setPageSearch}
        inputValue={pageSearch}
      />
      <div className="flex max-h-[288px] flex-col gap-1 overflow-y-auto rounded-b-xl bg-neutral-950 p-2 shadow-[0_0px_0px_1px] shadow-neutral-800">
        <div className="flex flex-col rounded-md bg-black text-neutral-200 shadow-[0_0_0_1px] shadow-neutral-700">
          <p className="p-2 text-sm">
            To filter for comments on pages with multiple similar URLs try using
            * to match results, such as: <br />
            <span className="rounded-[4px] p-1  font-mono text-xs  text-red-400 shadow-[0_0_0_1px] shadow-neutral-700">
              /docs/conformance/rules/req*
            </span>
          </p>
        </div>
        <div className="flex flex-col">
          {pages?.map((projectPage, i) => (
            <li
              className="flex w-full items-center justify-between rounded-md px-2 py-2 text-sm text-white hover:bg-neutral-900"
              key={i}
              onClick={() => {
                handleClick(projectPage);
              }}
            >
              <div className="flex h-6 w-40 items-center gap-4">
                <Image
                  src={projectPage.image}
                  alt="Vercel Icon"
                  height={16}
                  width={16}
                />
                <p className="text-left">{projectPage.pageName}</p>
              </div>
              <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-neutral-500">
                {projectPage.projectName}
              </span>
              {checkIfPageIsInFilters(projectPage) && (
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
            </li>
          ))}
        </div>
      </div>
    </div>
  );
};
