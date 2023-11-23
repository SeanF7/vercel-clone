import { createPortal } from "react-dom";
import { useState, useRef, RefObject } from "react";
import Link from "next/link";
import { usePopupExits } from "../lib/hooks/useMobileSwipe";
import { useDisableScroll } from "@/lib/hooks/useDisableScroll";

type TeamMenuProps = {
  closeMenus?: () => void;
  transferTeam?: boolean;
  mobile: boolean;
};

export const TeamMenu = ({
  closeMenus = () => {},
  transferTeam,
  mobile,
}: TeamMenuProps) => {
  const [selectedButton, setSelectedButton] = useState(0);
  const overlayRef = useRef(null);
  const [teamName, setTeamName] = useState("Sean Firsching's Team");
  const menuRef = useRef(null);

  usePopupExits({
    overlayRef,
    startingOpacity: 0.6,
    popupRef: menuRef,
    setDropdownVisible: () => closeMenus(),
  });
  const Wrapper = mobile ? MobileWrapper : DesktopWrapper;

  return createPortal(
    <Wrapper overlayRef={overlayRef} menuRef={menuRef}>
      <div className="flex flex-col gap-4 p-6">
        <h1 className="text-2xl font-bold text-neutral-200">
          {transferTeam ? "Transfer" : "Create Team"}
        </h1>
        <div className="flex flex-col gap-2">
          {transferTeam && (
            <p className="text-sm text-neutral-500 ">
              Create a new team to transfer your project(s) to.
            </p>
          )}
          <p className="text-xs text-neutral-400 ">Team Name</p>
          <input
            className="rounded-md bg-neutral-950 p-2 shadow-[0_0px_0px_1px] shadow-neutral-800 outline outline-0 outline-neutral-400
                   ring-neutral-700 transition-all focus-within:outline-1 focus-within:ring-4 hover:shadow-neutral-600"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          ></input>
        </div>
        <div className="flex flex-col text-sm">
          <div className="flex gap-4">
            {[
              { header: "Pro Trial", subheader: "Free for two weeks" },
              { header: "Pro", subheader: "Get started now" },
            ].map((item, i) => (
              <button
                className={`flex w-[184px] flex-1 items-center justify-between gap-4 rounded-md p-3 text-start shadow-[0_0px_0px_1px] shadow-neutral-800 hover:bg-neutral-900 ${
                  selectedButton === i ? "shadow-blue-600" : ""
                }`}
                key={i}
                onClick={() => setSelectedButton(i)}
              >
                <div className="flex flex-col justify-between p-1">
                  <h1 className="font-medium">{item.header}</h1>
                  <p className=" text-neutral-400">{item.subheader}</p>
                </div>
                <span
                  className={`${
                    selectedButton === i ? "fill-blue-400 text-blue-950" : ""
                  }`}
                >
                  <svg
                    height="20"
                    shapeRendering="geometricPrecision"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width="20"
                  >
                    <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"></path>
                    <path d="M8 11.8571L10.5 14.3572L15.8572 9"></path>
                  </svg>
                </span>
              </button>
            ))}
          </div>
        </div>
        <details className="group pt-2 text-sm">
          <summary className="flex list-none items-center">
            <svg
              fill="none"
              height="24"
              stroke="currentColor"
              viewBox="0 0 24 24"
              width="24"
              className={`-rotate-90 transition duration-200 ease-linear group-open:rotate-0`}
            >
              <path d="M6 9l6 6 6-6"></path>
            </svg>
            {`Continuing will start a ${
              selectedButton
                ? "monthly Pro plan subscription."
                : "14-day Pro plan trial."
            }`}
          </summary>
          <div className="ml-6 flex flex-col gap-2 pt-2">
            <p className="flex-0">
              Creating a new team will not affect your Personal Account (Hobby)
              or any of its projects.
            </p>
            <Link
              href={"https://vercel.com/docs/accounts/plans/pro/trials"}
              className="flex items-center gap-2 font-medium text-blue-500"
            >
              Learn More
              <svg
                fill="none"
                height="16"
                shapeRendering="geometricPrecision"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="16"
              >
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                <path d="M15 3h6v6"></path>
                <path d="M10 14L21 3"></path>
              </svg>
            </Link>
          </div>
        </details>
      </div>
      <div className="flex justify-between border-t border-neutral-800 bg-neutral-950 p-3 text-sm">
        <button
          className="rounded-md bg-neutral-950 p-3 text-neutral-200 shadow-[0_0px_0px_1px] shadow-neutral-800"
          onClick={(e) => {
            e.stopPropagation();
            closeMenus();
          }}
        >
          Cancel
        </button>
        <button
          className="rounded-md bg-neutral-200 p-3 text-neutral-600"
          onClick={(e) => {
            e.stopPropagation();
            closeMenus();
          }}
        >
          Continue
        </button>
      </div>
    </Wrapper>,
    document.body
  );
};
type TeamMenuWrapperProps = {
  children: React.ReactNode;
  overlayRef?: RefObject<HTMLDivElement>;
  menuRef?: RefObject<HTMLDivElement>;
};

const DesktopWrapper = ({ children, menuRef }: TeamMenuWrapperProps) => {
  return (
    <>
      <div className="absolute left-0 top-0 z-50 h-full w-full bg-black opacity-70" />
      <div
        className="absolute left-0 right-0 top-0 z-50 ml-auto mr-auto flex h-full w-full items-center justify-center"
        id="portal"
      >
        <div
          className="flex w-[480px] flex-col gap-4 rounded-xl bg-black bg-gradient-to-b from-neutral-900 to-5% shadow-[0_0px_0px_1px] shadow-neutral-800"
          ref={menuRef}
        >
          {children}
        </div>
      </div>
    </>
  );
};
const MobileWrapper = ({
  children,
  overlayRef,
  menuRef,
}: TeamMenuWrapperProps) => {
  useDisableScroll(true);
  return (
    <>
      <div
        className="absolute left-0 top-0 z-50 h-full w-full bg-black opacity-60"
        ref={overlayRef}
      />
      <div
        className="absolute bottom-0 left-0 right-0 z-50 ml-auto mr-auto flex h-4/5 w-full items-end justify-center"
        id="portal"
      >
        <div
          className="mobilePopupAfter flex w-full flex-col gap-4 rounded-t-xl bg-black bg-gradient-to-b from-neutral-900 to-5% shadow-[0_0px_0px_1px] shadow-neutral-800 after:bg-neutral-950"
          ref={menuRef}
        >
          {children}
        </div>
      </div>
    </>
  );
};
