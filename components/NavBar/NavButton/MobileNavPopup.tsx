import Link from "next/link";

export const MobileNavPopup = () => {
  const firstSection = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Settings",
      path: "/dashboard/settings",
    },
    {
      name: "New Team",
      svg: (
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
      ),
    },
    {
      name: "Theme",
      svg: (
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
      ),
    },
    {
      name: "Log Out",
    },
  ];

  const secondSection = [
    {
      name: "Change Log",
      path: "/changelog",
    },
    {
      name: "Help",
      path: "/help",
    },
    {
      name: "Documentation",
      path: "/docs",
    },
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
  ];

  return (
    <div className="fixed bottom-0 left-0 top-14 z-50 flex w-screen overflow-scroll bg-black px-6  font-sans">
      <div className="flex flex-1 flex-col py-1 ">
        <div className="flex justify-center">
          <Link
            href={"https://vercel.com/contact"}
            className="w-full rounded-md bg-neutral-950 p-2 text-white shadow-[0_0px_1px_1px] shadow-neutral-800"
          >
            Contact
          </Link>
        </div>
        <div className="flex items-center justify-between border-b border-neutral-700">
          <div className="flex h-[72px] flex-col justify-center">
            <h1 className="flex text-sm text-white">Sean Firsching</h1>
            <h2 className="flex text-sm text-neutral-400">
              seanfirsching@gmail.com
            </h2>
          </div>
          <div className="h-6 w-6 rounded-full bg-gradient-to-r from-green-400 to-blue-500 " />
        </div>
        <ul className="flex flex-col pb-6 text-neutral-400">
          {firstSection.map((path) => (
            <li
              className={`flex h-12 cursor-pointer items-center justify-between border-b border-neutral-700 `}
              key={path.name}
            >
              {path.name} {path.svg}
            </li>
          ))}
          {/* WIP/TODO Still has to be dynamic and do all the theme stuff. Also dynamically load svgs.*/}
          <h1 className="pb-3 pt-7 text-xl font-semibold text-white">
            Resources
          </h1>
          {secondSection.map((path) => (
            <li
              className={`flex h-12 cursor-pointer items-center justify-between border-b border-neutral-700 `}
              key={path.name}
            >
              {path.name} {path.svg}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
