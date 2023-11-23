import React, { useState, useRef } from "react";
import { usePopupExits } from "@/lib/hooks/useMobileSwipe";
import { CommentFilters } from "@/types";
import { AuthorFilter } from "./AuthorFilter";
import { StatusFilter } from "./StatusFilter";
import { ProjectFilter } from "./ProjectFilter";
import { PageFilter } from "./PageFilter";
import { BranchFilter } from "./BranchFilter";

type FilterPopupProps = {
  showFilterMenu: boolean;
  setShowFilterMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setChildMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setFilters: React.Dispatch<React.SetStateAction<CommentFilters>>;
  filters: CommentFilters;
  mobile: boolean;
};

export const FiltersPopup = ({
  showFilterMenu,
  setShowFilterMenu,
  setChildMenuOpen,
  setFilters,
  filters,
  mobile,
}: FilterPopupProps) => {
  const [menuIndex, setMenuIndex] = useState<number | null>(null);
  const menuPopup = useRef(false);
  const [hideFilterMenu, setHideFilterMenu] = useState(false);
  const menus = useRef<HTMLDivElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const Wrapper = mobile ? MobileWrapper : DesktopWrapper;
  const cleanUp = () => {
    setShowFilterMenu(false);
    setMenuIndex(null);
    setChildMenuOpen(false);
    setHideFilterMenu(false);
  };

  usePopupExits({
    overlayRef: overlay,
    popupRef: menus,
    setDropdownVisible: cleanUp,
    startingOpacity: 0.6,
  });
  usePopupExits({
    overlayRef: overlay,
    popupRef: menuPopup,
    setDropdownVisible: cleanUp,
    startingOpacity: 0.6,
    dontChangeIfTrue: [hideFilterMenu],
  });

  const showOverlay = mobile && (showFilterMenu || menuIndex !== null);
  return (
    <Wrapper>
      {showOverlay && (
        <div className="fixed inset-0 bg-black opacity-60" ref={overlay} />
      )}
      {showFilterMenu && (
        <div
          className={`${
            hideFilterMenu ? "hidden" : ""
          } [@media(max-width:600px)]:mobilePopupAfter absolute w-[240px] -translate-x-full translate-y-10 rounded-lg bg-neutral-950  p-2 shadow-[0_0px_0px_1px] shadow-neutral-800`}
          ref={menuPopup}
        >
          {["Author", "Status", "Project", "Page", "Branch"].map((item, i) => (
            <button
              className="flex h-10 w-full items-center rounded-md px-2 py-1 text-sm text-white hover:bg-neutral-800"
              key={i}
              onClick={() => {
                setMenuIndex(i);
                setChildMenuOpen(true);
                setHideFilterMenu(true);
              }}
            >
              {item}
            </button>
          ))}
        </div>
      )}
      {menuIndex !== null && (
        <div
          className="[@media(max-width:600px)]:mobilePopupAfter absolute z-50 w-64 -translate-x-full translate-y-10 rounded-xl bg-neutral-950 shadow-[0_0px_0px_1px] shadow-neutral-800"
          ref={menus}
        >
          {menuIndex == 0 && (
            <AuthorFilter
              activeAuthors={filters.authors.map((author) => author.id)}
              setFilters={setFilters}
              closeMenus={cleanUp}
            />
          )}
          {menuIndex == 1 && (
            <StatusFilter
              activeStatus={filters.status}
              setFilters={setFilters}
              closeMenus={cleanUp}
            />
          )}
          {menuIndex == 2 && (
            <ProjectFilter
              activeProjects={filters.projects.map((project) => project.id)}
              setFilters={setFilters}
              closeMenus={cleanUp}
            />
          )}
          {menuIndex == 3 && (
            <PageFilter
              activePages={filters.pages}
              closeMenus={cleanUp}
              setFilters={setFilters}
            />
          )}
          {menuIndex == 4 && (
            <BranchFilter
              activeBranches={filters.branches}
              closeMenus={cleanUp}
              setFilters={setFilters}
            />
          )}
        </div>
      )}
    </Wrapper>
  );
};

const DesktopWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="relative">{children}</div>;
};

const MobileWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="absolute bottom-0 left-0 z-10 w-full">{children}</div>;
};
