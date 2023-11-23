import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getTimeAgo } from "@/lib/utils/timeHelpers";
import { CommentThread as CommentThreadType } from "@/types";

type CommentThreadProps = {
  commentThread: CommentThreadType;
  fetchComments: () => void;
};

export const CommentThread = ({
  commentThread,
  fetchComments,
}: CommentThreadProps) => {
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
