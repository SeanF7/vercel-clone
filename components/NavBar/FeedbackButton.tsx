"use client";
import React, { useState, useEffect, useRef } from "react";
import { usePopupExits } from "@/lib/hooks/usePopupExits";
import Link from "next/link";
import { redirect } from "next/dist/server/api-utils";

export const FeedbackButton = () => {
  const [feedBackText, setFeedBackText] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState<number | null>(null);
  const [formError, setFormError] = useState("");
  const {
    menuPopup,
    controllingButton,
    isVisible: showFeedbackMenu,
    setVisible: setShowFeedbackMenu,
  } = usePopupExits();

  const handleSubmission = () => {
    if (feedBackText.length > 0 && selectedEmoji != null) {
      const url = `mailto:seanfirshcing@gmail.com?subject=Feedback on Vercel Clone&body=${feedBackText}`;
      window.open(url);
    } else {
      if (feedBackText.length == 0) {
        setFormError("Please enter some feedback");
      } else if (selectedEmoji == null) {
        setFormError("Please select an emoji");
      }
    }
  };

  useEffect(() => {
    setFormError("");
    return () => {
      setFeedBackText("");
      setSelectedEmoji(null);
    };
  }, [showFeedbackMenu]);

  return (
    <>
      <button
        className="h-8  w-24 rounded-md bg-neutral-950 text-sm shadow-[0_0px_0px_1px] shadow-neutral-800 transition-colors hover:text-white"
        onClick={() => {
          setShowFeedbackMenu(!showFeedbackMenu);
          requestAnimationFrame(() => {
            menuPopup.current?.classList.toggle("animate-fade");
          });
        }}
        ref={controllingButton}
      >
        Feedback
      </button>
      {showFeedbackMenu && (
        <div className="relative">
          <div
            className={`absolute left-12 top-2 z-20 w-[340px] -translate-x-1/2 rounded-xl bg-neutral-950 shadow-[0_0px_0px_1px] shadow-neutral-800 `}
            ref={menuPopup}
          >
            <div className="flex flex-col gap-2 p-2">
              <textarea
                placeholder="Your feedback..."
                className="h-24 w-full resize-none appearance-none rounded-md bg-neutral-950 p-2 text-sm 
    text-neutral-200 shadow-[0_0px_0px_1px] shadow-neutral-800 transition  duration-300 ease-[ease] hover:shadow-neutral-200 focus:shadow-neutral-200 focus:outline-0"
                value={feedBackText}
                onChange={(e) => setFeedBackText(e.target.value)}
              ></textarea>
              <p
                className={`align-text-bottom transition-[height] duration-300 ease-[ease] ${
                  formError.length > 0 ? "h-5" : ""
                } h-0 text-sm text-red-400 `}
              >
                {formError}
              </p>
              <span className="flex items-end justify-end gap-2 text-xs">
                <svg
                  height="14"
                  viewBox="0 0 22 14"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-neutral-400"
                >
                  <path
                    clipRule="evenodd"
                    d="M19.5 1.25H2.5C1.80964 1.25 1.25 1.80964 1.25 2.5V11.5C1.25 12.1904 1.80964 12.75 2.5 12.75H19.5C20.1904 12.75 20.75 12.1904 20.75 11.5V2.5C20.75 1.80964 20.1904 1.25 19.5 1.25ZM2.5 0C1.11929 0 0 1.11929 0 2.5V11.5C0 12.8807 1.11929 14 2.5 14H19.5C20.8807 14 22 12.8807 22 11.5V2.5C22 1.11929 20.8807 0 19.5 0H2.5ZM3 3.5H4H4.25H4.6899L4.98715 3.82428L7 6.02011L9.01285 3.82428L9.3101 3.5H9.75H10H11V4.5V10.5H9V6.79807L7.73715 8.17572L7 8.97989L6.26285 8.17572L5 6.79807V10.5H3V4.5V3.5ZM15 7V3.5H17V7H19.5L17 9.5L16 10.5L15 9.5L12.5 7H15Z"
                    fillRule="evenodd"
                  ></path>
                </svg>
                supported.
              </span>
            </div>
            <div className="flex items-center justify-between rounded-b-xl border-t border-neutral-700 bg-neutral-900 p-2">
              <div>
                <EmojiButtons
                  setSelectedEmoji={setSelectedEmoji}
                  selectedEmoji={selectedEmoji}
                />
              </div>
              <button
                className="flex h-8 w-14 items-center justify-center rounded-md bg-neutral-200 text-sm text-neutral-600 hover:bg-neutral-300"
                onClick={handleSubmission}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

type EmojiButtonsProps = {
  setSelectedEmoji: React.Dispatch<React.SetStateAction<number | null>>;
  selectedEmoji?: number | null;
};

const EmojiButtons = ({
  setSelectedEmoji,
  selectedEmoji,
}: EmojiButtonsProps) => {
  const emojis = [
    {
      svg: (
        <svg height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM4.5 8.97498H3.875V9.59998C3.875 11.4747 5.81046 12.8637 7.99817 12.8637C10.1879 12.8637 12.125 11.4832 12.125 9.59998V8.97498H11.5H4.5ZM7.99817 11.6137C6.59406 11.6137 5.63842 10.9482 5.28118 10.225H10.7202C10.3641 10.9504 9.40797 11.6137 7.99817 11.6137Z"
            fill="currentColor"
          ></path>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.15295 4.92093L5.375 3.5L4.59705 4.92093L3 5.21885L4.11625 6.39495L3.90717 8L5.375 7.30593L6.84283 8L6.63375 6.39495L7.75 5.21885L6.15295 4.92093ZM11.403 4.92093L10.625 3.5L9.84705 4.92093L8.25 5.21885L9.36625 6.39495L9.15717 8L10.625 7.30593L12.0928 8L11.8837 6.39495L13 5.21885L11.403 4.92093Z"
            className={`${
              selectedEmoji == 0 ? "fill-cyan-400" : "fill-amber-800"
            } group-hover:fill-cyan-400`}
          ></path>
        </svg>
      ),
    },
    {
      svg: (
        <svg
          height="16"
          strokeLinejoin="round"
          viewBox="0 0 16 16"
          width="16"
          className="fill-current"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM11.5249 10.8478L11.8727 10.3286L10.8342 9.6329L10.4863 10.1522C9.94904 10.9543 9.0363 11.4802 8.00098 11.4802C6.96759 11.4802 6.05634 10.9563 5.51863 10.1567L5.16986 9.63804L4.13259 10.3356L4.48137 10.8542C5.2414 11.9844 6.53398 12.7302 8.00098 12.7302C9.47073 12.7302 10.7654 11.9816 11.5249 10.8478ZM6.75 6.75C6.75 7.30228 6.30228 7.75 5.75 7.75C5.19772 7.75 4.75 7.30228 4.75 6.75C4.75 6.19772 5.19772 5.75 5.75 5.75C6.30228 5.75 6.75 6.19772 6.75 6.75ZM10.25 7.75C10.8023 7.75 11.25 7.30228 11.25 6.75C11.25 6.19772 10.8023 5.75 10.25 5.75C9.69771 5.75 9.25 6.19772 9.25 6.75C9.25 7.30228 9.69771 7.75 10.25 7.75Z"
          ></path>
        </svg>
      ),
    },
    {
      svg: (
        <svg
          height="16"
          strokeLinejoin="round"
          viewBox="0 0 16 16"
          width="16"
          className="fill-current"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM5.75 7.75C6.30228 7.75 6.75 7.30228 6.75 6.75C6.75 6.19772 6.30228 5.75 5.75 5.75C5.19772 5.75 4.75 6.19772 4.75 6.75C4.75 7.30228 5.19772 7.75 5.75 7.75ZM11.25 6.75C11.25 7.30228 10.8023 7.75 10.25 7.75C9.69771 7.75 9.25 7.30228 9.25 6.75C9.25 6.19772 9.69771 5.75 10.25 5.75C10.8023 5.75 11.25 6.19772 11.25 6.75ZM11.5249 11.2622L11.8727 11.7814L10.8342 12.4771L10.4863 11.9578C9.94904 11.1557 9.0363 10.6298 8.00098 10.6298C6.96759 10.6298 6.05634 11.1537 5.51863 11.9533L5.16986 12.4719L4.13259 11.7744L4.48137 11.2558C5.2414 10.1256 6.53398 9.37982 8.00098 9.37982C9.47073 9.37982 10.7654 10.1284 11.5249 11.2622Z"
          ></path>
        </svg>
      ),
    },
    {
      svg: (
        <svg height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4 9V16H5.5V9H4ZM12 9V16H10.5V9H12Z"
            className={`${
              selectedEmoji == 3 ? "fill-cyan-400" : "fill-blue-700"
            } group-hover:fill-cyan-400 `}
          ></path>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8C14.5 9.57941 13.9367 11.0273 13 12.1536V14.2454C14.8289 12.7793 16 10.5264 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 10.5264 1.17107 12.7793 3 14.2454V12.1536C2.06332 11.0273 1.5 9.57941 1.5 8ZM8 14.5C8.51627 14.5 9.01848 14.4398 9.5 14.3261V15.8596C9.01412 15.9518 8.51269 16 8 16C7.48731 16 6.98588 15.9518 6.5 15.8596V14.3261C6.98152 14.4398 7.48373 14.5 8 14.5ZM3.78568 8.36533C4.15863 7.98474 4.67623 7.75 5.25 7.75C5.82377 7.75 6.34137 7.98474 6.71432 8.36533L7.78568 7.31548C7.14222 6.65884 6.24318 6.25 5.25 6.25C4.25682 6.25 3.35778 6.65884 2.71432 7.31548L3.78568 8.36533ZM10.75 7.75C10.1762 7.75 9.65863 7.98474 9.28568 8.36533L8.21432 7.31548C8.85778 6.65884 9.75682 6.25 10.75 6.25C11.7432 6.25 12.6422 6.65884 13.2857 7.31548L12.2143 8.36533C11.8414 7.98474 11.3238 7.75 10.75 7.75ZM6.25 12H9.75C9.75 11.0335 8.9665 10.25 8 10.25C7.0335 10.25 6.25 11.0335 6.25 12Z"
            className="fill-current"
          ></path>
        </svg>
      ),
    },
  ];

  return (
    <div className="flex">
      {emojis.map((emoji, i) => (
        <button
          className={`group flex items-center justify-center rounded-full p-2 text-neutral-100 transition-colors duration-200 ease-[ease] 
          hover:bg-blue-900  hover:fill-cyan-400 hover:text-cyan-400 ${
            selectedEmoji == i ? "bg-blue-900 fill-cyan-400 text-cyan-400" : ""
          }`}
          key={i}
          onClick={() => setSelectedEmoji(i)}
        >
          <div className="h-4 w-4 rounded-full fill-blue-700 ">{emoji.svg}</div>
        </button>
      ))}
    </div>
  );
};
