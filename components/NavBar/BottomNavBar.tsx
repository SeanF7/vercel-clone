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
      path: "https://vercel.com/dashboard/integrations",
    },
    {
      name: "Activity",
      path: "https://vercel.com/dashboard/activity",
    },
    {
      name: "Domains",
      path: "https://vercel.com/dashboard/domains",
    },
    {
      name: "Usage",
      path: "https://vercel.com/dashboard/usage",
    },
    {
      name: "Monitoring",
      path: "https://vercel.com/dashboard/monitoring",
    },
    {
      name: "Storage",
      path: "https://vercel.com/dashboard/storage",
    },
    {
      name: "Settings",
      path: "https://vercel.com/dashboard/settings",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const mobileScreen = window.innerWidth <= 600;
      const transitionClasses = ["fixed", "top-0"];
      const logoClasses = ["opacity-100", "translate-y-0"];
      if (window.scrollY >= 64) {
        navBar.current?.classList.add(...transitionClasses);
        navBar.current?.classList.remove("-translate-y-3");
        if (!mobileScreen) {
          logo.current?.classList.add(...logoClasses);
          linkDivs.current?.classList.add("!translate-x-4");
        }
      } else {
        navBar.current?.classList.remove(...transitionClasses);
        navBar.current?.classList.add("-translate-y-3");
        logo.current?.classList.remove(...logoClasses);
        linkDivs.current?.classList.remove("!translate-x-4");
      }
    };

    handleScroll();
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
        className="z-50 flex w-full items-center bg-black px-2 shadow-[inset_0px_-1px_0px] shadow-neutral-800 [@media(min-width:600px)]:px-6"
        onMouseLeave={handleMenuMouseLeave}
        ref={navBar}
      >
        <button
          ref={logo}
          className="relative -translate-y-5 items-center opacity-0 transition-transform duration-[.25s] ease-[ease] [@media(max-width:601px)]:fixed"
        >
          <Image
            src="/vercel.png"
            alt="Vercel Logo"
            width={20}
            height={20}
            className="h-auto w-auto"
          />
        </button>
        <div
          className="scrollbar-hide flex items-center overflow-x-scroll whitespace-nowrap transition-transform duration-[.25s] [@media(min-width:600px)]:-translate-x-6"
          ref={linkDivs}
        >
          <div
            className="absolute flex h-8 rounded-sm bg-neutral-800 duration-150 ease-in-out"
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
