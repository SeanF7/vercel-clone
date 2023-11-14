"use client";

import { usePopupExits } from "@/lib/hooks/usePopupExits";
import { SearchBar } from "../SearchBar";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type UserDropdownPopupProps = {
  avatar: string;
};

type Project = {
  id: number;
  name: string;
  description: string;
  url: string;
  image: string;
  lastUpdated: string;
  favorite: boolean;
};

export const UserDropdownPopup = ({ avatar }: UserDropdownPopupProps) => {
  const { controllingButton, isVisible, menuPopup, setVisible } =
    usePopupExits();
  const [teamSearch, setTeamSearch] = useState("");
  const [projectSearch, setProjectSearch] = useState("");
  const [hoveredMenu, setHoveredMenu] = useState(0);
  const [hoveredAccount, setHoveredAccount] = useState(0);
  const [projects, setProjects] = useState<Project[]>([]);
  const [favoritesCollapsed, setFavoritesCollapsed] = useState(false);

  useEffect(() => {
    const favoriteExist = projects.some((project) => project.favorite);
    setFavoritesCollapsed(favoriteExist);
  }, [projects]);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch(`/api/projects?s=${projectSearch}`);
      if (!res.ok) {
        return;
      }
      const json = await res.json();
      setProjects(json);
    };
    fetchProjects();
  }, [projectSearch]);

  return (
    <div className="flex items-center">
      <button
        className="flex h-10 w-7 flex-shrink-0 items-center justify-center rounded-lg text-sm text-gray-400 hover:bg-neutral-800"
        ref={controllingButton}
        onClick={() => setVisible(!isVisible)}
      >
        <svg
          aria-hidden="true"
          fill="none"
          height="16"
          viewBox="0 0 16 24"
          className="stroke-current text-gray-400"
        >
          <path d="M13 8.517L8 3 3 8.517M3 15.48l5 5.517 5-5.517"></path>
        </svg>
      </button>
      {isVisible && (
        <div
          className="absolute left-0 top-0 z-10 translate-x-16 translate-y-16"
          ref={menuPopup}
        >
          <div className="flex gap-x-[1px] rounded-xl bg-neutral-800 shadow-[0_0px_0px_1px] shadow-neutral-800 ">
            <div
              className={`group w-64 flex-col rounded-xl rounded-br-none border-neutral-800 only:rounded-br-xl ${
                hoveredMenu === 0 ? "bg-neutral-950" : "bg-black"
              }`}
              onMouseEnter={() => setHoveredMenu(0)}
            >
              <SearchBar
                inputValue={teamSearch}
                placeHolderText="Find Team..."
                setInputValue={setTeamSearch}
                escapeButton={true}
                classes={`rounded-tl-xl rounded-none border-b border-neutral-800 h-12 !shadow-none group-only:rounded-xl ${
                  hoveredMenu === 0 ? "!bg-neutral-950" : "!bg-black"
                }`}
              />
              <div className="flex-col py-6 text-sm">
                <h1 className="px-4 pb-2 text-neutral-400">Personal Account</h1>
                <ul className="px-2">
                  <li
                    className="flex h-10 w-full items-center justify-between gap-2 rounded-md bg-neutral-700 px-2"
                    onMouseEnter={() => setHoveredAccount(0)}
                  >
                    <div className="flex items-center gap-2">
                      <Image
                        src={avatar}
                        height={20}
                        width={20}
                        className="rounded-full"
                        alt="User avatar"
                      ></Image>
                      Sean Firshcing
                    </div>
                    <svg
                      fill="none"
                      height="20"
                      shapeRendering="geometricPrecision"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      width="20"
                      className="text-neutral-400"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </li>
                  <li
                    className="flex h-10 w-full items-center gap-2 rounded-md px-2 hover:bg-neutral-900"
                    onMouseEnter={() => setHoveredAccount(1)}
                  >
                    <svg
                      fill="none"
                      height="20"
                      width="20"
                      shapeRendering="geometricPrecision"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 8v8"></path>
                      <path d="M8 12h8"></path>
                    </svg>
                    Create Team
                  </li>
                </ul>
              </div>
            </div>
            {hoveredAccount === 0 && (
              <div
                className={`peer w-64 flex-col rounded-xl rounded-bl-none ${
                  hoveredMenu === 1 ? "bg-neutral-950" : "bg-black"
                }`}
                onMouseEnter={() => setHoveredMenu(1)}
              >
                <SearchBar
                  inputValue={projectSearch}
                  placeHolderText="Find Project..."
                  setInputValue={setProjectSearch}
                  escapeButton={true}
                  classes={`rounded-tr-xl rounded-none border-b border-neutral-800 h-12 !shadow-none ${
                    hoveredMenu === 1 ? "!bg-neutral-950" : "!bg-black"
                  }`}
                />
                <div className="flex flex-col">
                  {favoritesCollapsed && (
                    <div className="flex-col py-6 text-sm">
                      <h1 className="px-4 pb-2 text-neutral-400">Favorites</h1>
                      <ul className="px-2 pb-2">
                        {projects.map((project: Project) => {
                          if (project.favorite) {
                            return (
                              <Project
                                {...project}
                                projectID={project.id}
                                key={project.id}
                              />
                            );
                          }
                        })}
                      </ul>
                      <div className="h-[1px] w-full bg-neutral-700" />
                    </div>
                  )}
                  <div className="flex-col text-sm">
                    <h1 className="px-4 pb-2 text-neutral-400">Projects</h1>
                    <ul className="px-2 pb-2">
                      {projects.map((project: Project) => (
                        <Project
                          {...project}
                          projectID={project.id}
                          key={project.id}
                        />
                      ))}
                      <Link
                        className="flex h-10 w-full items-center gap-2 rounded-md px-2 hover:bg-neutral-700"
                        href={"/"}
                      >
                        <svg
                          fill="none"
                          height="16"
                          width="16"
                          shapeRendering="geometricPrecision"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                          className="text-blue-400"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M12 8v8"></path>
                          <path d="M8 12h8"></path>
                        </svg>
                        Create Project
                      </Link>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

type ProjectProps = {
  name: string;
  image: string;
  favorite: boolean;
  projectID: number;
};

const Project = ({ name, image, projectID, favorite }: ProjectProps) => {
  return (
    <div className="group flex h-10 w-full justify-between gap-2 rounded-md py-2 hover:bg-neutral-700">
      <div className="flex items-center gap-2 px-2">
        <Image
          src={image}
          height={16}
          width={16}
          alt={name}
          className="h-4 w-4 rounded-full border border-neutral-800"
        ></Image>
        {name}
      </div>
      <button className="hidden px-2 hover:text-white group-hover:block">
        {favorite ? (
          <svg
            fill="none"
            height="12"
            shapeRendering="geometricPrecision"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            width="12"
          >
            <path d="M18 6L6 18"></path>
            <path d="M6 6l12 12"></path>
          </svg>
        ) : (
          <svg
            height="16"
            strokeLinejoin="round"
            viewBox="0 0 16 16"
            width="16"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.00001 0.433594L8.65845 1.64093L10.5908 5.18412L14.5577 5.92698L15.9094 6.18011L14.9646 7.17942L12.192 10.1121L12.7113 14.1144L12.8883 15.4782L11.6459 14.8884L8.00001 13.1577L4.35408 14.8884L3.11173 15.4782L3.28869 14.1144L3.80802 10.1121L1.03538 7.17942L0.0906067 6.18011L1.44233 5.92698L5.40922 5.18412L7.34156 1.64093L8.00001 0.433594ZM8.00001 3.56646L6.55565 6.21487L6.38519 6.52743L6.03525 6.59296L3.07014 7.14822L5.14259 9.34029L5.38718 9.59899L5.34137 9.95205L4.95318 12.9436L7.67838 11.65L8.00001 11.4973L8.32163 11.65L11.0468 12.9436L10.6586 9.95205L10.6128 9.59899L10.8574 9.34029L12.9299 7.14822L9.96476 6.59296L9.61482 6.52743L9.44436 6.21487L8.00001 3.56646Z"
              fill="currentColor"
            ></path>
          </svg>
        )}
      </button>
    </div>
  );
};
