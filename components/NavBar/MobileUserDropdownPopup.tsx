"use client";
import { SearchBar } from "@/components/SearchBar";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useCustomPopupExits, usePopupExits } from "@/lib/hooks/usePopupExits";
import { MobileTeamMenu } from "../Projects/ProjectsContent";
import useDisableScroll from "@/lib/hooks/useDisableScroll";

type MobileUserDropdownPopupProps = {
  avatar: string;
  setVisible?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MobileUserDropdownPopup = ({
  avatar,
}: MobileUserDropdownPopupProps) => {
  const [search, setSearch] = useState("");
  const [hideDropdown, setHideDropdown] = useState(false);
  const {
    controllingButton: dropdownButton,
    isVisible: dropdownVisible,
    menuPopup: dropdownPopup,
    setVisible: setDropdownVisible,
  } = useCustomPopupExits(
    (event) => {
      if (event.key === "Escape" && dropdownVisible && !teamVisible) {
        setDropdownVisible(false);
        setHideDropdown(false);
      }
    },
    (event) => {
      if (
        dropdownPopup.current &&
        !dropdownPopup.current.contains(event.target as Node) &&
        dropdownVisible &&
        event.target !== dropdownButton.current &&
        !teamVisible
      ) {
        setDropdownVisible(false);
      }
    }
  );
  const {
    controllingButton: teamButton,
    isVisible: teamVisible,
    menuPopup: teamPopup,
    setVisible: setTeamVisible,
  } = useCustomPopupExits(
    (event) => {
      if (event.key === "Escape" && teamVisible) {
        setDropdownVisible(false);
        setTeamVisible(false);
        setHideDropdown(false);
      }
    },
    (event) => {
      if (
        teamPopup.current &&
        !teamPopup.current.contains(event.target as Node) &&
        teamVisible &&
        event.target !== teamButton.current
      ) {
        setDropdownVisible(false);
        setTeamVisible(false);
        setHideDropdown(false);
      }
    }
  );

  useEffect(() => {
    if (!teamVisible) {
      setHideDropdown(false);
    }
  }, [teamVisible]);

  useDisableScroll(dropdownVisible || teamVisible);

  return (
    <>
      <button
        className="flex h-10 w-7 flex-shrink-0 items-center justify-center rounded-lg text-sm text-gray-400 hover:bg-neutral-800"
        ref={dropdownButton}
        onClick={() => setDropdownVisible(!dropdownVisible)}
      >
        <svg
          aria-hidden="true"
          fill="none"
          height="16"
          viewBox="0 0 16 24"
          className="stroke-current text-gray-400"
        >
          <path d="M13 8.517L8 3 3 8.517M3 15.48l5 5.517 5-5.517"></path>
        </svg>
      </button>
      {dropdownVisible && (
        <>
          <div className="fixed left-0 top-0 z-50 h-full w-full bg-black opacity-75"></div>
          <div
            className={`fixed bottom-0 left-0 z-50 h-4/5 w-full overflow-hidden bg-neutral-950 ${
              hideDropdown ? "hidden" : "block"
            }`}
            ref={dropdownPopup}
          >
            <div className="flex flex-col">
              <SearchBar
                inputValue={search}
                placeHolderText="Find Team..."
                setInputValue={setSearch}
                classes="rounded-b-none h-12"
                textColor="placeholder:text-neutral-400"
              />
              <div>
                <div className="flex-col py-6 text-sm">
                  <h1 className="px-4 pb-2 text-neutral-400">
                    Personal Account
                  </h1>
                  <ul className="px-2">
                    <li
                      role="button"
                      className="flex h-10 items-center justify-between gap-2 rounded-md bg-neutral-800 px-2"
                    >
                      <div className="flex items-center gap-2">
                        <Image
                          src={avatar}
                          height={20}
                          width={20}
                          className="rounded-full"
                          alt="User avatar"
                        ></Image>
                        Sean Firshcing
                      </div>
                      <svg
                        fill="none"
                        height="20"
                        shapeRendering="geometricPrecision"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        width="20"
                        className="text-neutral-400"
                      >
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </li>
                    <li
                      role="button"
                      className="flex h-10 items-center gap-2 rounded-md px-2 hover:bg-neutral-900"
                      ref={teamButton as any}
                      onClick={() => {
                        setTeamVisible(true);
                        setHideDropdown(true);
                      }}
                    >
                      <svg
                        fill="none"
                        height="20"
                        width="20"
                        shapeRendering="geometricPrecision"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        className="text-blue-500"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 8v8"></path>
                        <path d="M8 12h8"></path>
                      </svg>
                      Create Team
                    </li>
                    {teamVisible && (
                      <MobileTeamMenu
                        menuRef={teamPopup}
                        setVisible={setTeamVisible}
                      />
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
