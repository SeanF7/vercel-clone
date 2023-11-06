"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";

export const BottomNavBar = () => {
  const [highlightStyle, setHighlightStyle] = useState({});
  const pathname = usePathname();
  const navBar = useRef<HTMLDivElement>(null);
  const linkDivs = useRef<HTMLDivElement>(null);
  const logo = useRef<HTMLButtonElement>(null);

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

  useEffect(() => {
    const handleScroll = () => {
      const mobileScreen = window.innerWidth <= 600;
      const transitionClasses = ["fixed", "top-0"];
      if (window.scrollY >= 64) {
        navBar.current?.classList.add(...transitionClasses);
        if (!mobileScreen) {
          logo.current?.classList.add("opacity-100");
          linkDivs.current?.classList.remove("-translate-x-6");
          linkDivs.current?.classList.add("translate-x-4");
          logo.current?.classList.add("translate-y-0");
        }
      } else {
        navBar.current?.classList.remove(...transitionClasses);
        if (!mobileScreen) {
          logo.current?.classList.remove("opacity-100");
          linkDivs.current?.classList.remove("translate-x-6");
          logo.current?.classList.remove("translate-y-0");
          linkDivs.current?.classList.add("-translate-x-6");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
    <div className="h-12">
      <nav
        className="z-10 flex w-full items-center bg-black px-6 shadow-[inset_0px_-1px_0px] shadow-neutral-800"
        onMouseLeave={handleMenuMouseLeave}
        ref={navBar}
      >
        <button
          ref={logo}
          className="relative -translate-y-5 items-center opacity-0 transition-transform duration-[.25s] ease-[ease]"
        >
          <Image src="/vercel.svg" alt="Vercel Logo" width={20} height={20} />
        </button>
        <div
          className="scrollbar-hide flex -translate-x-6 items-center overflow-x-scroll whitespace-nowrap transition-transform duration-[.25s]"
          ref={linkDivs}
        >
          <div
            className="absolute flex rounded-sm bg-neutral-800 duration-150 ease-in-out"
            style={highlightStyle}
          />
          {paths.map((path) => (
            <Link
              className={`link relative rounded-md px-3 py-4 text-sm transition-colors hover:text-white  ${
                pathname === path.path
                  ? "text-white before:absolute  before:bottom-0 before:left-2 before:right-2 before:border-b-2 before:border-white "
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
      </nav>
    </div>
  );
};
