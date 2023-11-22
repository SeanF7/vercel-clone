"use client";
import { RefObject, useEffect, useState, useRef } from "react";
import { SearchBar } from "../SearchBar";
import { ListProject, GridProject } from "./Project";
import { useProjectContext } from "../../lib/hooks/ProjectContext";
import { usePopupExits } from "@/lib/hooks/usePopupExits";
import Link from "next/link";
import { createPortal } from "react-dom";
import { useMobileSwipe } from "@/lib/hooks/useMobileSwipe";
import useDisableScroll from "@/lib/hooks/useDisableScroll";

export const ProjectsContent = () => {
  const [favoritesCollapsed, setFavoritesCollapsed] = useState(false);
  const [isListView, setIsListView] = useState(false);
  const [favoriteExist, setFavoriteExist] = useState(false);
  const { projects, setSearch, search } = useProjectContext();
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth <= 600);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const favoriteExist = projects.some((project) => project.favorite);
    setFavoriteExist(favoriteExist);
  }, [projects]);

  return (
    <div className="ml-auto mr-auto min-h-screen max-w-[1200px] px-4 py-3">
      <div className="flex w-full flex-1 items-center">
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
        <AddNewButton />
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
                      favorite={project.favorite}
                      inFavoriteSection={true}
                      mobile={mobile}
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
                favorite={project.favorite}
                mobile={mobile}
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
                        favorite={project.favorite}
                        mobile={mobile}
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
                favorite={project.favorite}
                mobile={mobile}
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
    console.log(menuItem);
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
              className="pointer-events-none"
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
              className="pointer-events-none fill-current"
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

const AddNewButton = () => {
  const { controllingButton, menuPopup, isVisible, setVisible } =
    usePopupExits();
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth <= 600);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <button
        className="hover:bg-neutral-30 flex h-10 items-center rounded-md bg-neutral-200 px-2 text-center align-middle text-black [@media(min-width:601px)]:w-32"
        ref={controllingButton}
        onClick={() => setVisible(!isVisible)}
      >
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
      {mobile ? (
        <MobileAddButtonPopup
          isVisible={isVisible}
          menuPopup={menuPopup}
          setVisible={setVisible}
        />
      ) : (
        <DesktopAddButtonPopup
          isVisible={isVisible}
          menuPopup={menuPopup}
          setVisible={setVisible}
        />
      )}
    </div>
  );
};

type TeamMenuProps = {
  menuRef: RefObject<HTMLDivElement>;
  setVisible: (visible: boolean) => void;
  transferTeam?: boolean;
};

export const DesktopTeamMenu = ({
  menuRef,
  setVisible,
  transferTeam,
}: TeamMenuProps) => {
  const [selectedButton, setSelectedButton] = useState(0);
  const [teamName, setTeamName] = useState("Sean Firsching's Team");

  return createPortal(
    <>
      <div className="absolute left-0 top-0 z-50 h-full w-full bg-black opacity-70" />
      <div
        className="absolute left-0 right-0 top-0 z-50 ml-auto mr-auto flex h-full w-full items-center justify-center"
        id="portal"
      >
        <div
          className="flex w-[480px] flex-col gap-4 rounded-xl bg-black bg-gradient-to-b from-neutral-900 to-5% shadow-[0_0px_0px_1px] shadow-neutral-800"
          ref={menuRef}
        >
          <div className="flex flex-col gap-4 p-6">
            <h1 className="text-2xl font-bold text-neutral-200">
              {transferTeam ? "Transfer" : "Create Team"}
            </h1>
            <div className="flex flex-col gap-2">
              {transferTeam && (
                <p className="text-sm text-neutral-500 ">
                  Create a new team to transfer your project(s) to.
                </p>
              )}
              <p className="text-xs text-neutral-400 ">Team Name</p>
              <input
                className="rounded-md bg-neutral-950 p-2 shadow-[0_0px_0px_1px] shadow-neutral-800 outline outline-0 outline-neutral-400 ring-neutral-700 transition-all focus-within:outline-1 focus-within:ring-4 hover:shadow-neutral-600"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              ></input>
            </div>
            <div className="flex flex-col text-sm">
              <div className="flex gap-4">
                {[
                  { header: "Pro Trial", subheader: "Free for two weeks" },
                  { header: "Pro", subheader: "Get started now" },
                ].map((item, i) => (
                  <button
                    className={`flex w-[184px] flex-1 items-center justify-between gap-4 rounded-md p-3 text-start shadow-[0_0px_0px_1px] shadow-neutral-800 hover:bg-neutral-900 ${
                      selectedButton === i ? "shadow-blue-600" : ""
                    }`}
                    key={i}
                    onClick={() => setSelectedButton(i)}
                  >
                    <div className="flex flex-col justify-between p-1">
                      <h1 className="font-medium">{item.header}</h1>
                      <p className=" text-neutral-400">{item.subheader}</p>
                    </div>
                    <span
                      className={`${
                        selectedButton === i
                          ? "fill-blue-400 text-blue-950"
                          : ""
                      }`}
                    >
                      <svg
                        height="20"
                        shapeRendering="geometricPrecision"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        width="20"
                      >
                        <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"></path>
                        <path d="M8 11.8571L10.5 14.3572L15.8572 9"></path>
                      </svg>
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <details className="group text-sm">
              <summary className="flex list-none items-center">
                <svg
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  width="24"
                  className={`-rotate-90 transition duration-200 ease-linear group-open:rotate-0`}
                >
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
                {`Continuing will start a ${
                  selectedButton
                    ? "monthly Pro plan subscription."
                    : "14-day Pro plan trial."
                }`}
              </summary>
              <div className="ml-6 flex flex-col gap-2 pt-2">
                <p className="flex-0">
                  Creating a new team will not affect your Personal Account
                  (Hobby) or any of its projects.
                </p>
                <Link
                  href={"https://vercel.com/docs/accounts/plans/pro/trials"}
                  className="flex items-center gap-2 font-medium text-blue-500"
                >
                  Learn More
                  <svg
                    fill="none"
                    height="16"
                    shapeRendering="geometricPrecision"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="16"
                  >
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                    <path d="M15 3h6v6"></path>
                    <path d="M10 14L21 3"></path>
                  </svg>
                </Link>
              </div>
            </details>
          </div>
          <div className="flex justify-between rounded-b-xl border-t border-neutral-800 bg-neutral-950 p-3 text-sm">
            <button
              className="rounded-md bg-neutral-950 p-3 text-neutral-200 shadow-[0_0px_0px_1px] shadow-neutral-800"
              onClick={() => setVisible(false)}
            >
              Cancel
            </button>
            <button
              className="rounded-md bg-neutral-200 p-3 text-neutral-600"
              onClick={() => setVisible(false)}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
};

type AddButtonPopupProps = {
  isVisible: boolean;
  menuPopup: RefObject<HTMLDivElement>;
  setVisible: (visible: boolean) => void;
};

const DesktopAddButtonPopup = ({
  isVisible,
  menuPopup,
  setVisible,
}: AddButtonPopupProps) => {
  const {
    controllingButton: teamMenuControllingButton,
    menuPopup: teamMenuPopup,
    isVisible: teamMenuIsVisible,
    setVisible: setTeamMenuVisible,
  } = usePopupExits();

  return (
    <>
      {isVisible && (
        <div
          className="absolute z-10  w-32 translate-y-2 rounded-lg bg-neutral-950 p-2 shadow-[0_0px_0px_1px] shadow-neutral-800"
          ref={menuPopup}
        >
          {[
            { name: "Project", url: "http://vercel.com/new" },
            { name: "Domain", url: "http://vercel.com/domains" },
            { name: "Storage", url: "http://vercel.com/stores" },
          ].map((item, i) => (
            <Link
              className="flex h-10 w-full items-center rounded-md px-2 py-1 text-sm text-white hover:bg-neutral-800"
              key={i}
              href={item.url}
            >
              {item.name}
            </Link>
          ))}
          <button
            className="flex h-10 w-full items-center rounded-md px-2 py-1 text-sm text-white hover:bg-neutral-800"
            onClick={() => {
              setVisible(false);
              setTeamMenuVisible(!teamMenuIsVisible);
            }}
            ref={teamMenuControllingButton}
          >
            Team
          </button>
        </div>
      )}

      {teamMenuIsVisible && (
        <DesktopTeamMenu
          setVisible={setTeamMenuVisible}
          menuRef={teamMenuPopup}
        />
      )}
    </>
  );
};

const MobileAddButtonPopup = ({
  isVisible,
  menuPopup,
  setVisible,
}: AddButtonPopupProps) => {
  const menuOverlay = useRef(null);
  const {
    controllingButton: teamMenuControllingButton,
    menuPopup: teamMenuPopup,
    isVisible: teamMenuIsVisible,
    setVisible: setTeamMenuVisible,
  } = usePopupExits();
  useDisableScroll(isVisible || teamMenuIsVisible);
  useMobileSwipe({
    overlayRef: menuOverlay,
    startingOpacity: 0.6,
    popupRef: menuPopup,
    setDropdownVisible: () => {
      setVisible(false);
      setTeamMenuVisible(false);
    },
  });

  return (
    <>
      {isVisible && (
        <>
          <div
            className="fixed inset-0 z-10 bg-black opacity-60"
            ref={menuOverlay}
          />
          <div
            className="mobilePopupAfter absolute bottom-0 left-0 right-0 z-10 rounded-t-lg bg-neutral-950 shadow-[0_0px_0px_1px] shadow-neutral-800"
            ref={menuPopup}
          >
            {[
              { name: "Project", url: "http://vercel.com/new" },
              { name: "Domain", url: "http://vercel.com/domains" },
              { name: "Storage", url: "http://vercel.com/stores" },
            ].map((item, i) => (
              <Link
                className="flex h-14 w-full items-center rounded-md px-2 py-1 text-sm text-white hover:bg-neutral-800"
                key={i}
                href={item.url}
              >
                {item.name}
              </Link>
            ))}
            <button
              className="flex h-14 w-full items-center rounded-md px-2 py-1 text-sm text-white hover:bg-neutral-800"
              onClick={() => {
                setVisible(false);
                setTeamMenuVisible(!teamMenuIsVisible);
              }}
              ref={teamMenuControllingButton}
            >
              Team
            </button>
          </div>
        </>
      )}

      {teamMenuIsVisible && (
        <MobileTeamMenu
          menuRef={teamMenuPopup}
          closeMenus={() => {
            setVisible(false);
            setTeamMenuVisible(false);
          }}
        />
      )}
    </>
  );
};

type MobileTeamMenuProps = {
  menuRef: RefObject<HTMLDivElement>;
  closeMenus: () => void;
  transferTeam?: boolean;
};

export const MobileTeamMenu = ({
  menuRef,
  closeMenus,
  transferTeam,
}: MobileTeamMenuProps) => {
  const [selectedButton, setSelectedButton] = useState(0);
  const overlayRef = useRef(null);
  const [teamName, setTeamName] = useState("Sean Firsching's Team");

  useMobileSwipe({
    overlayRef,
    startingOpacity: 0.6,
    popupRef: menuRef,
    setDropdownVisible: () => closeMenus(),
  });

  return createPortal(
    <>
      <div
        className="absolute left-0 top-0 z-50 h-full w-full bg-black opacity-60"
        ref={overlayRef}
      />
      <div
        className="absolute bottom-0 left-0 right-0 z-50 ml-auto mr-auto flex h-4/5 w-full items-end justify-center"
        id="portal"
      >
        <div
          className="mobilePopupAfter flex w-full flex-col gap-4 rounded-t-xl bg-black bg-gradient-to-b from-neutral-900 to-5% shadow-[0_0px_0px_1px] shadow-neutral-800 after:bg-neutral-950"
          ref={menuRef}
        >
          <div className="flex flex-col gap-4 p-6">
            <h1 className="text-2xl font-bold text-neutral-200">
              {transferTeam ? "Transfer" : "Create Team"}
            </h1>
            <div className="flex flex-col gap-2">
              {transferTeam && (
                <p className="text-sm text-neutral-500 ">
                  Create a new team to transfer your project(s) to.
                </p>
              )}
              <p className="text-xs text-neutral-400 ">Team Name</p>
              <input
                className="rounded-md bg-neutral-950 p-2 shadow-[0_0px_0px_1px] shadow-neutral-800 outline outline-0 outline-neutral-400
                 ring-neutral-700 transition-all focus-within:outline-1 focus-within:ring-4 hover:shadow-neutral-600"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              ></input>
            </div>
            <div className="flex flex-col text-sm">
              <div className="flex gap-4">
                {[
                  { header: "Pro Trial", subheader: "Free for two weeks" },
                  { header: "Pro", subheader: "Get started now" },
                ].map((item, i) => (
                  <button
                    className={`flex w-[184px] flex-1 items-center justify-between gap-4 rounded-md p-3 text-start shadow-[0_0px_0px_1px] shadow-neutral-800 hover:bg-neutral-900 ${
                      selectedButton === i ? "shadow-blue-600" : ""
                    }`}
                    key={i}
                    onClick={() => setSelectedButton(i)}
                  >
                    <div className="flex flex-col justify-between p-1">
                      <h1 className="font-medium">{item.header}</h1>
                      <p className=" text-neutral-400">{item.subheader}</p>
                    </div>
                    <span
                      className={`${
                        selectedButton === i
                          ? "fill-blue-400 text-blue-950"
                          : ""
                      }`}
                    >
                      <svg
                        height="20"
                        shapeRendering="geometricPrecision"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        width="20"
                      >
                        <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"></path>
                        <path d="M8 11.8571L10.5 14.3572L15.8572 9"></path>
                      </svg>
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <details className="group pt-2 text-sm">
              <summary className="flex list-none items-center">
                <svg
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  width="24"
                  className={`-rotate-90 transition duration-200 ease-linear group-open:rotate-0`}
                >
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
                {`Continuing will start a ${
                  selectedButton
                    ? "monthly Pro plan subscription."
                    : "14-day Pro plan trial."
                }`}
              </summary>
              <div className="ml-6 flex flex-col gap-2 pt-2">
                <p className="flex-0">
                  Creating a new team will not affect your Personal Account
                  (Hobby) or any of its projects.
                </p>
                <Link
                  href={"https://vercel.com/docs/accounts/plans/pro/trials"}
                  className="flex items-center gap-2 font-medium text-blue-500"
                >
                  Learn More
                  <svg
                    fill="none"
                    height="16"
                    shapeRendering="geometricPrecision"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="16"
                  >
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                    <path d="M15 3h6v6"></path>
                    <path d="M10 14L21 3"></path>
                  </svg>
                </Link>
              </div>
            </details>
          </div>
          <div className="flex justify-between border-t border-neutral-800 bg-neutral-950 p-3 text-sm">
            <button
              className="rounded-md bg-neutral-950 p-3 text-neutral-200 shadow-[0_0px_0px_1px] shadow-neutral-800"
              onClick={() => closeMenus()}
            >
              Cancel
            </button>
            <button
              className="rounded-md bg-neutral-200 p-3 text-neutral-600"
              onClick={() => closeMenus()}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
};
