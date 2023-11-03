"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

export const BottomNavBar = () => {
  const [highlightStyle, setHighlightStyle] = useState({});
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
    setHighlightStyle({});
  };

  return (
    <nav
      className="h-12 shadow-[inset_0px_-1px_0px] shadow-neutral-800"
      onMouseLeave={handleMenuMouseLeave}
    >
      <div className="px-5">
        <div className="scrollbar-hide  flex items-center overflow-x-scroll whitespace-nowrap">
          <div
            className="absolute h-7 rounded-sm bg-neutral-800 duration-150 ease-in-out"
            style={highlightStyle}
          />
          {paths.map((path) => (
            <Link
              className={`link relative rounded-md px-3 py-4 text-sm transition-colors hover:text-white ${
                pathname === path.path
                  ? "text-white before:absolute  before:bottom-1 before:left-2 before:right-2 before:border-b-2 before:border-white "
                  : "text-stone-400"
              }`}
              href={path.path}
              key={path.path}
              onMouseEnter={handleMenuItemHover}
            >
              {path.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};
