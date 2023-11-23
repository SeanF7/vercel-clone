import { useEffect, useState } from "react";
import { CommentFilters, Project } from "@/types";
import { SearchBar } from "@/components/SearchBar";
import Image from "next/image";
import { addToProjectFilter } from "@/lib/utils/filtersHelpers";

export const ProjectFilter = ({
  setFilters,
  activeProjects,
  closeMenus,
}: {
  setFilters: React.Dispatch<React.SetStateAction<CommentFilters>>;
  activeProjects: number[];
  closeMenus: () => void;
}) => {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [projectSearch, setProjectSearch] = useState<string>("");
  useEffect(() => {
    const getProjects = async () => {
      const res = await fetch(`/api/projects?q=${projectSearch}`);
      const data = await res.json();
      setProjects(data);
    };
    getProjects();
  }, [projectSearch]);
  const handleClick = (project: Project) => {
    addToProjectFilter(project, setFilters, true);
    closeMenus();
  };
  return (
    <div className="">
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
            onClick={() => handleClick(project)}
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
            {activeProjects.includes(project.id) && (
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
