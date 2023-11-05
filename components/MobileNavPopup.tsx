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
      name: "Create Team",
      path: "/dashboard/create-team",
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
      name: "Feedback",
      path: "/feedback",
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
    <div className="fixed left-0 z-10 flex  w-screen overflow-y-scroll bg-black px-5 font-sans">
      <div className="flex h-screen min-h-fit flex-1 flex-col">
        <button className="rounded-md bg-neutral-950 p-2 text-white shadow-[0_0px_1px_1px] shadow-neutral-800">
          Contact
        </button>
        <div className="flex h-[4.5rem] items-center justify-between border-b border-neutral-600">
          <div>
            <h1 className="text-sm font-semibold text-white">Sean Firsching</h1>
            <h2 className="text-sm text-neutral-400">
              seanfirsching@gmail.com
            </h2>
          </div>
          <div className="h-6 w-6 rounded-full bg-gradient-to-r from-green-400 to-blue-500 " />
        </div>
        <ul className="flex h-full flex-col text-neutral-400">
          {firstSection.map((path) => (
            <>
              <li
                className={`flex h-12 cursor-pointer items-center justify-between border-b border-neutral-600 `}
                key={path.path}
              >
                {path.name} {path.svg}
              </li>
            </>
          ))}
          {/* WIP/TODO Still has to be dynamic and do all the theme stuff. Also dynamically load svgs.*/}
          <h1 className="pb-3 pt-7 text-xl font-semibold text-white">
            Resources
          </h1>
          {secondSection.map((path) => (
            <>
              <li
                className={`flex h-12 cursor-pointer items-center justify-between border-b border-neutral-600 `}
                key={path.path}
              >
                {path.name} {path.svg}
              </li>
            </>
          ))}
        </ul>
      </div>
    </div>
  );
};
