"use client";
import { useState, useRef, useEffect, use } from "react";
import { SearchBar } from "@/components/SearchBar";
import { DesktopFiltersPopup } from "./FiltersPopup";
import { useCustomPopupExits } from "@/lib/hooks/usePopupExits";
import { DesktopNotification } from "./Notification";
import { EmptyTabComponent } from "./EmptyTabComponent";
import Link from "next/link";
import { Notification, CommentThread, CommentFilters, Project } from "@/types";
import Image from "next/image";
import { getTimeAgo } from "@/lib/utils/timeHelpers";
import { FiltersComponent } from "./FilterComponent";
import { createPortal } from "react-dom";

type Props = {
  controllingButton: React.RefObject<HTMLButtonElement>;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DesktopNotificationPopup = ({
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
  const [comments, setComments] = useState<CommentThread[]>([]);
  const [selectedComment, setSelectedComment] = useState<CommentThread | null>(
    null
  );
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

  useEffect(() => {
    const getComments = async () => {
      const authors = filters.authors.map((author) => author.name).join(",");
      const pages = filters.pages.map((page) => page.pageName).join(",");
      const branches = filters.branches
        .map((branch) => `${branch.branchName}-${branch.projectId}`)
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

  const fetchComments = async () => {
    const authors = filters.authors.map((author) => author.name).join(",");
    const pages = filters.pages.map((page) => page.pageName).join(",");
    const branches = filters.branches
      .map((branch) => `${branch.branchName}-${branch.projectId}`)
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

  const handleTabClick = (index: number) => {
    setIndex(index);
  };

  return (
    <div
      className="absolute z-20 w-[400px]  -translate-x-full pt-2 font-sans"
      ref={menuPopup}
    >
      {selectedComment ? (
        <div className="relative left-12 rounded-md bg-black  shadow-[0_0px_1px_1px] shadow-neutral-800">
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
          <div className="flex flex-col overflow-y-auto">
            <div className="flex h-3/4 w-full flex-col gap-5">
              <div className="flex flex-col  bg-neutral-950">
                <DesktopCommentThread
                  commentThread={selectedComment}
                  fetchComments={fetchComments}
                />
              </div>
              <div className="flex w-full justify-center pb-8 text-sm">
                <p className="flex h-5 justify-center gap-1">
                  To reply to the comment thread, go to the
                  <Link href={"/"} className="flex text-blue-500">
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
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative left-12 rounded-md bg-black  shadow-[0_0px_1px_1px] shadow-neutral-800">
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
            <div className="flex min-h-[500px] flex-col justify-between">
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
                <div className="grid min-h-[400px] auto-rows-max grid-cols-1">
                  {inbox.map((notification) => (
                    <DesktopNotification
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
            <div className="flex flex-col overflow-y-auto">
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
                    <DesktopFiltersPopup
                      showFilterMenu={showFilterMenu}
                      setShowFilterMenu={setShowFilterMenu}
                      setChildMenuOpen={setChildMenuOpen}
                      setFilters={setFilters}
                      filters={filters}
                    />
                  </div>
                </div>
                {filters && (
                  <FiltersComponent filters={filters} setFilters={setFilters} />
                )}
              </div>
              <div className="flex h-[400px] w-full items-center justify-center">
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
                  <div className="flex flex-col self-start">
                    {comments.map((thread, i) => (
                      <DesktopComments
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
    </div>
  );
};

type DesktopCommentsProps = {
  commentThread: CommentThread;
  setSelectedComment: React.Dispatch<
    React.SetStateAction<CommentThread | null>
  >;
  setFilters: React.Dispatch<React.SetStateAction<CommentFilters>>;
  fetchComments: () => void;
};

const DesktopComments = ({
  commentThread,
  setSelectedComment,
  setFilters,
  fetchComments,
}: DesktopCommentsProps) => {
  const authorsText = commentThread.comments
    .map((comment) => comment.author.name)
    .join(", ");
  const authors = commentThread.comments.map((comment) => comment.author);
  const timeAgo = getTimeAgo(commentThread.time);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [boundingBox, setBoundingBox] = useState<{
    left: number;
    top: number;
  } | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleActivityHover = () => {
    if (buttonRef.current) {
      const newBoundingBox = buttonRef.current?.getBoundingClientRect();
      let boundingBox = {
        left: newBoundingBox.left + newBoundingBox.width / 2,
        top: newBoundingBox.top - newBoundingBox.height / 2 + window.scrollY,
      };

      setBoundingBox(boundingBox);
    }
  };

  const resolveComment = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    fetch(`/api/comments?id=${commentThread.threadId}`, {
      method: "PATCH",
    }).then(() => {
      fetchComments();
    });
  };

  return (
    <div
      className={`flex w-full cursor-pointer flex-col gap-2 p-4 text-left text-sm text-neutral-200 hover:bg-neutral-900 ${
        commentThread.isResolved ? "grayscale" : ""
      }`}
      onClick={() => setSelectedComment(commentThread)}
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex">
            {authors.map((author) => (
              <Image
                alt={author.name}
                src={author.avatar}
                height={12}
                width={12}
                className="h-4 w-4 rounded-full [&:not(:first-child)]:-ml-2"
                key={author.id}
              />
            ))}
          </div>
          <p className="font-medium">{authorsText}</p>
          <p className="text-xs text-neutral-500">{timeAgo}</p>
        </div>
        <div className="flex gap-2 px-2 text-neutral-500">
          <span className="flex items-center gap-1 text-xs">
            <svg
              fill="none"
              height="16"
              stroke="currentColor"
              viewBox="0 0 24 24"
              width="16"
            >
              <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
            </svg>
            {commentThread.comments.length}
          </span>
          <button
            onClick={resolveComment}
            ref={buttonRef}
            onMouseEnter={() => {
              handleActivityHover();
              setIsHovered(true);
            }}
            onMouseLeave={() => {
              setBoundingBox(null);
              setIsHovered(false);
            }}
          >
            {commentThread.isResolved ? (
              <svg
                fill="currentColor"
                height="16"
                shapeRendering="geometricPrecision"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                width="16"
              >
                <path d="M8 11.857l2.5 2.5L15.857 9M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z"></path>
              </svg>
            ) : (
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
                <path d="M8 11.857l2.5 2.5L15.857 9M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z"></path>
              </svg>
            )}
          </button>
          {isHovered &&
            createPortal(
              <div
                className="absolute z-50 flex -translate-x-1/2 -translate-y-full flex-col"
                style={{
                  top: boundingBox?.top,
                  left: boundingBox?.left,
                }}
              >
                <span className="flex-1 whitespace-nowrap rounded bg-neutral-100 px-3 py-2 text-center font-sans text-sm text-neutral-700">
                  {commentThread.isResolved ? "Undo Resolve" : "Resolve"}
                </span>
                <div className="relative flex justify-center">
                  <svg
                    className="fill-current text-neutral-300"
                    height="6"
                    viewBox="0 0 14 6"
                    width="14"
                  >
                    <path d="M13.8284 0H0.17157C0.702003 0 1.21071 0.210714 1.58578 0.585787L5.58578 4.58579C6.36683 5.36684 7.63316 5.36683 8.41421 4.58579L12.4142 0.585786C12.7893 0.210714 13.298 0 13.8284 0Z"></path>
                  </svg>
                </div>
              </div>,
              document.body
            )}
        </div>
      </div>
      <div className="line-clamp-3">
        <p>{commentThread.comments[0].text}</p>
      </div>

      {/* TODO/WIP These apply filters on click */}
      <div className="flex items-center gap-2 text-xs">
        <button
          className="flex h-5 items-center rounded-xl bg-neutral-950  py-0.5 pl-0.5 pr-2 shadow-[0_0px_0px_1px] shadow-neutral-800"
          onClick={(e) => {
            e.stopPropagation();
            setFilters((prev) => ({
              ...prev,
              projects: [...prev.projects, commentThread.project],
            }));
          }}
        >
          <Image
            alt={commentThread.project.name}
            src={commentThread.project.image}
            height={16}
            width={16}
            className="rounded-full"
          />
          <p>{commentThread.project.name}</p>
        </button>
        <button
          className="flex items-center gap-2 rounded-xl bg-neutral-950 px-2 py-0.5 shadow-[0_0px_0px_1px] shadow-neutral-800"
          onClick={(e) => {
            e.stopPropagation();
            setFilters((prev) => ({
              ...prev,
              pages: [...prev.pages, commentThread.page],
            }));
          }}
        >
          <p>{commentThread.page.pageName}</p>
        </button>
        <button
          className="flex items-center gap-2 rounded-xl bg-neutral-950 px-2 py-0.5 shadow-[0_0px_0px_1px] shadow-neutral-800"
          onClick={(e) => {
            e.stopPropagation();
            setFilters((prev) => ({
              ...prev,
              branches: [...prev.branches, commentThread.branch],
            }));
          }}
        >
          <svg
            fill="none"
            height="12"
            shapeRendering="geometricPrecision"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            viewBox="0 0 20 20"
            width="12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M5 2.5v10M15 7.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM5 17.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM15 7.5A7.5 7.5 0 017.5 15"
            ></path>
          </svg>
          {commentThread.branch.branchName}
        </button>
      </div>
    </div>
  );
};

type DesktopCommentThreadProps = {
  commentThread: CommentThread;
  fetchComments: () => void;
};

const DesktopCommentThread = ({
  commentThread,
  fetchComments,
}: DesktopCommentThreadProps) => {
  const [resolved, setResolved] = useState(commentThread.isResolved);
  const resolveComment = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    fetch(`/api/comments?id=${commentThread.threadId}`, {
      method: "PATCH",
    }).then(() => {
      fetchComments();
      setResolved(!resolved);
    });
  };

  return (
    <div
      className={`flex w-full flex-col gap-2 text-left text-sm text-neutral-200 ${
        resolved ? "grayscale" : ""
      }`}
    >
      {commentThread.comments.map((comment, i) => (
        <div
          className="flex flex-col gap-2 border-b border-neutral-800 px-4 py-5"
          key={i}
        >
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Image
                alt={comment.author.name}
                src={comment.author.avatar}
                height={18}
                width={18}
                className="h-4 w-4 rounded-full [&:not(:first-child)]:-ml-2"
              />
              <p className="font-medium">{comment.author.name}</p>
              <p className="text-xs text-neutral-500">
                {getTimeAgo(comment.time)}
              </p>
            </div>
            {i === 0 && (
              <button onClick={resolveComment}>
                {resolved ? (
                  <svg
                    fill="currentColor"
                    height="16"
                    shapeRendering="geometricPrecision"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width="16"
                  >
                    <path d="M8 11.857l2.5 2.5L15.857 9M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z"></path>
                  </svg>
                ) : (
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
                    <path d="M8 11.857l2.5 2.5L15.857 9M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z"></path>
                  </svg>
                )}
              </button>
            )}
          </div>
          <div className="">
            <p>{comment.text}</p>
          </div>
          {i === 0 && (
            <Link
              className="w-full rounded-md bg-black shadow-[0_0px_0px_1px] shadow-neutral-800 hover:bg-neutral-900"
              href={"/"}
            >
              <div className="group flex flex-col gap-1 p-4">
                <p className="flex gap-1">
                  {commentThread.project.name}
                  <svg
                    height="16"
                    strokeLinejoin="round"
                    viewBox="0 0 16 16"
                    width="16"
                    className="text-neutral-600"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.5 9.75V11.25C11.5 11.3881 11.3881 11.5 11.25 11.5H4.75C4.61193 11.5 4.5 11.3881 4.5 11.25L4.5 4.75C4.5 4.61193 4.61193 4.5 4.75 4.5H6.25H7V3H6.25H4.75C3.7835 3 3 3.7835 3 4.75V11.25C3 12.2165 3.7835 13 4.75 13H11.25C12.2165 13 13 12.2165 13 11.25V9.75V9H11.5V9.75ZM8.5 3H9.25H12.2495C12.6637 3 12.9995 3.33579 12.9995 3.75V6.75V7.5H11.4995V6.75V5.56066L8.53033 8.52978L8 9.06011L6.93934 7.99945L7.46967 7.46912L10.4388 4.5H9.25H8.5V3Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </p>
                <p className="text-xs text-neutral-500 transition group-hover:text-neutral-200">
                  {commentThread.page.pageName}
                </p>
              </div>
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};
