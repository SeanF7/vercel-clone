"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { DesktopNavPopup } from "./DesktopNavPopup";
import { MobileNavPopup } from "./MobileNavPopup";

export const NavButton = () => {
  const [showMenu, setShowMenu] = useState(false);
  const pathname = usePathname();

  const handleButtonClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <div className="relative">
        <button className="flex h-8 w-8 " onClick={handleButtonClick}>
          <div className="hidden h-full w-full rounded-full bg-gradient-to-r from-green-400 to-blue-500 [@media(min-width:700px)]:flex" />
          <div className="hidden h-full w-full items-center justify-center rounded-full border border-gray-800 [@media(max-width:699px)]:flex">
            <div className="absolute h-[1.5px] w-[14px] translate-y-1 bg-neutral-500" />
            <div className="absolute h-[1.5px] w-[14px] -translate-y-1 bg-neutral-500" />
          </div>
        </button>
        {/** This menu should be full screen when width is <= 700 */}
        {showMenu && window.innerWidth > 700 && (
          <DesktopNavPopup pathname={pathname} />
        )}
        {showMenu && window.innerWidth <= 700 && <MobileNavPopup />}
      </div>
    </>
  );
};
