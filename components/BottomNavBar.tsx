"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const BottomNavBar = () => {
  const pathname = usePathname();

  const paths = [
    {
      name: "Overview",
      path: "/dashboard",
    },
    {
      name: "Integrations",
      path: "/dashboard/integrations",
    },
    {
      name: "Activity",
      path: "/dashboard/activity",
    },
    {
      name: "Domains",
      path: "/dashboard/domains",
    },
    {
      name: "Usage",
      path: "/dashboard/usage",
    },
    {
      name: "Monitoring",
      path: "/dashboard/monitoring",
    },
    {
      name: "Storage",
      path: "/dashboard/storage",
    },
    {
      name: "Settings",
      path: "/dashboard/settings",
    },
  ];

  return (
    <nav className="shadow-[inset_0px_-1px_0px] shadow-neutral-800 ">
      <div className="scrollbar-hide  flex items-center overflow-x-scroll whitespace-nowrap px-5">
        {paths.map((path) => (
          <Link
            className={`link relative h-max rounded-md px-3 py-1 pb-4 text-sm  hover:bg-slate-700 ${
              pathname === path.path
                ? "text-white before:absolute  before:bottom-0 before:left-2 before:right-2 before:block  before:border-b-2 before:border-white "
                : "text-stone-400"
            }`}
            href={path.path}
            key={path.path}
          >
            {path.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};
