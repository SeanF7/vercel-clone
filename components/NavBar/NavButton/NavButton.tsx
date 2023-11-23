"use client";
import React, { useState, useEffect, Suspense } from "react";
import { DesktopNavPopup } from "./DesktopNavPopup";
import { MobileNavPopup } from "./MobileNavPopup";
import { useCustomPopupExits } from "@/lib/hooks/usePopupExits";
import { useDisableScroll } from "@/lib/hooks/useDisableScroll";

type NavButtonProps = {
  children: React.ReactNode;
};

export const NavButton = ({ children }: NavButtonProps) => {
  const handleButtonClick = () => {
    if (!showMenu && width < 700)
      document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
    setShowMenu(!showMenu);
  };
  const [width, setWidth] = useState(0);
  const [menuHide, setMenuHide] = useState(false);

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

  const {
    menuPopup,
    controllingButton,
    isVisible: showMenu,
    setVisible: setShowMenu,
  } = useCustomPopupExits(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && showMenu) {
        setShowMenu(false);
        controllingButton.current?.focus();
      }
    },
    (event: MouseEvent) => {
      if (
        menuPopup.current &&
        !menuPopup.current.contains(event.target as Node) &&
        showMenu &&
        event.target !== controllingButton.current &&
        // This is a hack to prevent the menu from closing when clicking on the portal as otherwise it will close as its outside of the hierarchy
        !document.getElementById("portal")?.contains(event.target as Node)
      ) {
        setShowMenu(false);
        setMenuHide(false);
      }
    }
  );
  useDisableScroll(showMenu && width <= 700);

  return (
    <div className="relative">
      <div
        className={`relative ${
          showMenu
            ? "z-0 before:fixed before:left-0 before:top-0 before:z-[100] before:h-screen before:w-full"
            : ""
        }`}
      ></div>
      <button
        className="flex h-8 w-8 rounded-full"
        onClick={handleButtonClick}
        ref={controllingButton}
      >
        <div className="hidden [@media(min-width:700px)]:flex">
          <Suspense
            fallback={
              <div className="h-full w-full rounded-full bg-gradient-to-r from-green-400 to-blue-500 " />
            }
          >
            {children}
          </Suspense>
        </div>
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
      <div ref={menuPopup} className={`${menuHide ? "hidden" : "block"}`}>
        {showMenu && width > 700 && <DesktopNavPopup />}
        {showMenu && width <= 700 && (
          <MobileNavPopup setShowMenu={setShowMenu} setHideMenu={setMenuHide} />
        )}
      </div>
    </div>
  );
};
