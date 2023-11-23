import { useEffect, useState } from "react";
import { CommentFilters, Branch } from "@/types";
import { SearchBar } from "@/components/SearchBar";
import {
  addToBranchFilter,
  isBranchInFilters,
} from "@/lib/utils/filtersHelpers";

export const BranchFilter = ({
  setFilters,
  activeBranches,
  closeMenus,
}: {
  setFilters: React.Dispatch<React.SetStateAction<CommentFilters>>;
  activeBranches: Branch[];
  closeMenus: () => void;
}) => {
  const [branchSearch, setBranchSearch] = useState("");
  const [branches, setBranches] = useState<Branch[] | null>(null);
  useEffect(() => {
    const getBranches = async () => {
      const res = await fetch(`/api/branches?q=${branchSearch}`);
      const data = await res.json();
      setBranches(data);
    };
    getBranches();
  }, [branchSearch]);

  const handleClick = (branch: Branch) => {
    addToBranchFilter(branch, setFilters, true);
    closeMenus();
  };

  return (
    <div className="flex flex-col">
      <SearchBar
        placeHolderText="Branches"
        classes="h-12 rounded-xl rounded-b-none"
        escapeButton={true}
        setInputValue={setBranchSearch}
        inputValue={branchSearch}
      />
      <div className="max-h-[250px] overflow-y-auto rounded-b-lg bg-neutral-950 p-2 shadow-[0_0px_0px_1px] shadow-neutral-800">
        {branches?.map((branch, i) => (
          <li
            className="flex h-10 w-full items-center justify-between rounded-md px-2 py-1 text-sm text-white hover:bg-neutral-900"
            key={i}
            onClick={() => handleClick(branch)}
          >
            <span className="flex w-40 px-2 text-start">
              {branch.branchName}
            </span>
            <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-neutral-500">
              {branch.projectName}
            </span>
            {isBranchInFilters(activeBranches, branch) && (
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
  );
};
