import { useRef, RefObject, useState } from "react";
import Link from "next/link";
import { useDisableScroll } from "@/lib/hooks/useDisableScroll";
import { usePopupExits } from "@/lib/hooks/useMobileSwipe";
import { TeamMenu } from "@/components/TeamMenu";

export const AddNewButton = ({ mobile }: { mobile: boolean }) => {
  const [isVisible, setVisible] = useState(false);
  const menuPopup = useRef(null);

  return (
    <div>
      <button
        className="hover:bg-neutral-30 flex h-10 items-center rounded-md bg-neutral-200 px-2 text-center align-middle text-black [@media(min-width:601px)]:w-32"
        onClick={() => setVisible(!isVisible)}
      >
        <div className="flex flex-1 items-center justify-between">
          <span className=" font-medium: medium inline-block select-none text-sm [@media(max-width:600px)]:hidden">
            Add New...
          </span>
          <svg
            fill="none"
            height="24"
            stroke="currentColor"
            viewBox="0 0 24 24"
            width="24"
            className="[@media(max-width:600px)]:hidden"
          >
            <path d="M6 9l6 6 6-6"></path>
          </svg>
        </div>
        <svg
          fill="none"
          height="24"
          stroke="currentColor"
          viewBox="0 0 24 24"
          className="[@media(min-width:601px)]:hidden"
          width="24"
        >
          <path d="M12 5v14"></path>
          <path d="M5 12h14"></path>
        </svg>
      </button>
      <AddButtonPopup
        isVisible={isVisible}
        menuPopup={menuPopup}
        setVisible={setVisible}
        mobile={mobile}
      />
    </div>
  );
};

type AddButtonPopupProps = {
  isVisible: boolean;
  menuPopup: RefObject<HTMLDivElement>;
  setVisible: (visible: boolean) => void;
  mobile: boolean;
};

const AddButtonPopup = ({
  isVisible,
  menuPopup,
  setVisible,
  mobile,
}: AddButtonPopupProps) => {
  const [teamMenuVisible, setTeamMenuVisible] = useState(false);
  const menuOverlay = useRef(null);

  const cleanUp = () => {
    setVisible(false);
    setTeamMenuVisible(false);
  };

  usePopupExits({
    overlayRef: menuOverlay,
    popupRef: menuPopup,
    setDropdownVisible: cleanUp,
    startingOpacity: 0.6,
  });

  const Wrapper = mobile ? MobileWrapper : DesktopWrapper;

  return (
    <>
      {isVisible && (
        <>
          <Wrapper menuRef={menuPopup} menuOverlay={menuOverlay}>
            {[
              { name: "Project", url: "http://vercel.com/new" },
              { name: "Domain", url: "http://vercel.com/domains" },
              { name: "Storage", url: "http://vercel.com/stores" },
            ].map((item, i) => (
              <Link
                className="flex h-14 w-full items-center rounded-md px-2 py-1 text-sm text-white hover:bg-neutral-800 [@media(min-width:600px)]:h-10"
                key={i}
                href={item.url}
              >
                {item.name}
              </Link>
            ))}
            <button
              className="flex h-14 w-full items-center rounded-md px-2 py-1 text-sm text-white hover:bg-neutral-800 [@media(min-width:600px)]:h-10"
              onClick={() => {
                setVisible(false);
                setTeamMenuVisible(!teamMenuVisible);
              }}
            >
              Team
            </button>
          </Wrapper>
        </>
      )}

      {teamMenuVisible && (
        <TeamMenu
          closeMenus={() => {
            setTeamMenuVisible(false);
          }}
          mobile={mobile}
        />
      )}
    </>
  );
};

type AddButtonWrapperProps = {
  children: React.ReactNode;
  menuRef: RefObject<HTMLDivElement>;
  menuOverlay: RefObject<HTMLDivElement>;
};

const DesktopWrapper = ({ children, menuRef }: AddButtonWrapperProps) => {
  return (
    <div
      className="absolute z-10  w-32 translate-y-2 rounded-lg bg-neutral-950 p-2 shadow-[0_0px_0px_1px] shadow-neutral-800"
      ref={menuRef}
    >
      {children}
    </div>
  );
};

const MobileWrapper = ({
  children,
  menuRef,
  menuOverlay,
}: AddButtonWrapperProps) => {
  useDisableScroll(true);
  return (
    <>
      <div
        className="fixed inset-0 z-10 bg-black opacity-60"
        ref={menuOverlay}
      />
      <div
        className="mobilePopupAfter absolute bottom-0 left-0 right-0 z-10 rounded-t-lg bg-neutral-950 shadow-[0_0px_0px_1px] shadow-neutral-800"
        ref={menuRef}
      >
        {children}
      </div>
    </>
  );
};
