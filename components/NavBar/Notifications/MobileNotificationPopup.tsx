"use client";
import { useState, useRef, useEffect } from "react";
import { SearchBar } from "@/components/SearchBar";
import { useCustomPopupExits } from "@/lib/hooks/usePopupExits";
import { DesktopNotification, MobileNotification } from "./Notification";
import { EmptyTabComponent } from "./EmptyTabComponent";
import { createPortal } from "react-dom";
import useDisableScroll from "@/lib/hooks/useDisableScroll";
import { MobileFiltersPopup } from "./FiltersPopup";

type Props = {
  controllingButton: React.RefObject<HTMLButtonElement>;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

type Notification = {
  id: number;
  image: string;
  description: string;
  time: string;
};

export const MobileNotificationPopup = ({
  controllingButton,
  setVisible,
}: Props) => {
  const [index, setIndex] = useState(0);
  const [childMenuOpen, setChildMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const filterButton = useRef<HTMLButtonElement>(null);
  const {
    menuPopup,
    isVisible: showFilterMenu,
    setVisible: setShowFilterMenu,
  } = useCustomPopupExits(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && !childMenuOpen) {
        setVisible(false);
        controllingButton.current?.focus();
      }
    },
    (event: MouseEvent) => {
      if (
        menuPopup.current &&
        !menuPopup.current.contains(event.target as Node) &&
        !childMenuOpen &&
        document.activeElement !== controllingButton.current
      ) {
        setVisible(false);
      }
    }
  );
  const tabs = ["Inbox", "Archive", "Comments"];
  const [inbox, setInbox] = useState<Notification[]>([]);
  const [archive, setArchive] = useState<Notification[]>([]);
  const [reload, setReload] = useState(false);
  useDisableScroll(true);

  useEffect(() => {
    const getNotifs = async () => {
      const inboxRes = await fetch(`/api/notifications`);
      if (!inboxRes.ok) {
        throw new Error("Failed to fetch data");
      }
      const inboxJson = await inboxRes.json();
      setInbox(inboxJson);
      const archivedRes = await fetch(`/api/notifications?archived=true`);
      if (!archivedRes.ok) {
        throw new Error("Failed to fetch data");
      }
      const archivedJson = await archivedRes.json();
      setArchive(archivedJson);
    };
    getNotifs();
  }, [reload]);

  const handleTabClick = (index: number) => {
    setIndex(index);
  };

  return createPortal(
    <>
      <div className="absolute bottom-0 left-0 z-20 h-full w-full bg-black opacity-50"></div>
      <div
        className="absolute bottom-0 left-0 z-20 flex h-4/5 w-full"
        ref={menuPopup}
      >
        <div className="flex w-full flex-col rounded-md bg-black shadow-[0_0px_1px_1px] shadow-neutral-800">
          <div className="flex flex-col border-b border-neutral-700">
            <div className="flex flex-1 items-center justify-between pl-4 pr-2">
              <div className="flex w-full gap-5 text-sm">
                {tabs.map((tab, i) => (
                  <button
                    className={`py-3 ${
                      index === i ? "border-b border-white" : ""
                    }`}
                    key={i}
                    tabIndex={0}
                    onClick={() => handleTabClick(i)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <button className="rounded-full p-2 text-white transition-colors duration-200">
                <svg
                  fill="none"
                  height="16"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  width="16"
                >
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"></path>
                </svg>
              </button>
            </div>
          </div>
          {index === 0 && (
            <div className="flex flex-1 flex-col justify-between">
              {inbox.length === 0 ? (
                <div className="flex w-full items-center justify-center">
                  <EmptyTabComponent
                    text="No new notifications"
                    svgImport={
                      <svg
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <path d="M22 12h-6l-2 3h-4l-2-3H2" />
                        <path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z" />
                      </svg>
                    }
                  />
                </div>
              ) : (
                <div className="grid auto-rows-max grid-cols-1">
                  {inbox.map((notification) => (
                    <MobileNotification
                      {...notification}
                      archived={false}
                      triggerReload={() => setReload(!reload)}
                      key={notification.id}
                    />
                  ))}
                </div>
              )}
              <div className="flex h-12 items-center p-2 shadow-[inset_0px_1px_1px] shadow-neutral-700">
                <button
                  className="ml-auto mr-auto rounded-md p-2 text-white hover:bg-neutral-800"
                  onClick={() => {
                    fetch(`/api/notifications`, {
                      method: "DELETE",
                    }).then(() => {
                      setReload(!reload);
                    });
                  }}
                >
                  Archive All
                </button>
              </div>
            </div>
          )}
          {index === 1 && (
            <div className="flex min-h-[500px] flex-col justify-between">
              {archive.length === 0 ? (
                <div className="flex min-h-[400px] w-full items-center justify-center">
                  <EmptyTabComponent
                    text="No new notifications"
                    svgImport={
                      <svg
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <path d="M21 8v13H3V8" />
                        <path d="M1 3h22v5H1z" />
                        <path d="M10 12h4" />
                      </svg>
                    }
                  />
                </div>
              ) : (
                <div className="grid min-h-[400px] auto-rows-max grid-cols-1">
                  {archive.map((notification) => (
                    <DesktopNotification
                      {...notification}
                      archived={true}
                      triggerReload={() => setReload(!reload)}
                      key={notification.id}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
          {index === 2 && (
            <div className="flex flex-col">
              <div className="flex flex-col">
                <div className="flex p-4">
                  <SearchBar
                    placeHolderText="Search comments..."
                    classes="h-8"
                    focusColors={true}
                    setInputValue={setSearchValue}
                    inputValue={searchValue}
                    clearButton={true}
                  />
                  <div className="ml-4 flex h-8 w-20 rounded-md bg-neutral-950 shadow-[0_0px_0px_1px] shadow-neutral-800">
                    <button
                      className="flex w-full flex-1  items-center px-2 text-white"
                      onClick={(e) => {
                        setShowFilterMenu(true);
                        e.stopPropagation();
                      }}
                      ref={filterButton}
                    >
                      <span className="mr-2">
                        <svg
                          height="16"
                          viewBox="0 0 24 24"
                          width="16"
                          stroke="currentColor"
                        >
                          <path d="M12 5v14"></path>
                          <path d="M5 12h14"></path>
                        </svg>
                      </span>
                      <span className="flex-1 text-sm">Filter</span>
                    </button>
                    <MobileFiltersPopup
                      showFilterMenu={showFilterMenu}
                      setShowFilterMenu={setShowFilterMenu}
                      setChildMenuOpen={setChildMenuOpen}
                      button={filterButton}
                    />
                  </div>
                </div>
              </div>
              <div className="flex w-full items-center justify-center">
                <EmptyTabComponent
                  text="No new comments"
                  svgImport={
                    <svg
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                    </svg>
                  }
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>,
    document.body
  );
};
