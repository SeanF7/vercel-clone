"use client";
import Link from "next/link";
import { useProjectContext } from "@/lib/hooks/ProjectContext";
import { usePopupExits } from "@/lib/hooks/useMobileSwipe";
import { useRef, useState } from "react";
import { useDisableScroll } from "@/lib/hooks/useDisableScroll";
import { TeamMenu } from "../TeamMenu";
import { TransferProject } from "./TransferProject";

type Props = {
  projectID: number;
  favorite: boolean;
  mobile?: boolean;
};

type StarProps = {
  favorite: boolean;
};

const StarComponent = ({ favorite }: StarProps) => {
  return (
    <div className="flex">
      {favorite ? (
        <svg height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16">
          <path
            d="M7.99999 0.489502L10.5734 5.20807L15.8562 6.19736L12.1638 10.1029L12.8554 15.4329L7.99999 13.1281L3.1446 15.4329L3.83621 10.1029L0.143799 6.19736L5.42663 5.20807L7.99999 0.489502Z"
            fill="currentColor"
          ></path>
        </svg>
      ) : (
        <>
          <svg
            height="16"
            strokeLinejoin="round"
            viewBox="0 0 16 16"
            width="16"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.00001 0.433594L8.65845 1.64093L10.5908 5.18412L14.5577 5.92698L15.9094 6.18011L14.9646 7.17942L12.192 10.1121L12.7113 14.1144L12.8883 15.4782L11.6459 14.8884L8.00001 13.1577L4.35408 14.8884L3.11173 15.4782L3.28869 14.1144L3.80802 10.1121L1.03538 7.17942L0.0906067 6.18011L1.44233 5.92698L5.40922 5.18412L7.34156 1.64093L8.00001 0.433594ZM8.00001 3.56646L6.55565 6.21487L6.38519 6.52743L6.03525 6.59296L3.07014 7.14822L5.14259 9.34029L5.38718 9.59899L5.34137 9.95205L4.95318 12.9436L7.67838 11.65L8.00001 11.4973L8.32163 11.65L11.0468 12.9436L10.6586 9.95205L10.6128 9.59899L10.8574 9.34029L12.9299 7.14822L9.96476 6.59296L9.61482 6.52743L9.44436 6.21487L8.00001 3.56646Z"
              fill="currentColor"
            ></path>
          </svg>

          <div className="absolute">
            <svg
              fill="none"
              height="6"
              viewBox="0 0 6 6"
              width="6"
              className="translate-x-1 translate-y-1 scale-[.6] stroke-neutral-50 text-neutral-50 opacity-0 transition duration-200 
        ease-in-out group-hover/favorite:-translate-x-1 group-hover/favorite:-translate-y-1 group-hover/favorite:opacity-100"
            >
              <path
                d="M2.5 0.5V0H3.5V0.5C3.5 1.60457 4.39543 2.5 5.5 2.5H6V3V3.5H5.5C4.39543 3.5 3.5 4.39543 3.5 5.5V6H3H2.5V5.5C2.5 4.39543 1.60457 3.5 0.5 3.5H0V3V2.5H0.5C1.60457 2.5 2.5 1.60457 2.5 0.5Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <div className="absolute">
            <svg
              height="6"
              viewBox="0 0 6 6"
              width="6"
              shapeRendering="crispEdges"
              className="translate-x-1 translate-y-1 scale-75 stroke-yellow-400  text-yellow-400 opacity-0 transition delay-[30ms] duration-200 
        group-hover/favorite:-translate-y-1 group-hover/favorite:translate-x-3 group-hover/favorite:opacity-100"
            >
              <path
                d="M2.5 0.5V0H3.5V0.5C3.5 1.60457 4.39543 2.5 5.5 2.5H6V3V3.5H5.5C4.39543 3.5 3.5 4.39543 3.5 5.5V6H3H2.5V5.5C2.5 4.39543 1.60457 3.5 0.5 3.5H0V3V2.5H0.5C1.60457 2.5 2.5 1.60457 2.5 0.5Z"
                fill="currentColor"
                shapeRendering="geometricPrecision"
              ></path>
            </svg>
          </div>
          <div className="absolute">
            <svg
              fill="none"
              height="6"
              viewBox="0 0 6 6"
              width="6"
              className="translate-x-1 translate-y-1 scale-75 stroke-blue-700 text-blue-700 opacity-0 transition delay-[40ms] duration-200  
        ease-linear group-hover/favorite:translate-x-3 group-hover/favorite:translate-y-3 group-hover/favorite:opacity-100"
            >
              <path
                d="M2.5 0.5V0H3.5V0.5C3.5 1.60457 4.39543 2.5 5.5 2.5H6V3V3.5H5.5C4.39543 3.5 3.5 4.39543 3.5 5.5V6H3H2.5V5.5C2.5 4.39543 1.60457 3.5 0.5 3.5H0V3V2.5H0.5C1.60457 2.5 2.5 1.60457 2.5 0.5Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <div className="absolute">
            <svg
              fill="currentColor"
              height="6"
              viewBox="0 0 6 6"
              width="6"
              className="translate-x-1 translate-y-1 scale-100 stroke-teal-600 text-teal-600 opacity-0 transition delay-[60ms] duration-200 
        group-hover/favorite:translate-x-1 group-hover/favorite:translate-y-4 group-hover/favorite:opacity-100"
            >
              <path
                d="M2.5 0.5V0H3.5V0.5C3.5 1.60457 4.39543 2.5 5.5 2.5H6V3V3.5H5.5C4.39543 3.5 3.5 4.39543 3.5 5.5V6H3H2.5V5.5C2.5 4.39543 1.60457 3.5 0.5 3.5H0V3V2.5H0.5C1.60457 2.5 2.5 1.60457 2.5 0.5Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <div className="absolute">
            <svg
              fill="none"
              height="6"
              viewBox="0 0 6 6"
              width="6"
              className="translate-x-1 translate-y-1 scale-75 stroke-pink-400 text-pink-400 opacity-0 transition delay-[110ms] duration-200 
        ease-in group-hover/favorite:-translate-x-1 group-hover/favorite:translate-y-2 group-hover/favorite:opacity-100"
            >
              <path
                d="M2.5 0.5V0H3.5V0.5C3.5 1.60457 4.39543 2.5 5.5 2.5H6V3V3.5H5.5C4.39543 3.5 3.5 4.39543 3.5 5.5V6H3H2.5V5.5C2.5 4.39543 1.60457 3.5 0.5 3.5H0V3V2.5H0.5C1.60457 2.5 2.5 1.60457 2.5 0.5Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </>
      )}
    </div>
  );
};

export const EllipsisButton = ({
  projectID,
  favorite,
  mobile = false,
}: Props) => {
  const [isVisible, setVisible] = useState(false);
  const menuPopup = useRef<HTMLDivElement>(null);
  const { fetchData } = useProjectContext();
  const overlay = useRef(null);
  const handleClick = () => {
    fetch(`/api/projects?id=${projectID}`, {
      method: "PATCH",
    }).then(() => {
      fetchData();
    });
    setVisible(false);
  };

  const [transferVisible, setTransferVisible] = useState(false);
  const [transferTeamVisible, setTransferTeamVisible] = useState(false);

  usePopupExits({
    popupRef: menuPopup,
    setDropdownVisible: setVisible,
    overlayRef: overlay,
  });

  const Wrapper = mobile ? MobileWrapper : DesktopWrapper;

  useDisableScroll(mobile && isVisible);

  return (
    <>
      <button
        className="z-0 rounded-md p-2 hover:bg-neutral-700"
        onClick={() => {
          setVisible(!isVisible);
        }}
      >
        <svg height="16" viewBox="0 0 16 16" width="16">
          <path
            d="M4 8C4 8.82843 3.32843 9.5 2.5 9.5C1.67157 9.5 1 8.82843 1 8C1 7.17157 1.67157 6.5 2.5 6.5C3.32843 6.5 4 7.17157 4 8ZM9.5 8C9.5 8.82843 8.82843 9.5 8 9.5C7.17157 9.5 6.5 8.82843 6.5 8C6.5 7.17157 7.17157 6.5 8 6.5C8.82843 6.5 9.5 7.17157 9.5 8ZM13.5 9.5C14.3284 9.5 15 8.82843 15 8C15 7.17157 14.3284 6.5 13.5 6.5C12.6716 6.5 12 7.17157 12 8C12 8.82843 12.6716 9.5 13.5 9.5Z"
            fill="currentColor"
          ></path>
        </svg>
      </button>
      {isVisible && (
        <Wrapper menuRef={menuPopup}>
          <button
            className="group/favorite flex h-12 w-full items-center justify-between rounded-md px-2 py-1 text-sm text-white hover:bg-neutral-800 [@media(min-width:600px)]:h-10"
            onClick={handleClick}
          >
            {favorite ? "Remove Favorite" : "Add Favorite"}
            <StarComponent favorite={favorite} />
          </button>
          {["View Logs", "Transfer Project", "Manage Domains", "Settings"].map(
            (text, i) => {
              if (i === 1)
                return (
                  <button
                    className="flex h-10 w-full items-center rounded-md px-2 py-1 text-sm text-white hover:bg-neutral-800 [@media(min-width:600px)]:h-10"
                    onClick={() => {
                      setTransferVisible(!transferVisible);
                      setVisible(false);
                    }}
                    key={i}
                  >
                    {text}
                  </button>
                );

              return (
                <Link
                  href={"/"}
                  className="flex h-12 w-full items-center rounded-md px-2 py-1 text-sm text-white hover:bg-neutral-800 [@media(min-width:600px)]:h-10"
                  key={i}
                >
                  {text}
                </Link>
              );
            }
          )}
        </Wrapper>
      )}
      {transferVisible && (
        <TransferProject
          setTransferVisible={setTransferVisible}
          setTransferTeamVisible={setTransferTeamVisible}
        />
      )}
      {transferTeamVisible && (
        <TeamMenu
          closeMenus={() => {
            setTransferTeamVisible(false);
            setTransferVisible(false);
          }}
          transferTeam={true}
          mobile={mobile}
        />
      )}
    </>
  );
};

type WrapperProps = {
  children: React.ReactNode;
  menuRef: React.RefObject<HTMLDivElement>;
};

const DesktopWrapper = ({ children, menuRef }: WrapperProps) => {
  return (
    <>
      <div
        ref={menuRef}
        className="absolute z-20 w-[184px] -translate-x-3/4 translate-y-2/3 rounded-lg bg-neutral-950 p-2 shadow-[0_0px_0px_1px] shadow-neutral-800 "
      >
        {children}
      </div>
    </>
  );
};

const MobileWrapper = ({ children, menuRef }: WrapperProps) => {
  const menuOverlay = useRef(null);

  return (
    <>
      <div
        className="fixed inset-0 z-10 bg-black opacity-60"
        ref={menuOverlay}
      />
      <div
        ref={menuRef}
        className="mobilePopupAfter fixed bottom-0 left-0 right-0 z-20 rounded-t-lg bg-neutral-950 p-2 shadow-[0_0px_0px_1px] shadow-neutral-800 "
      >
        {children}
      </div>
    </>
  );
};
