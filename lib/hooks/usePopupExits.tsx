import { useEffect, useRef } from "react";

export const usePopupExits = (
  isVisible: boolean,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const menuPopup = useRef<HTMLDivElement>(null);
  const controllingButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const keyHandler = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isVisible) {
        setVisible(false);
        controllingButton.current?.focus();
      }
    };
    window.addEventListener("keydown", keyHandler);

    const clickHandler = (event: MouseEvent) => {
      if (
        menuPopup.current &&
        !menuPopup.current.contains(event.target as Node) &&
        isVisible &&
        document.activeElement !== controllingButton.current
      ) {
        setVisible(false);
      }
    };
    document.addEventListener("mousedown", clickHandler);

    return () => {
      window.removeEventListener("keydown", keyHandler);
      document.removeEventListener("mousedown", clickHandler);
    };
  }, [setVisible, isVisible]);

  return { menuPopup, controllingButton };
};

export const useCustomPopupExits = (
  customKeyDownHandler: (event: KeyboardEvent) => void,
  customClickHandler: (event: MouseEvent) => void
) => {
  const menuPopup = useRef<HTMLDivElement>(null);
  const controllingButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    window.addEventListener("keydown", customKeyDownHandler);
    document.addEventListener("mousedown", customClickHandler);

    return () => {
      window.removeEventListener("keydown", customKeyDownHandler);
      document.removeEventListener("mousedown", customClickHandler);
    };
  }, [customClickHandler, customKeyDownHandler]);
  return { menuPopup, controllingButton };
};
