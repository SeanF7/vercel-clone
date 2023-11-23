"use client";
import { TeamMenu } from "@/components/TeamMenu";
import { usePopupExits } from "@/lib/hooks/usePopupExits";
import { CommandMenu } from "@/components/CommandMenu";

export const DesktopNavPopup = () => {
  const { controllingButton, isVisible, menuPopup, setVisible } =
    usePopupExits();
  const {
    controllingButton: commandMenuButton,
    isVisible: isCommandMenuVisible,
    menuPopup: CommandMenuRef,
    setVisible: setCommandMenuVisible,
  } = usePopupExits();

  const firstSection = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Settings",
      path: "/dashboard/settings",
      svg: (
        <svg
          fill="none"
          height="16"
          stroke="currentColor"
          viewBox="0 0 24 24"
          width="16"
        >
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"></path>
        </svg>
      ),
    },
  ];

  const secondSection = [
    {
      name: "Vercel homepage",
      path: "/home",
      svg: (
        <svg
          fill="none"
          height="16"
          stroke="currentColor"
          viewBox="0 0 24 24"
          width="16"
        >
          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
          <path d="M15 3h6v6"></path>
          <path d="M10 14L21 3"></path>
        </svg>
      ),
    },
    {
      name: "Log Out",
      path: "/logout",
    },
  ];

  return (
    <div className="absolute left-full right-0 z-50 w-[250px] -translate-x-full pt-3 font-sans">
      <div className="z-20 flex flex-col rounded-xl bg-neutral-950  shadow-[0_0px_1px_1px] shadow-neutral-800">
        <div className="px-5 pb-2 pt-5">
          <h1 className="text-sm font-semibold text-white">Sean Firsching</h1>
          <h2 className="text-sm text-neutral-400">seanfirsching@gmail.com</h2>
        </div>
        <ul className="flex flex-col text-sm text-neutral-500">
          {firstSection.map((path) => (
            <li
              className={`flex cursor-pointer items-center justify-between px-5  py-2 transition-colors hover:bg-neutral-800 hover:text-white`}
              key={path.path}
            >
              {path.name} {path.svg}
            </li>
          ))}

          <div>
            <button
              className="flex w-full cursor-pointer items-center justify-between px-5  py-2 transition-colors hover:bg-neutral-800  hover:text-white "
              ref={controllingButton}
              onClick={() => {
                setVisible(!isVisible);
              }}
            >
              Create Team
              <svg
                fill="none"
                height="16"
                stroke="currentColor"
                viewBox="0 0 24 24"
                width="16"
              >
                <path d="M12 5v14"></path>
                <path d="M5 12h14"></path>
              </svg>
            </button>
            {isVisible && (
              <TeamMenu
                menuRef={menuPopup}
                closeMenus={() => setVisible(false)}
                mobile={false}
              />
            )}
          </div>
          <div className="mx-5  my-3 h-0.5 bg-neutral-800" />
          <div>
            <button
              className="flex w-full cursor-pointer items-center justify-between  gap-1 px-5  py-1 hover:bg-neutral-800"
              ref={commandMenuButton}
              onClick={() => setCommandMenuVisible(true)}
            >
              Command Menu
              <div className="flex gap-1 text-xs ">
                <kbd className="rounded-md bg-neutral-950 p-1 font-sans  text-white shadow-[0_0px_0px_1px] shadow-neutral-800">
                  <span>Ctrl</span>
                </kbd>
                <kbd className="rounded-md bg-neutral-950 px-2 py-1 font-sans text-white shadow-[0_0px_0px_1px] shadow-neutral-800">
                  K
                </kbd>
              </div>
            </button>
            {isCommandMenuVisible && <CommandMenu menuRef={CommandMenuRef} />}
          </div>
          <li className="flex items-center justify-between px-5 py-1 transition-colors hover:text-white">
            Theme
            <div className="flex items-center py-1 text-neutral-500 hover:text-white">
              <span className="absolute px-1 ">
                <svg height="14" viewBox="0 0 16 16" width="14">
                  <path
                    d="M5.82804 1.8717C3.30641 2.76542 1.5 5.17204 1.5 8.0001C1.5 11.5899 4.41015 14.5001 8 14.5001C10.8282 14.5001 13.2348 12.6936 14.1285 10.1718C13.3293 10.5427 12.4386 10.7499 11.5 10.7499C8.04822 10.7499 5.25 7.95172 5.25 4.49994C5.25 3.56144 5.45718 2.67078 5.82804 1.8717ZM0 8.0001C0 3.78268 3.26298 0.328073 7.40265 0.0220947L8.009 1.27881C7.22684 2.12601 6.75 3.25644 6.75 4.49994C6.75 7.12329 8.87665 9.24994 11.5 9.24994C12.7436 9.24994 13.8741 8.77304 14.7213 7.99079L15.978 8.59708C15.6722 12.7369 12.2175 16.0001 8 16.0001C3.58172 16.0001 0 12.4184 0 8.0001Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </span>
              <select className="cursor-pointer appearance-none rounded-md bg-neutral-900 px-6 py-1 text-xs text-white shadow-[0_0px_0px_1px] shadow-neutral-700 hover:shadow-neutral-600">
                <option className="bg-neutral-900" value="dark">
                  Dark
                </option>
                <option className="bg-neutral-900" value="system">
                  System
                </option>
                <option className="bg-neutral-900" value="light">
                  Light
                </option>
              </select>
              <span className="absolute right-6">
                <svg
                  fill="none"
                  height="14"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  width="14"
                >
                  <path d="M17 8.517L12 3 7 8.517M7 15.48l5 5.517 5-5.517"></path>
                </svg>
              </span>
            </div>
          </li>
          <div className="mx-5 my-3 h-0.5 bg-neutral-800" />
          {secondSection.map((path) => (
            <li
              className={`flex cursor-pointer items-center justify-between px-5  py-2 transition-colors hover:bg-neutral-800  hover:text-white `}
              key={path.path}
            >
              {path.name} {path.svg}
            </li>
          ))}
          <div className="mx-5  my-3 h-0.5 bg-neutral-800" />
          <div className="flex justify-center px-5 pb-3 pt-1">
            <button className=" w-full rounded-md bg-white px-4 py-2 text-sm font-medium text-black">
              Upgrade to Pro
            </button>
          </div>
        </ul>
      </div>
    </div>
  );
};
