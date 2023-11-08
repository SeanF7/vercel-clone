import React, { useEffect, useState, useRef } from "react";
import { SearchBar } from "./SearchBar";

type Props = {
  showFilterMenu: boolean;
  setShowFilterMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setChildMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DesktopFiltersPopup = ({
  showFilterMenu,
  setShowFilterMenu,
  setChildMenuOpen,
}: Props) => {
  const [menuIndex, setMenuIndex] = useState<number | null>(null);
  const filterMenu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        filterMenu.current &&
        !filterMenu.current.contains(event.target as Node)
      ) {
        if (menuIndex !== null) {
          setMenuIndex(null);
        }
        setShowFilterMenu(false);
        setChildMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (menuIndex !== null) {
          setMenuIndex(null);
          setShowFilterMenu(true);
        } else {
          setShowFilterMenu(false);
          setChildMenuOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClick);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuIndex, setShowFilterMenu, setChildMenuOpen]);

  return (
    <div className="relative" ref={filterMenu}>
      {showFilterMenu && (
        <div className="absolute w-[240px] -translate-x-full translate-y-10 rounded-lg bg-neutral-950 p-2 shadow-[0_0px_0px_1px] shadow-neutral-800">
          {["Author", "Status", "Project", "Page", "Branch"].map((item, i) => (
            <button
              className="flex h-10 w-full items-center rounded-md px-2 py-1 text-sm text-white hover:bg-neutral-800"
              key={i}
              onClick={() => {
                setMenuIndex(i);
                setShowFilterMenu(false);
                setChildMenuOpen(true);
              }}
            >
              {item}
            </button>
          ))}
        </div>
      )}

      <div className="absolute w-[240px] -translate-x-full translate-y-10">
        {menuIndex == 0 && (
          <div className="flex flex-col">
            <div className="flex">
              <SearchBar
                placeHolderText="Author"
                classes="h-12"
                escapeButton={true}
              />
            </div>
          </div>
        )}
        {menuIndex == 1 && (
          <div className="flex flex-col">
            <button>All</button>
            <button>Resolved</button>
          </div>
        )}
        {menuIndex == 2 && (
          <div className="flex flex-col">
            <button>All</button>
            <button>Resolved</button>
          </div>
        )}
        {menuIndex == 3 && (
          <div className="flex flex-col">
            <SearchBar placeHolderText="Project" classes="h-12" />
            <div className="flex flex-col">
              <button>All</button>
              <button>Resolved</button>
            </div>
          </div>
        )}
        {menuIndex == 4 && (
          <div className="flex flex-col">
            <SearchBar placeHolderText="Page" classes="h-12" />
            <div className="flex flex-col">
              <div>
                To filter for comments on pages with multiple similar URLs try
                using * to match results, such as: /docs/compass/rules/req*
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
