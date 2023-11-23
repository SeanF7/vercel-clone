import { createPortal } from "react-dom";
import { useRef, useState } from "react";
import Image from "next/image";
import { getTimeAgo } from "@/lib/utils/timeHelpers";
import { CommentThread, CommentFilters } from "@/types";

type CommentsProps = {
  commentThread: CommentThread;
  setSelectedComment: React.Dispatch<
    React.SetStateAction<CommentThread | null>
  >;
  setFilters: React.Dispatch<React.SetStateAction<CommentFilters>>;
  fetchComments: () => void;
};

export const Comment = ({
  commentThread,
  setSelectedComment,
  setFilters,
  fetchComments,
}: CommentsProps) => {
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
          className="flex h-5 flex-shrink items-center rounded-xl bg-neutral-950  py-0.5 pl-0.5 pr-2 shadow-[0_0px_0px_1px] shadow-neutral-800"
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

          <p className="line-clamp-1 overflow-hidden text-ellipsis ">
            {commentThread.project.name}
          </p>
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
          <p className="line-clamp-1 overflow-hidden text-ellipsis">
            {commentThread.page.pageName}
          </p>
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
          <p className="line-clamp-1 text-left">
            {commentThread.branch.branchName}
          </p>
        </button>
      </div>
    </div>
  );
};
