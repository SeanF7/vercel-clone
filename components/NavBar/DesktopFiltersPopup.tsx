import React, { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { useCustomPopupExits } from "@/lib/hooks/usePopupExits";
import Image from "next/image";

type Props = {
  showFilterMenu: boolean;
  setShowFilterMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setChildMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  button: React.RefObject<HTMLButtonElement>;
};

export const DesktopFiltersPopup = ({
  showFilterMenu,
  setShowFilterMenu,
  setChildMenuOpen,
}: Props) => {
  const [menuIndex, setMenuIndex] = useState<number | null>(null);
  const [authorSearch, setauthorSearch] = useState("");
  const [projectSearch, setProjectSearch] = useState("");
  const [pageSearch, setPageSearch] = useState("");
  const [branchSearch, setBranchSearch] = useState("");
  const { menuPopup } = useCustomPopupExits(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (menuIndex !== null) {
          setMenuIndex(null);
          setShowFilterMenu(true);
          setChildMenuOpen(true);
        } else {
          setShowFilterMenu(false);
          setChildMenuOpen(false);
        }
      }
    },
    (event: MouseEvent) => {
      if (
        menuPopup.current &&
        !menuPopup.current.contains(event.target as Node)
      ) {
        if (menuIndex !== null) {
          setMenuIndex(null);
          setShowFilterMenu(true);
          setChildMenuOpen(true);
        } else {
          setShowFilterMenu(false);
          setChildMenuOpen(false);
        }
      }
    }
  );

  return (
    <div className="relative" ref={menuPopup}>
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

      <div className="absolute w-64 -translate-x-full translate-y-10">
        {menuIndex == 0 && (
          <div className="flex flex-col">
            <SearchBar
              placeHolderText="Author"
              classes="h-12 rounded-b-none rounded-t-xl"
              escapeButton={true}
              setInputValue={setauthorSearch}
              inputValue={authorSearch}
            />
            <div className="rounded-b-lg bg-neutral-950 p-2 shadow-[0_0px_0px_1px] shadow-neutral-800"></div>
          </div>
        )}
        {menuIndex == 1 && (
          <div className=" rounded-lg bg-neutral-950 p-2 shadow-[0_0px_0px_1px] shadow-neutral-800">
            {["All", "Resolved"].map((item, i) => (
              <button
                className="flex h-10 w-full items-center rounded-md px-2 py-1 text-sm text-white hover:bg-neutral-800"
                key={i}
              >
                {i == 0 && (
                  <span className="h-[10px] w-[10px] rounded-full bg-neutral-600"></span>
                )}
                {i == 1 && (
                  <span className="h-[10px] w-[10px] rounded-full bg-blue-400"></span>
                )}

                <span className="px-4">{item}</span>
              </button>
            ))}
          </div>
        )}
        {menuIndex == 2 && (
          <div className="absolute rounded-xl bg-neutral-950 shadow-[0_0px_0px_1px] shadow-neutral-800">
            <SearchBar
              placeHolderText="Project"
              classes="h-12 rounded-none rounded-t-xl outline-none"
              escapeButton={true}
              setInputValue={setProjectSearch}
              inputValue={projectSearch}
            />
            <div className="flex flex-col p-2">
              {["vercel-clone", "politics-chat", "sdokb-capstone"].map(
                (item, i) => (
                  <button
                    className="flex h-10 w-full items-center rounded-md px-2 py-1 text-sm text-white hover:bg-neutral-900"
                    key={i}
                  >
                    <Image
                      src={"/vercel.ico"}
                      alt="Vercel Icon"
                      height={16}
                      width={16}
                    ></Image>
                    <span className="px-2">{item}</span>
                  </button>
                )
              )}
            </div>
          </div>
        )}
        {menuIndex == 3 && (
          <div className="flex flex-1 flex-col rounded-xl bg-neutral-950">
            <SearchBar
              placeHolderText="Page"
              classes="h-12 rounded-b-none rounded-xl"
              escapeButton={true}
              setInputValue={setPageSearch}
              inputValue={pageSearch}
            />
            <div className="flex rounded-b-xl bg-neutral-950 p-2 shadow-[0_0px_0px_1px] shadow-neutral-800">
              <div className="flex flex-col rounded-md bg-black text-neutral-200 shadow-[0_0_0_1px] shadow-neutral-700">
                <p className="w-[240px p-2 text-sm">
                  To filter for comments on pages with multiple similar URLs try
                  using * to match results, such as: <br />
                  <span className="rounded-[4px] p-1  font-mono text-xs  text-red-400 shadow-[0_0_0_1px] shadow-neutral-700">
                    /docs/conformance/rules/req*
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}
        {menuIndex == 4 && (
          <div className="flex flex-col">
            <SearchBar
              placeHolderText="Branches"
              classes="h-12 rounded-xl rounded-b-none"
              escapeButton={true}
              setInputValue={setBranchSearch}
              inputValue={branchSearch}
            />
            <div className="rounded-b-lg bg-neutral-950 p-2 shadow-[0_0px_0px_1px] shadow-neutral-800"></div>
          </div>
        )}
      </div>
    </div>
  );
};
