"use client";
import { addToStatusFilter } from "@/lib/utils/filtersHelpers";
import { CommentFilters } from "@/types";

export const StatusFilter = ({
  setFilters,
  activeStatus,
  closeMenus,
}: {
  setFilters: React.Dispatch<React.SetStateAction<CommentFilters>>;
  activeStatus: string;
  closeMenus: () => void;
}) => {
  const handleClick = (status: string) => {
    addToStatusFilter(status, setFilters);
    closeMenus();
  };

  return (
    <div className="p-2">
      {["All", "Resolved"].map((item, i) => (
        <button
          className="flex h-10 w-full items-center justify-between rounded-md px-2 py-1 text-sm text-white hover:bg-neutral-800"
          key={i}
          onClick={() => handleClick(item)}
        >
          <div className="flex items-center">
            {i == 0 && (
              <span className="h-[10px] w-[10px] rounded-full bg-neutral-600"></span>
            )}
            {i == 1 && (
              <span className="h-[10px] w-[10px] rounded-full bg-blue-400"></span>
            )}

            <span className="px-4">{item}</span>
          </div>
          {activeStatus === item && (
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
  );
};
