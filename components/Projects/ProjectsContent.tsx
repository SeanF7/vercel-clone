"use client";
import { useEffect, useState } from "react";
import { SearchBar } from "../SearchBar";
import { ListProject, GridProject } from "./Project";

type Project = {
  id: number;
  name: string;
  description: string;
  url: string;
  image: string;
  lastUpdated: string;
  favorite: boolean;
};

export const ProjectsContent = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState("");
  const [favoritesCollapsed, setFavoritesCollapsed] = useState(false);
  const [isListView, setIsListView] = useState(false);
  const [favoriteExist, setFavoriteExist] = useState(false);

  useEffect(() => {
    const getProjects = async () => {
      const res = await fetch(`/api/projects?s=${search}`);
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const json = await res.json();
      setProjects(json);
    };
    getProjects();
  }, [search]);

  return (
    <div className="ml-auto mr-auto min-h-screen max-w-[1200px] px-4 py-3">
      <div className="flex w-full items-center">
        <SearchBar
          placeHolderText="Search..."
          focusColors={true}
          inputValue={search}
          setInputValue={setSearch}
          clearButton={true}
          classes="hover:shadow-neutral-600"
        />
        <ProjectViewButtons
          isListView={isListView}
          setIsListView={setIsListView}
        />
        <button className="flex h-10 items-center rounded-md bg-neutral-200 px-2 text-center align-middle text-black hover:bg-neutral-300 [@media(min-width:601px)]:w-36">
          <div className="flex flex-1 items-center justify-between">
            <span className=" font-medium: medium inline-block select-none text-sm [@media(max-width:600px)]:hidden">
              Add New...
            </span>
            <svg
              fill="none"
              height="24"
              stroke="currentColor"
              viewBox="0 0 24 24"
              width="24"
              className="[@media(max-width:600px)]:hidden"
            >
              <path d="M6 9l6 6 6-6"></path>
            </svg>
          </div>
          <svg
            fill="none"
            height="24"
            stroke="currentColor"
            viewBox="0 0 24 24"
            className="[@media(min-width:601px)]:hidden"
            width="24"
          >
            <path d="M12 5v14"></path>
            <path d="M5 12h14"></path>
          </svg>
        </button>
      </div>
      {isListView ? (
        <div>
          {favoriteExist && (
            <div className="">
              <div>
                <button
                  className="flex w-36 items-center gap-1 rounded-md p-1 text-start text-sm font-medium text-neutral-200 hover:bg-neutral-900"
                  onClick={() => setFavoritesCollapsed(!favoritesCollapsed)}
                >
                  <svg
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    width="24"
                    className={`${
                      favoritesCollapsed ? "-rotate-90" : ""
                    } transition duration-200 ease-linear`}
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                  <p>Your Favorites</p>
                </button>
              </div>
              <div
                className={`flex  flex-col gap-6 py-2 ${
                  favoritesCollapsed ? "hidden" : ""
                }`}
              >
                {projects
                  .filter((project) => project.favorite)
                  .map((project) => (
                    <ListProject
                      key={project.id}
                      projectID={project.id}
                      name={project.name}
                      description={project.description}
                      url={project.url}
                      image={project.image}
                      lastUpdated={project.lastUpdated}
                      favorite={true}
                    />
                  ))}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-6 py-6">
            {projects.map((project) => (
              <ListProject
                key={project.id}
                projectID={project.id}
                name={project.name}
                description={project.description}
                url={project.url}
                image={project.image}
                lastUpdated={project.lastUpdated}
              />
            ))}
          </div>
        </div>
      ) : (
        <div>
          {favoriteExist && (
            <>
              <div>
                <button
                  className="flex w-36 items-center gap-1 rounded-md p-1 text-start text-sm font-medium text-neutral-200 hover:bg-neutral-900"
                  onClick={() => setFavoritesCollapsed(!favoritesCollapsed)}
                >
                  <svg
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    width="24"
                    className={`${
                      favoritesCollapsed ? "-rotate-90" : ""
                    } transition duration-200 ease-linear`}
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                  <p>Your Favorites</p>
                </button>
              </div>
              <div className={`${favoritesCollapsed ? "hidden" : ""}`}>
                <div className="grid grid-cols-1 gap-6 py-6  sm:grid-cols-2 [@media(min-width:1000px)]:grid-cols-3">
                  {projects
                    .filter((project) => project.favorite)
                    .map((project) => (
                      <GridProject
                        key={project.id}
                        projectID={project.id}
                        name={project.name}
                        description={project.description}
                        url={project.url}
                        image={project.image}
                        lastUpdated={project.lastUpdated}
                        favorite={true}
                      />
                    ))}
                </div>
                <div className="h-[1px] w-full bg-neutral-800" />
              </div>
            </>
          )}
          <div className="grid grid-cols-1 gap-6 py-6  sm:grid-cols-2 [@media(min-width:1000px)]:grid-cols-3 ">
            {projects.map((project) => (
              <GridProject
                key={project.id}
                projectID={project.id}
                name={project.name}
                description={project.description}
                url={project.url}
                image={project.image}
                lastUpdated={project.lastUpdated}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

type projectViewButtonsProps = {
  isListView: boolean;
  setIsListView: (isListView: boolean) => void;
};

const ProjectViewButtons = ({
  isListView,
  setIsListView,
}: projectViewButtonsProps) => {
  const [highlightStyle, setHighlightStyle] = useState({});

  const handleMenuItemHover = (event: any) => {
    const menuItem = event.target;
    const menuItemRect = menuItem.getBoundingClientRect();
    const parentRect = menuItem.parentElement.getBoundingClientRect();

    setHighlightStyle({
      width: menuItemRect.width + "px",
      transform: `translateX(${menuItemRect.left - parentRect.left}px)`,
    });
  };
  const handleMenuMouseLeave = () => {
    if (isListView)
      setHighlightStyle({ width: "32px", transform: `translateX(32px)` });
    else setHighlightStyle({});
  };
  return (
    <div className="p-2" onMouseLeave={handleMenuMouseLeave}>
      <div className=" rounded-md px-2 py-1 shadow-[0_0px_0px_1px] shadow-neutral-800 transition-colors hover:shadow-neutral-500">
        <div className="grid h-8 w-16 grid-cols-2 justify-between">
          <div
            className="absolute h-8 w-8 rounded-md bg-neutral-800 transition duration-200"
            style={highlightStyle}
          ></div>
          <button
            className={`z-0 flex items-center  justify-center rounded-md bg-transparent text-neutral-500 hover:text-neutral-200`}
            onClick={() => setIsListView(false)}
            onMouseEnter={handleMenuItemHover}
          >
            <svg
              fill="none"
              height="24"
              shapeRendering="geometricPrecision"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M3 3h7v7H3z" />
              <path d="M14 3h7v7h-7z" />
              <path d="M14 14h7v7h-7z" />
              <path d="M3 14h7v7H3z" />
            </svg>
          </button>
          <button
            className={`z-0 flex items-center justify-center rounded-md bg-transparent text-neutral-500  hover:text-neutral-200`}
            onClick={() => setIsListView(true)}
            onMouseEnter={handleMenuItemHover}
          >
            <svg
              height="16"
              viewBox="0 0 16 16"
              width="16"
              className="fill-current"
            >
              <path
                d="M2.5 4C3.19036 4 3.75 3.44036 3.75 2.75C3.75 2.05964 3.19036 1.5 2.5 1.5C1.80964 1.5 1.25 2.05964 1.25 2.75C1.25 3.44036 1.80964 4 2.5 4ZM2.5 9.25C3.19036 9.25 3.75 8.69036 3.75 8C3.75 7.30964 3.19036 6.75 2.5 6.75C1.80964 6.75 1.25 7.30964 1.25 8C1.25 8.69036 1.80964 9.25 2.5 9.25ZM3.75 13.25C3.75 13.9404 3.19036 14.5 2.5 14.5C1.80964 14.5 1.25 13.9404 1.25 13.25C1.25 12.5596 1.80964 12 2.5 12C3.19036 12 3.75 12.5596 3.75 13.25ZM6.75 2H6V3.5H6.75H14.25H15V2H14.25H6.75ZM6.75 7.25H6V8.75H6.75H14.25H15V7.25H14.25H6.75ZM6.75 12.5H6V14H6.75H14.25H15V12.5H14.25H6.75Z"
                fill="currentColor"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
