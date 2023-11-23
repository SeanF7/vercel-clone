"use client";
import { Author, Branch, CommentFilters, Project, ProjectPage } from "@/types";
import Image from "next/image";
import { useRef, useState } from "react";
import { StatusFilter } from "./StatusFilter";
import { ProjectFilter } from "./ProjectFilter";
import { useMobileSwipe } from "@/lib/hooks/useMobileSwipe";
import { usePopupExistsParams } from "@/lib/hooks/usePopupExits";
import { AuthorFilter } from "./AuthorFilter";
import { PageFilter } from "./PageFilter";
import { BranchFilter } from "./BranchFilter";

type FilterProps = {
  filters: CommentFilters;
  setFilters: React.Dispatch<React.SetStateAction<CommentFilters>>;
  setChildMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mobile?: boolean;
};

export const FiltersComponent = ({
  filters,
  setFilters,
  mobile,
  setChildMenuOpen,
}: FilterProps) => {
  const showClear =
    filters.authors.length > 0 ||
    filters.status ||
    filters.pages.length > 0 ||
    filters.branches.length > 0 ||
    filters.projects.length > 0;

  return (
    <div className="flex flex-wrap gap-2 px-4 pb-2">
      {filters.authors.length > 0 && (
        <AuthorComponent
          authors={filters.authors}
          setFilters={setFilters}
          mobile={mobile}
          setChildMenuOpen={setChildMenuOpen}
        />
      )}
      {filters.status && (
        <StatusComponent
          status={filters.status}
          setFilters={setFilters}
          mobile={mobile}
          setChildMenuOpen={setChildMenuOpen}
        />
      )}
      {filters.pages.length > 0 && (
        <PageComponent
          pages={filters.pages}
          setFilters={setFilters}
          mobile={mobile}
          setChildMenuOpen={setChildMenuOpen}
        />
      )}
      {filters.branches.length > 0 && (
        <BranchComponent
          branches={filters.branches}
          setFilters={setFilters}
          mobile={mobile}
          setChildMenuOpen={setChildMenuOpen}
        />
      )}
      {filters.projects.length > 0 && (
        <ProjectComponent
          projects={filters.projects}
          setFilters={setFilters}
          mobile={mobile}
          setChildMenuOpen={setChildMenuOpen}
        />
      )}
      {showClear && <ClearButton setFilters={setFilters} />}
    </div>
  );
};
type AuthorProps = {
  authors: Author[];
  setFilters: React.Dispatch<React.SetStateAction<CommentFilters>>;
  mobile?: boolean;
  setChildMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthorComponent = ({
  authors,
  setFilters,
  mobile,
  setChildMenuOpen,
}: AuthorProps) => {
  const [showAuthorFilterPopup, setShowProjectFilterPopup] = useState(false);
  const button = useRef<HTMLDivElement>(null);

  const cleanUp = () => {
    setChildMenuOpen(false);
    setShowProjectFilterPopup(false);
  };

  const Wrapper = mobile ? MobilePopupWrapper : DesktopPopupWrapper;
  return (
    <>
      <div
        ref={button}
        className="flex h-8 cursor-pointer items-center gap-2 rounded-md bg-neutral-950 px-2 text-sm text-neutral-200 shadow-[0_0px_0px_1px] shadow-neutral-800 hover:bg-neutral-900"
        onClick={(e) => {
          e.stopPropagation();
          setShowProjectFilterPopup(true);
          setChildMenuOpen(true);
        }}
      >
        {authors.length === 1 ? (
          <>
            {authors.map((author) => (
              <div className="flex items-center gap-2" key={author.id}>
                <Image
                  className="rounded-full"
                  height={22}
                  width={22}
                  src={author.avatar}
                  alt={author.name}
                />
                <span className="text-sm">{author.name}</span>
              </div>
            ))}
          </>
        ) : (
          <>
            {authors.map((author) => (
              <Image
                className="rounded-full [&:not(:first-child)]:-ml-5"
                height={22}
                width={22}
                src={author.avatar}
                alt={author.name}
                key={author.id}
              />
            ))}
            <span className="text-sm">{authors.length} people</span>
          </>
        )}
        <button
          className="rounded-md p-1 transition hover:bg-neutral-800"
          onClick={(e) => {
            e.stopPropagation();
            setFilters((prev) => {
              return {
                ...prev,
                authors: [],
              };
            });
          }}
        >
          <svg
            fill="none"
            height="16"
            shapeRendering="geometricPrecision"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            width="16"
          >
            <path d="M18 6L6 18"></path>
            <path d="M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      {showAuthorFilterPopup && (
        <Wrapper
          cleanUp={cleanUp}
          button={button}
          isVisible={showAuthorFilterPopup}
          setVisible={setShowProjectFilterPopup}
        >
          <AuthorFilter
            activeAuthors={authors.map((author) => author.id)}
            setFilters={setFilters}
            closeMenus={cleanUp}
          />
        </Wrapper>
      )}
    </>
  );
};

type StatusProps = {
  status: string;
  setFilters: React.Dispatch<React.SetStateAction<CommentFilters>>;
  mobile?: boolean;
  setChildMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const StatusComponent = ({
  status,
  setFilters,
  mobile,
  setChildMenuOpen,
}: StatusProps) => {
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const button = useRef<HTMLDivElement>(null);

  const cleanUp = () => {
    setChildMenuOpen(false);
    setShowStatusFilter(false);
  };

  const Wrapper = mobile ? MobilePopupWrapper : DesktopPopupWrapper;

  return (
    <div
      className="flex"
      ref={button}
      onClick={(e) => {
        setShowStatusFilter(!showStatusFilter);
      }}
    >
      <div className="flex h-8 cursor-pointer items-center gap-2 rounded-md bg-neutral-950 px-2 text-sm text-neutral-200 shadow-[0_0px_0px_1px] shadow-neutral-800 hover:bg-neutral-900">
        {status === "All" ? (
          <span className="h-2 w-2 rounded-full bg-neutral-600"></span>
        ) : (
          <span className="h-2 w-2 rounded-full bg-blue-400"></span>
        )}
        <span className="text-sm">{status}</span>
        <button
          className="rounded-md p-1 transition hover:bg-neutral-800"
          onClick={(e) => {
            e.stopPropagation();
            setFilters((prev) => {
              return {
                ...prev,
                status: "",
              };
            });
          }}
        >
          <svg
            fill="none"
            height="16"
            shapeRendering="geometricPrecision"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            width="16"
          >
            <path d="M18 6L6 18"></path>
            <path d="M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      {showStatusFilter && (
        <Wrapper
          button={button}
          cleanUp={cleanUp}
          isVisible={showStatusFilter}
          setVisible={setShowStatusFilter}
        >
          <StatusFilter
            activeStatus={status}
            setFilters={setFilters}
            closeMenus={() => setShowStatusFilter(false)}
          />
        </Wrapper>
      )}
    </div>
  );
};

type ProjectProps = {
  projects: Project[];
  setFilters: React.Dispatch<React.SetStateAction<CommentFilters>>;
  mobile?: boolean;
  setChildMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProjectComponent = ({
  projects,
  setFilters,
  mobile,
  setChildMenuOpen,
}: ProjectProps) => {
  const [showProjectFilterPopup, setShowProjectFilterPopup] = useState(false);
  const button = useRef<HTMLDivElement>(null);

  const cleanUp = () => {
    setChildMenuOpen(false);
    setShowProjectFilterPopup(false);
  };

  const Wrapper = mobile ? MobilePopupWrapper : DesktopPopupWrapper;
  return (
    <>
      <div
        ref={button}
        className="flex h-8 cursor-pointer items-center gap-2 rounded-md bg-neutral-950 px-2 text-sm text-neutral-200 shadow-[0_0px_0px_1px] shadow-neutral-800 hover:bg-neutral-900"
        onClick={(e) => {
          e.stopPropagation();
          setShowProjectFilterPopup(true);
          setChildMenuOpen(true);
        }}
      >
        {projects.length === 1 ? (
          <>
            <Image
              className="rounded-full"
              height={20}
              width={20}
              src={projects[0].image}
              alt={projects[0].name}
              key={projects[0].id}
            />
            <span className="text-sm">{projects[0].name}</span>
          </>
        ) : (
          <>
            {projects.map((project) => (
              <Image
                className="rounded-full [&:not(:first-child)]:-ml-5"
                height={20}
                width={20}
                src={project.image}
                alt={project.name}
                key={project.id}
              />
            ))}
            <span className="text-sm">{projects.length} projects</span>
          </>
        )}
        <button
          className="rounded-md p-1 transition hover:bg-neutral-800"
          onClick={(e) => {
            e.stopPropagation();
            setFilters((prev) => {
              return {
                ...prev,
                projects: [],
              };
            });
          }}
        >
          <svg
            fill="none"
            height="16"
            shapeRendering="geometricPrecision"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            width="16"
          >
            <path d="M18 6L6 18"></path>
            <path d="M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      {showProjectFilterPopup && (
        <Wrapper
          cleanUp={cleanUp}
          setVisible={setShowProjectFilterPopup}
          button={button}
          isVisible={showProjectFilterPopup}
        >
          <ProjectFilter
            activeProjects={projects.map((project) => project.id)}
            setFilters={setFilters}
            closeMenus={cleanUp}
          />
        </Wrapper>
      )}
    </>
  );
};

type PageProps = {
  pages: ProjectPage[];
  setFilters: React.Dispatch<React.SetStateAction<CommentFilters>>;
  mobile?: boolean;
  setChildMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const PageComponent = ({
  pages,
  setFilters,
  mobile,
  setChildMenuOpen,
}: PageProps) => {
  const [showPageFilterPopup, setShowPageFilterPopup] = useState(false);
  const button = useRef<HTMLDivElement>(null);

  const cleanUp = () => {
    setChildMenuOpen(false);
    setShowPageFilterPopup(false);
  };

  const Wrapper = mobile ? MobilePopupWrapper : DesktopPopupWrapper;

  return (
    <>
      <div
        ref={button}
        className="flex h-8 cursor-pointer items-center gap-2 rounded-md bg-neutral-950 px-2 text-sm text-neutral-200 shadow-[0_0px_0px_1px] shadow-neutral-800 hover:bg-neutral-900"
        onClick={(e) => {
          e.stopPropagation();
          setShowPageFilterPopup(true);
          setChildMenuOpen(true);
        }}
      >
        {pages.length === 1 ? (
          <p>{pages[0].pageName}</p>
        ) : (
          <span className="text-sm">{pages.length} pages</span>
        )}
        <button
          className="rounded-md p-1 transition hover:bg-neutral-800"
          onClick={(e) => {
            e.stopPropagation();
            setFilters((prev) => {
              return {
                ...prev,
                pages: [],
              };
            });
          }}
        >
          <svg
            fill="none"
            height="16"
            shapeRendering="geometricPrecision"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            width="16"
          >
            <path d="M18 6L6 18"></path>
            <path d="M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      {showPageFilterPopup && (
        <Wrapper
          cleanUp={cleanUp}
          button={button}
          isVisible={showPageFilterPopup}
          setVisible={setShowPageFilterPopup}
        >
          <PageFilter
            activePages={pages}
            setFilters={setFilters}
            closeMenus={cleanUp}
          />
        </Wrapper>
      )}
    </>
  );
};

type BranchProps = {
  branches: Branch[];
  setFilters: React.Dispatch<React.SetStateAction<CommentFilters>>;
  mobile?: boolean;
  setChildMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const BranchComponent = ({
  branches,
  setFilters,
  mobile,
  setChildMenuOpen,
}: BranchProps) => {
  const [showBranchFilterPopup, setShowBranchFilterPopup] = useState(false);
  const button = useRef<HTMLDivElement>(null);

  const cleanUp = () => {
    setChildMenuOpen(false);
    setShowBranchFilterPopup(false);
  };

  const Wrapper = mobile ? MobilePopupWrapper : DesktopPopupWrapper;
  return (
    <>
      <div
        ref={button}
        className="flex h-8 cursor-pointer items-center gap-2 rounded-md bg-neutral-950 px-2 text-sm text-neutral-200 shadow-[0_0px_0px_1px] shadow-neutral-800 hover:bg-neutral-900"
        onClick={(e) => {
          e.stopPropagation();
          setShowBranchFilterPopup(true);
          setChildMenuOpen(true);
        }}
      >
        <svg
          fill="none"
          height="16"
          shapeRendering="geometricPrecision"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          viewBox="0 0 20 20"
          width="16"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M5 2.5v10M15 7.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM5 17.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM15 7.5A7.5 7.5 0 017.5 15"
          ></path>
        </svg>
        {branches.length === 1 ? (
          <p className="text-sm">{branches[0].branchName}</p>
        ) : (
          <p className="text-sm">{branches.length} branches</p>
        )}

        <button
          className="rounded-md p-1 transition hover:bg-neutral-800"
          onClick={(e) => {
            e.stopPropagation();
            setFilters((prev) => {
              return {
                ...prev,
                branches: [],
              };
            });
          }}
        >
          <svg
            fill="none"
            height="16"
            shapeRendering="geometricPrecision"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            width="16"
          >
            <path d="M18 6L6 18"></path>
            <path d="M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      {showBranchFilterPopup && (
        <Wrapper
          cleanUp={cleanUp}
          button={button}
          isVisible={showBranchFilterPopup}
          setVisible={setShowBranchFilterPopup}
        >
          <BranchFilter
            activeBranches={branches}
            setFilters={setFilters}
            closeMenus={cleanUp}
          />
        </Wrapper>
      )}
    </>
  );
};

type ClearProps = {
  setFilters: React.Dispatch<React.SetStateAction<CommentFilters>>;
};

const ClearButton = ({ setFilters }: ClearProps) => {
  return (
    <button
      className="flex items-center rounded-md bg-black p-1 px-2 text-sm hover:bg-neutral-900"
      onClick={(e) => {
        e.stopPropagation();
        setFilters((prev) => {
          return {
            ...prev,
            authors: [],
            status: "",
            pages: [],
            branches: [],
            projects: [],
          };
        });
      }}
    >
      <p>Clear Filters</p>
    </button>
  );
};

type DesktopPopupWrapperProps = {
  children: React.ReactNode;
  button: React.RefObject<HTMLDivElement>;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isVisible: boolean;
};

const DesktopPopupWrapper = ({
  children,
  button,
  setVisible,
  isVisible,
}: DesktopPopupWrapperProps) => {
  const menuPopup = useRef(null);
  usePopupExistsParams({
    controllingButton: button,
    menuPopup,
    setVisible,
    isVisible,
  });

  return (
    <div
      ref={menuPopup}
      className="absolute z-50 w-64  translate-y-10 rounded-xl bg-neutral-950 shadow-[0_0px_0px_1px] shadow-neutral-800"
    >
      {children}
    </div>
  );
};

const MobilePopupWrapper = ({
  children,
  cleanUp,
}: {
  children: React.ReactNode;
  cleanUp: () => void;
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  useMobileSwipe({
    overlayRef,
    popupRef,
    setDropdownVisible: cleanUp,
    startingOpacity: 0.6,
  });

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-60" ref={overlayRef}></div>
      <div
        className="mobilePopupAfter z-50 rounded-xl bg-neutral-950 shadow-[0_0px_0px_1px] shadow-neutral-800"
        ref={popupRef}
      >
        {children}
      </div>
    </>
  );
};
