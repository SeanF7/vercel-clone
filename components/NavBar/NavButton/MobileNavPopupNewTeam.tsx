import { MobileTeamMenu } from "@/components/Projects/ProjectsContent";
import React, { useRef, useState } from "react";

type MobileNavPopupNewTeamProps = {
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setHideMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MobileNavPopupNewTeam = ({
  setShowMenu,
  setHideMenu,
}: MobileNavPopupNewTeamProps) => {
  const [isClicked, setIsClicked] = useState(false);
  const menuRef = useRef(null);

  const handleClick = (e) => {
    setIsClicked(true);
    setHideMenu(true);
    e.stopPropagation();
  };

  return (
    <>
      <button
        className={`flex h-12 cursor-pointer items-center justify-between border-b border-neutral-700 `}
        onClick={handleClick}
      >
        New Team
        <svg
          fill="none"
          height="16"
          stroke="currentColor"
          viewBox="0 0 24 24"
          width="16"
        >
          <path d="M12 5v14"></path>
          <path d="M5 12h14"></path>
        </svg>
      </button>
      {isClicked && (
        <MobileTeamMenu
          closeMenus={() => {
            setShowMenu(false);
            setHideMenu(false);
          }}
          menuRef={menuRef}
        />
      )}
    </>
  );
};
