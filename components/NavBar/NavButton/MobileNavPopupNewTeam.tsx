import React, { useRef, useState } from "react";
import { TeamMenu } from "../../TeamMenu";

type MobileNavPopupNewTeamProps = {
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setHideMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MobileNavPopupNewTeam = ({
  setShowMenu,
  setHideMenu,
}: MobileNavPopupNewTeamProps) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setHideMenu(true);
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
        <TeamMenu
          closeMenus={() => {
            setShowMenu(false);
            setHideMenu(false);
          }}
          mobile={true}
        />
      )}
    </>
  );
};
