import { Author, Branch, CommentFilters, Project, ProjectPage } from "@/types";
import Image from "next/image";

type FilterProps = {
  filters: CommentFilters;
  setFilters: React.Dispatch<React.SetStateAction<CommentFilters>>;
};

export const FiltersComponent = ({ filters, setFilters }: FilterProps) => {
  const showClear =
    filters.authors.length > 0 ||
    filters.status ||
    filters.pages.length > 0 ||
    filters.branches.length > 0 ||
    filters.projects.length > 0;

  return (
    <div className="flex flex-wrap gap-2 px-4 pb-2">
      {filters.authors.length > 0 && (
        <AuthorComponent authors={filters.authors} setFilters={setFilters} />
      )}
      {filters.status && (
        <StatusComponent status={filters.status} setFilters={setFilters} />
      )}
      {filters.pages.length > 0 && (
        <PageComponent pages={filters.pages} setFilters={setFilters} />
      )}
      {filters.branches.length > 0 && (
        <BranchComponent branches={filters.branches} setFilters={setFilters} />
      )}
      {filters.projects.length > 0 && (
        <ProjectComponent projects={filters.projects} setFilters={setFilters} />
      )}
      {showClear && <ClearButton setFilters={setFilters} />}
    </div>
  );
};
type AuthorProps = {
  authors: Author[];
  setFilters: React.Dispatch<React.SetStateAction<CommentFilters>>;
};

const AuthorComponent = ({ authors, setFilters }: AuthorProps) => {
  return (
    <div className="flex h-8 cursor-pointer items-center gap-2 rounded-md bg-neutral-950 px-2 text-sm text-neutral-200 shadow-[0_0px_0px_1px] shadow-neutral-800 hover:bg-neutral-900">
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
  );
};

type StatusProps = {
  status: string;
  setFilters: React.Dispatch<React.SetStateAction<CommentFilters>>;
};

const StatusComponent = ({ status, setFilters }: StatusProps) => {
  return (
    <div className="flex">
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
    </div>
  );
};

type ProjectProps = {
  projects: Project[];
  setFilters: React.Dispatch<React.SetStateAction<CommentFilters>>;
};

const ProjectComponent = ({ projects, setFilters }: ProjectProps) => {
  return (
    <div className="flex h-8 cursor-pointer items-center gap-2 rounded-md bg-neutral-950 px-2 text-sm text-neutral-200 shadow-[0_0px_0px_1px] shadow-neutral-800 hover:bg-neutral-900">
      {projects.length === 1 ? (
        <>
          {projects.map((project) => (
            <>
              <Image
                className="rounded-full"
                height={20}
                width={20}
                src={project.image}
                alt={project.name}
                key={project.id}
              />
              <span className="text-sm">{project.name}</span>
            </>
          ))}
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
  );
};

type PageProps = {
  pages: ProjectPage[];
  setFilters: React.Dispatch<React.SetStateAction<CommentFilters>>;
};

const PageComponent = ({ pages, setFilters }: PageProps) => {
  return (
    <div className="flex h-8 cursor-pointer items-center gap-2 rounded-md bg-neutral-950 px-2 text-sm text-neutral-200 shadow-[0_0px_0px_1px] shadow-neutral-800 hover:bg-neutral-900">
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
  );
};

type BranchProps = {
  branches: Branch[];
  setFilters: React.Dispatch<React.SetStateAction<CommentFilters>>;
};

const BranchComponent = ({ branches, setFilters }: BranchProps) => {
  return (
    <div className="flex h-8 cursor-pointer items-center gap-2 rounded-md bg-neutral-950 px-2 text-sm text-neutral-200 shadow-[0_0px_0px_1px] shadow-neutral-800 hover:bg-neutral-900">
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
