import React, { useState, useRef, useEffect } from "react";
import { SearchBar } from "@/components/SearchBar";
import { useCustomPopupExits } from "@/lib/hooks/usePopupExits";
import Image from "next/image";
import { useMobileSwipe } from "@/lib/hooks/useMobileSwipe";
import { Author, Branch, CommentFilters, Project, ProjectPage } from "@/types";

type Props = {
  showFilterMenu: boolean;
  setShowFilterMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setChildMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setFilters: React.Dispatch<React.SetStateAction<CommentFilters>>;
  filters: CommentFilters;
};

export const DesktopFiltersPopup = ({
  showFilterMenu,
  setShowFilterMenu,
  setChildMenuOpen,
  setFilters,
  filters,
}: Props) => {
  const [menuIndex, setMenuIndex] = useState<number | null>(null);
  const [authorSearch, setAuthorSearch] = useState("");
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
  const [authors, setAuthors] = useState<Author[] | null>(null);
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [pages, setPages] = useState<ProjectPage[] | null>(null);
  const [branches, setBranches] = useState<Branch[] | null>(null);
  const activeFilters = {
    activeAuthors: filters.authors.map((author) => author.id),
    activeProjects: filters.projects.map((project) => project.id),
    activePageIDs: filters.pages.map((page) => page.projectId),
    activePageNames: filters.pages.map((page) => page.page),
    activeBranchesIDs: filters.branches.map((branch) => branch.projectId),
    activeBranchNames: filters.branches.map((branch) => branch.branchName),
    activeStatus: filters.status,
  };

  useEffect(() => {
    if (showFilterMenu) {
      setAuthorSearch("");
      setProjectSearch("");
      setPageSearch("");
      setBranchSearch("");
      setMenuIndex(null);
    }
  }, [showFilterMenu]);

  useEffect(() => {
    const getAuthors = async () => {
      const res = await fetch(`/api/authors?q=${authorSearch}`);
      const data = await res.json();
      setAuthors(data);
    };
    getAuthors();
  }, [authorSearch]);

  useEffect(() => {
    const getProjects = async () => {
      const res = await fetch(`/api/projects?s=${projectSearch}`);
      const data = await res.json();
      setProjects(data);
    };
    getProjects();
  }, [projectSearch]);

  useEffect(() => {
    const getPages = async () => {
      const res = await fetch(`/api/pages?q=${pageSearch}`);
      const data = await res.json();
      setPages(data);
    };
    getPages();
  }, [pageSearch]);

  useEffect(() => {
    const getBranches = async () => {
      const res = await fetch(`/api/branches?q=${branchSearch}`);
      const data = await res.json();
      setBranches(data);
    };
    getBranches();
  }, [branchSearch]);

  const handleClick = (
    type: string,
    change: Author | Project | string | Branch | ProjectPage
  ) => {
    switch (type) {
      case "author":
        setFilters((prev) => ({
          ...prev,
          authors: [...prev.authors, change as Author],
        }));
        break;
      case "status":
        setFilters((prev) => ({
          ...prev,
          status: change as string,
        }));
        break;
      case "project":
        setFilters((prev) => ({
          ...prev,
          projects: [...prev.projects, change as Project],
        }));
        break;
      case "page":
        setFilters((prev) => ({
          ...prev,
          pages: [...prev.pages, change as ProjectPage],
        }));
        break;
      case "branch":
        setFilters((prev) => ({
          ...prev,
          branches: [...prev.branches, change as Branch],
        }));
        break;
    }
    setMenuIndex(null);
    setShowFilterMenu(false);
    setChildMenuOpen(false);
  };

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
              setInputValue={setAuthorSearch}
              inputValue={authorSearch}
            />
            <div className="rounded-b-lg bg-neutral-950 p-2 shadow-[0_0px_0px_1px] shadow-neutral-800">
              {authors?.map((author, i) => (
                <button
                  className="flex h-10 w-full items-center justify-between rounded-md px-2 py-1 text-sm text-white hover:bg-neutral-900"
                  key={i}
                  onClick={() => handleClick("author", author)}
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
                  {activeFilters.activeAuthors.includes(author.id) && (
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
        )}
        {menuIndex == 1 && (
          <div className=" rounded-lg bg-neutral-950 p-2 shadow-[0_0px_0px_1px] shadow-neutral-800">
            {["All", "Resolved"].map((item, i) => (
              <button
                className="flex h-10 w-full items-center justify-between rounded-md px-2 py-1 text-sm text-white hover:bg-neutral-800"
                key={i}
                onClick={() => handleClick("status", item)}
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
                {activeFilters.activeStatus === item && (
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
              {projects?.map((project, i) => (
                <button
                  className="flex h-10 w-full items-center justify-between rounded-md px-2 py-1 text-sm text-white hover:bg-neutral-900"
                  key={i}
                  onClick={() => handleClick("project", project)}
                >
                  <div className="flex items-center">
                    <Image
                      src={project.image}
                      alt="Vercel Icon"
                      height={16}
                      width={16}
                    ></Image>
                    <span className="px-2">{project.name}</span>
                  </div>
                  {activeFilters.activeProjects.includes(project.id) && (
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
            <div className="flex max-h-[288px] flex-col gap-1 overflow-y-auto rounded-b-xl bg-neutral-950 p-2 shadow-[0_0px_0px_1px] shadow-neutral-800">
              <div className="flex flex-col rounded-md bg-black text-neutral-200 shadow-[0_0_0_1px] shadow-neutral-700">
                <p className="p-2 text-sm">
                  To filter for comments on pages with multiple similar URLs try
                  using * to match results, such as: <br />
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
                      handleClick("page", projectPage);
                    }}
                  >
                    <div className="flex h-6 w-40 items-center gap-4">
                      <Image
                        src={projectPage.image}
                        alt="Vercel Icon"
                        height={16}
                        width={16}
                      />
                      <p className="text-left">{projectPage.page}</p>
                    </div>
                    <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-neutral-500">
                      {projectPage.name}
                    </span>
                    {activeFilters.activePageIDs.includes(
                      projectPage.projectId
                    ) &&
                      activeFilters.activePageNames.includes(
                        projectPage.page
                      ) && (
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
            <div className="max-h-[250px] overflow-y-auto rounded-b-lg bg-neutral-950 p-2 shadow-[0_0px_0px_1px] shadow-neutral-800">
              {branches?.map((branch, i) => (
                <li
                  className="flex h-10 w-full items-center justify-between rounded-md px-2 py-1 text-sm text-white hover:bg-neutral-900"
                  key={i}
                  onClick={() => handleClick("branch", branch)}
                >
                  <span className="flex w-40 px-2 text-start">
                    {branch.branchName}
                  </span>
                  <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-neutral-500">
                    {branch.projectName}
                  </span>
                  {activeFilters.activeBranchesIDs.includes(branch.projectId) &&
                    activeFilters.activeBranchNames.includes(
                      branch.branchName
                    ) && (
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
        )}
      </div>
    </div>
  );
};

export const MobileFiltersPopup = ({
  setShowFilterMenu,
  setChildMenuOpen,
  showFilterMenu,
}: Props) => {
  const [menuIndex, setMenuIndex] = useState<number | null>(null);
  const [authorSearch, setAuthorSearch] = useState("");
  const [projectSearch, setProjectSearch] = useState("");
  const [pageSearch, setPageSearch] = useState("");
  const [branchSearch, setBranchSearch] = useState("");
  const menus = useRef<HTMLDivElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const filtersOverlay = useRef<HTMLDivElement>(null);
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
        setShowFilterMenu(false);
        setChildMenuOpen(false);
      } else if (
        menus.current &&
        !menus.current?.contains(event.target as Node)
      ) {
        setShowFilterMenu(false);
        setMenuIndex(null);
        setChildMenuOpen(true);
      }
    }
  );

  useMobileSwipe({
    overlayRef: overlay,
    popupRef: menuPopup,
    setDropdownVisible: () => {
      setShowFilterMenu(false);
      setChildMenuOpen(false);
    },
    startingOpacity: 0.6,
  });

  useMobileSwipe({
    overlayRef: filtersOverlay,
    popupRef: menus,
    setDropdownVisible: () => setMenuIndex(null),
    startingOpacity: 0.6,
  });

  return (
    <div className="absolute bottom-0 left-0 w-full">
      {showFilterMenu && (
        <>
          <div className="fixed inset-0 bg-black opacity-60" ref={overlay} />
          <div
            className="mobilePopupAfter absolute bottom-0 left-0 z-10 flex w-full flex-col place-self-end rounded-t-lg bg-neutral-950 p-2 shadow-[0_0px_0px_1px] shadow-neutral-800"
            ref={menuPopup}
          >
            {["Author", "Status", "Project", "Page", "Branch"].map(
              (item, i) => (
                <button
                  className="flex h-12 w-full items-center rounded-md px-2 py-1 text-sm text-white hover:bg-neutral-800"
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuIndex(i);
                    setShowFilterMenu(false);
                    setChildMenuOpen(true);
                  }}
                >
                  {item}
                </button>
              )
            )}
          </div>
        </>
      )}
      {menuIndex !== null && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-60"
            ref={filtersOverlay}
          />
          <div
            className="mobilePopupAfter absolute bottom-0 left-0 w-full bg-neutral-950"
            ref={menus}
          >
            {menuIndex == 0 && (
              <div className="flex flex-col">
                <SearchBar
                  placeHolderText="Author"
                  classes="h-12 rounded-b-none rounded-t-xl"
                  escapeButton={true}
                  setInputValue={setAuthorSearch}
                  inputValue={authorSearch}
                />
                <div className=" bg-neutral-950 p-2 shadow-[0_0px_0px_1px] shadow-neutral-800">
                  WIP/TODO
                </div>
              </div>
            )}
            {menuIndex == 1 && (
              <div className=" rounded-t-lg bg-neutral-950 p-2 shadow-[0_0px_0px_1px] shadow-neutral-800">
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
              <div className="rounded-t-xl bg-neutral-950 shadow-[0_0px_0px_1px] shadow-neutral-800">
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
              <div className="flex flex-1 flex-col rounded-t-xl bg-neutral-950">
                <SearchBar
                  placeHolderText="Page"
                  classes="h-12 rounded-b-none rounded-xl"
                  escapeButton={true}
                  setInputValue={setPageSearch}
                  inputValue={pageSearch}
                />
                <div className="flex  bg-neutral-950 p-2 shadow-[0_0px_0px_1px] shadow-neutral-800">
                  <div className="flex flex-col rounded-md bg-black text-neutral-200 shadow-[0_0_0_1px] shadow-neutral-700">
                    <p className="w-[240px p-2 text-sm">
                      To filter for comments on pages with multiple similar URLs
                      try using * to match results, such as: <br />
                      <span className="rounded-[4px] p-1 font-mono text-xs text-red-400 shadow-[0_0_0_1px] shadow-neutral-700">
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
                <div className="bg-neutral-950 p-2 shadow-[0_0px_0px_1px] shadow-neutral-800"></div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
