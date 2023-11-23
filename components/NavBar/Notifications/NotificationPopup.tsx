"use client";
import { useState, useRef, useEffect } from "react";
import { SearchBar } from "@/components/SearchBar";
import { FiltersPopup } from "./FiltersPopup";
import { useCustomPopupExits } from "@/lib/hooks/usePopupExits";
import { Notification as NotificationComponent } from "./Notification";
import { EmptyTabComponent } from "./EmptyTabComponent";
import Link from "next/link";
import {
  Notification,
  CommentFilters,
  CommentThread as CommentThreadType,
} from "@/types";
import { FiltersComponent } from "./FilterComponent";
import { useDisableScroll } from "@/lib/hooks/useDisableScroll";
import { useMobileSwipe } from "@/lib/hooks/useMobileSwipe";
import { CommentThread } from "@/components/NavBar/Notifications/CommentThread";
import { Comment } from "@/components/NavBar/Notifications/Comment";

type Props = {
  controllingButton: React.RefObject<HTMLButtonElement>;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  mobile: boolean;
};

export const NotificationPopup = ({
  controllingButton,
  setVisible,
  mobile,
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
  const [comments, setComments] = useState<CommentThreadType[]>([]);
  const [selectedComment, setSelectedComment] =
    useState<CommentThreadType | null>(null);
  const [filters, setFilters] = useState<CommentFilters>({
    authors: [],
    pages: [],
    branches: [],
    status: "",
    projects: [],
  });

  const [selectedCommentIndex, setSelectedCommentIndex] = useState<number>(0);
  useEffect(() => {
    if (selectedComment)
      setSelectedCommentIndex(
        comments.findIndex(
          (comment) => comment.threadId === selectedComment.threadId
        )
      );
  }, [selectedCommentIndex, comments, selectedComment]);

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

  const fetchComments = async () => {
    const authors = filters.authors.map((author) => author.name).join(",");
    const pages = filters.pages
      .map((page) => `${page.pageName}:${page.projectId}`)
      .join(",");
    const branches = filters.branches
      .map((branch) => `${branch.branchName}:${branch.projectId}`)
      .join(",");
    const projects = filters.projects.map((project) => project.name).join(",");
    const commentsRes = await fetch(
      `/api/comments?q=${searchValue}&authors=${authors}&pages=${pages}&branches=${branches}&status=${filters.status}&projects=${projects}`
    );

    if (!commentsRes.ok) {
      throw new Error("Failed to fetch data");
    }
    const commentsJson = await commentsRes.json();
    setComments(commentsJson);
  };

  useEffect(() => {
    const getComments = async () => {
      const authors = filters.authors.map((author) => author.name).join(",");
      const pages = filters.pages
        .map((page) => `${page.pageName}:${page.projectId}`)
        .join(",");
      const branches = filters.branches
        .map((branch) => `${branch.branchName}:${branch.projectId}`)
        .join(",");
      const projects = filters.projects
        .map((project) => project.name)
        .join(",");
      const commentsRes = await fetch(
        `/api/comments?q=${searchValue}&authors=${authors}&pages=${pages}&branches=${branches}&status=${filters.status}&projects=${projects}`
      );

      if (!commentsRes.ok) {
        throw new Error("Failed to fetch data");
      }
      const commentsJson = await commentsRes.json();
      setComments(commentsJson);
    };
    getComments();
  }, [
    searchValue,
    filters.authors,
    filters.pages,
    filters.branches,
    filters.status,
    filters.projects,
  ]);

  const nextComment = () => {
    if (selectedComment) {
      const index = comments.findIndex(
        (comment) => comment.threadId === selectedComment.threadId
      );
      if (index !== comments.length - 1) {
        setSelectedComment(comments[index + 1]);
      }
    }
  };
  const prevComment = () => {
    if (selectedComment) {
      const index = comments.findIndex(
        (comment) => comment.threadId === selectedComment.threadId
      );
      if (index !== 0) {
        setSelectedComment(comments[index - 1]);
      }
    }
  };

  const handleTabClick = (index: number) => {
    setIndex(index);
  };

  const commentThread = useRef(null);
  const Wrapper = mobile ? MobileWrapper : DesktopWrapper;
  useDisableScroll(mobile);

  return (
    <Wrapper
      menuPopup={menuPopup}
      setVisible={setVisible}
      dontChangeIfTrue={[childMenuOpen, showFilterMenu]}
      scrollableElements={[commentThread]}
    >
      {selectedComment ? (
        <div className="left-12 rounded-md bg-black shadow-[0_0px_1px_1px]  shadow-neutral-800 [@media(min-width:601px)]:relative">
          <div className="flex flex-col border-b border-neutral-700">
            <div className="flex h-12 items-center justify-between pl-1 pr-2">
              <button
                className="flex items-center rounded-md p-2 text-sm hover:bg-neutral-900"
                onClick={() => setSelectedComment(null)}
              >
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
                >
                  <path d="M15 18l-6-6 6-6"></path>
                </svg>
                Back
              </button>
              <div className="flex gap-2">
                <button
                  className={`flex rounded-md p-1 hover:bg-neutral-900 ${
                    selectedCommentIndex < 1
                      ? "cursor-not-allowed opacity-50"
                      : ""
                  }`}
                  onClick={prevComment}
                >
                  <svg
                    fill="none"
                    height="16"
                    shapeRendering="geometricPrecision"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width="16"
                  >
                    <path d="M18 15l-6-6-6 6"></path>
                  </svg>
                </button>
                <button
                  className={`rounded-md p-1 hover:bg-neutral-900 ${
                    selectedCommentIndex > comments.length - 2
                      ? "cursor-not-allowed opacity-50"
                      : ""
                  }`}
                  onClick={nextComment}
                >
                  <svg
                    fill="none"
                    height="16"
                    shapeRendering="geometricPrecision"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width="16"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col overflow-y-auto" ref={commentThread}>
            <div className="flex h-3/4 w-full flex-col gap-5">
              <div className="flex flex-col  bg-neutral-950">
                <CommentThread
                  commentThread={selectedComment}
                  fetchComments={fetchComments}
                />
              </div>
              <div className="flex w-full flex-wrap justify-center gap-1 pb-8 text-sm">
                <p className="text-center">
                  To reply to the comment thread, go to the
                </p>
                <Link
                  href={"/"}
                  className="flex items-center justify-center border-blue-500 text-blue-500 hover:border-b"
                >
                  deployment
                  <svg
                    height="16"
                    strokeLinejoin="round"
                    viewBox="0 0 16 16"
                    width="16"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.5 9.75V11.25C11.5 11.3881 11.3881 11.5 11.25 11.5H4.75C4.61193 11.5 4.5 11.3881 4.5 11.25L4.5 4.75C4.5 4.61193 4.61193 4.5 4.75 4.5H6.25H7V3H6.25H4.75C3.7835 3 3 3.7835 3 4.75V11.25C3 12.2165 3.7835 13 4.75 13H11.25C12.2165 13 13 12.2165 13 11.25V9.75V9H11.5V9.75ZM8.5 3H9.25H12.2495C12.6637 3 12.9995 3.33579 12.9995 3.75V6.75V7.5H11.4995V6.75V5.56066L8.53033 8.52978L8 9.06011L6.93934 7.99945L7.46967 7.46912L10.4388 4.5H9.25H8.5V3Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="[@media(max-width:600px)]:mobilePopupAfter relative left-12 flex w-full flex-col rounded-md bg-black shadow-[0_0px_1px_1px]  shadow-neutral-800">
          <div className="flex flex-col border-b border-neutral-700">
            <div className="flex items-center justify-between pl-4 pr-2">
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
              <Link
                href={"https://vercel.com/account/notifications"}
                className="rounded-full p-2 transition-colors duration-200 hover:bg-neutral-700 hover:text-white"
              >
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
              </Link>
            </div>
          </div>
          {index === 0 && (
            <div className="flex flex-1 flex-col justify-between [@media(min-width:601px)]:min-h-[500px]">
              {inbox.length === 0 ? (
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
                        <path d="M22 12h-6l-2 3h-4l-2-3H2" />
                        <path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z" />
                      </svg>
                    }
                  />
                </div>
              ) : (
                <div className="grid auto-rows-max grid-cols-1 [@media(min-width:601px)]:min-h-[400px]">
                  {inbox.map((notification) => (
                    <NotificationComponent
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
            <div className="flex flex-col justify-between [@media(min-width:601px)]:min-h-[500px]">
              {archive.length === 0 ? (
                <div className="flex w-full items-center justify-center [@media(min-width:601px)]:min-h-[400px]">
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
                <div className="grid auto-rows-max grid-cols-1 [@media(min-width:601px)]:min-h-[400px]">
                  {archive.map((notification) => (
                    <NotificationComponent
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
            <div className="flex h-full flex-col overflow-y-auto">
              <div className="flex flex-col">
                <div className="flex p-4 pb-2">
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
                      onClick={() => {
                        setShowFilterMenu(true);
                        setChildMenuOpen(true);
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
                    {showFilterMenu && (
                      <FiltersPopup
                        showFilterMenu={showFilterMenu}
                        setShowFilterMenu={setShowFilterMenu}
                        setChildMenuOpen={setChildMenuOpen}
                        setFilters={setFilters}
                        filters={filters}
                        mobile={mobile}
                      />
                    )}
                  </div>
                </div>
                {filters && (
                  <FiltersComponent filters={filters} setFilters={setFilters} />
                )}
              </div>
              <div className="flex h-full w-full items-center justify-center [@media(min-width:601px)]:h-[400px]">
                {comments.length === 0 ? (
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
                ) : (
                  <div className="flex w-full flex-col self-start">
                    {comments.map((thread, i) => (
                      <Comment
                        commentThread={thread}
                        key={thread.threadId}
                        setSelectedComment={setSelectedComment}
                        setFilters={setFilters}
                        fetchComments={fetchComments}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </Wrapper>
  );
};

const DesktopWrapper = ({
  children,
  menuPopup,
}: {
  children: React.ReactNode;
  menuPopup: React.RefObject<HTMLDivElement>;
}) => {
  return (
    <div
      className="absolute z-20 w-[400px] -translate-x-full pt-2 font-sans"
      ref={menuPopup}
    >
      {children}
    </div>
  );
};
const MobileWrapper = ({
  children,
  menuPopup,
  setVisible,
  dontChangeIfTrue,
  scrollableElements,
}: {
  children: React.ReactNode;
  menuPopup: React.RefObject<HTMLDivElement>;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  dontChangeIfTrue?: boolean[];
  scrollableElements?: React.RefObject<HTMLDivElement>[];
}) => {
  const overlayRef = useRef(null);
  useMobileSwipe({
    overlayRef,
    popupRef: menuPopup,
    setDropdownVisible: setVisible,
    startingOpacity: 0.5,
    dontChangeIfTrue,
    scrollableElements,
  });

  return (
    <>
      <div
        className="fixed bottom-0 left-0 z-20 h-screen w-full bg-black opacity-60"
        ref={overlayRef}
      />
      <div
        className="mobilePopupAfter fixed bottom-0 left-0 z-20 flex h-4/5 w-full"
        ref={menuPopup}
      >
        {children}
      </div>
    </>
  );
};
