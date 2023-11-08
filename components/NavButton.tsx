"use client";
import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { DesktopNavPopup } from "./DesktopNavPopup";
import { MobileNavPopup } from "./MobileNavPopup";

export const NavButton = () => {
  const [showMenu, setShowMenu] = useState(false);
  const menuPopup = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const handleButtonClick = () => {
    if (!showMenu && width < 700)
      document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
    setShowMenu(!showMenu);
  };
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (
        (width > 700 && window.innerWidth <= 700) ||
        (width < 700 && window.innerWidth >= 700)
      ) {
        setShowMenu(false);
      }
      setWidth(window.innerWidth);
    };
    setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowMenu(false);
      }
    };

    const handleClick = (event: MouseEvent) => {
      if (
        menuPopup.current &&
        !menuPopup.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClick);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <div className="relative">
      <button className="flex h-8 w-8" onClick={handleButtonClick}>
        <div className="hidden h-full w-full rounded-full bg-gradient-to-r from-green-400 to-blue-500 [@media(min-width:700px)]:flex" />
        {showMenu ? (
          <div className="hidden h-full w-full items-center justify-center rounded-full border border-gray-800 [@media(max-width:699px)]:flex">
            <div className="absolute h-[1.5px] w-[14px]  -rotate-45 scale-[1.1]  bg-neutral-400  transition-transform duration-[250ms] ease-[cubic-bezier(.77,0,.175,1)]" />
            <div className="absolute h-[1.5px] w-[14px]  rotate-45 scale-[1.1]  bg-neutral-400  transition-transform duration-[250ms] ease-[cubic-bezier(.77,0,.175,1)]" />
          </div>
        ) : (
          <div className="hidden h-full w-full items-center justify-center rounded-full border border-gray-800 [@media(max-width:699px)]:flex">
            <div className="absolute h-[1.5px] w-[14px] translate-y-1 bg-neutral-400 transition-transform duration-[250ms]  ease-[cubic-bezier(.77,0,.175,1)]" />
            <div className="absolute h-[1.5px] w-[14px] -translate-y-1 bg-neutral-400 transition-transform  duration-[250ms] ease-[cubic-bezier(.77,0,.175,1)]" />
          </div>
        )}
      </button>
      <div ref={menuPopup}>
        {showMenu && width > 700 && <DesktopNavPopup pathname={pathname} />}
        {showMenu && width <= 700 && <MobileNavPopup />}
      </div>
    </div>
  );
};
