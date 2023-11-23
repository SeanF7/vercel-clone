"use client";
import { SearchBar } from "@/components/SearchBar";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useCustomPopupExits } from "@/lib/hooks/usePopupExits";
import { TeamMenu } from "../TeamMenu";
import useDisableScroll from "@/lib/hooks/useDisableScroll";
import { useMobileSwipe } from "@/lib/hooks/useMobileSwipe";
import { Team } from "@/types";

export const MobileUserDropdownPopup = () => {
  const [search, setSearch] = useState("");
  const [userListItems, setuserListItems] = useState<Team[]>([]);
  const [hideDropdown, setHideDropdown] = useState(false);
  const [menuOpacity, setMenuOpacity] = useState(0.6);
  const overlay = useRef<HTMLDivElement>(null);
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
  const closeMenus = () => {
    setDropdownVisible(false);
    setTeamVisible(false);
    setHideDropdown(false);
  };

  useMobileSwipe({
    setDropdownVisible,
    dontChangeIfTrue: [teamVisible],
    overlayRef: overlay,
    popupRef: dropdownPopup,
    startingOpacity: menuOpacity,
  });

  useEffect(() => {
    if (!teamVisible) {
      setHideDropdown(false);
    } else {
      setMenuOpacity(0);
      if (overlay?.current) overlay.current.style.opacity = "0";
    }
  }, [teamVisible]);

  useEffect(() => {
    fetch(`/api/teams?s=${search}`)
      .then((res) => res.json())
      .then((data) => {
        setuserListItems(data);
      });
  }, [search]);

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
          <div
            className={`fixed left-0 top-0 z-50 h-full w-full bg-black opacity-60`}
            ref={overlay}
          ></div>
          <div
            className={`mobilePopupAfter fixed bottom-0 left-0 z-50 h-4/5 w-full bg-neutral-950 ${
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
                inputClasses="placeholder:text-neutral-400"
              />
              <div>
                {userListItems.length > 0 ? (
                  <div className="flex-col py-6 text-sm">
                    <h1 className="px-4 pb-2 text-neutral-400">
                      Personal Account
                    </h1>
                    <ul className="px-2">
                      {userListItems.map((user) => (
                        <UserListItem
                          key={user.id}
                          name={user.name}
                          image={user.image}
                        />
                      ))}
                      {search === "" && (
                        <li
                          role="button"
                          className="flex h-10 items-center gap-2 rounded-md px-2 hover:bg-neutral-900"
                          ref={teamButton as any}
                          onClick={() => {
                            setHideDropdown(true);
                            setTeamVisible(true);
                          }}
                        >
                          <svg
                            fill="none"
                            height="16"
                            width="16"
                            shapeRendering="geometricPrecision"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                            className="text-blue-400"
                          >
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M12 8v8"></path>
                            <path d="M8 12h8"></path>
                          </svg>
                          Create Team
                        </li>
                      )}
                      {teamVisible && (
                        <TeamMenu
                          menuRef={teamPopup}
                          closeMenus={closeMenus}
                          mobile={true}
                        />
                      )}
                    </ul>
                  </div>
                ) : (
                  <Empty team={true} search={search} clearSearch={setSearch} />
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

type UserListItemProps = {
  name: string;
  image: string;
};

const UserListItem = ({ name, image }: UserListItemProps) => {
  return (
    <li
      role="button"
      className="flex h-10 items-center justify-between gap-2 rounded-md bg-neutral-800 px-2"
    >
      <div className="flex items-center gap-2">
        <Image
          src={image}
          height={20}
          width={20}
          className="rounded-full"
          alt="User avatar"
        ></Image>
        {name}
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
  );
};

const Empty = ({
  team,
  search,
  clearSearch,
}: {
  team: boolean;
  search: string;
  clearSearch: (string: string) => void;
}) => {
  const header = team ? "Team" : "Spaces or Projects";
  const subheader = team ? "team" : "spaces or projects";

  return (
    <div className="flex flex-col gap-2 bg-neutral-950 p-4">
      <p className="text-sm font-medium text-neutral-200">No {header} Found</p>
      <p className="text-sm text-neutral-500">
        Your search for &quot;{search}&quot; did not match any {subheader}.
      </p>
      <button
        className="w-full rounded-md px-4 py-1 shadow-[0_0_0_1px] shadow-neutral-800 transition-colors hover:bg-neutral-900"
        onClick={() => clearSearch("")}
      >
        Clear Search
      </button>
    </div>
  );
};
