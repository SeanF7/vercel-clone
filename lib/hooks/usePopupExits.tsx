import { useEffect, useRef, useState } from "react";

export const usePopupExits = () => {
  const [isVisible, setVisible] = useState(false);
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
        event.target !== controllingButton.current
      ) {
        setVisible(false);
      }
    };
    document.addEventListener("click", clickHandler);

    return () => {
      window.removeEventListener("keydown", keyHandler);
      document.removeEventListener("click", clickHandler);
    };
  }, [setVisible, isVisible]);

  return { menuPopup, controllingButton, isVisible, setVisible };
};

export const useCustomPopupExits = (
  customKeyDownHandler: (event: KeyboardEvent) => void,
  customClickHandler: (event: MouseEvent) => void
) => {
  const [isVisible, setVisible] = useState(false);
  const menuPopup = useRef<HTMLDivElement>(null);
  const controllingButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    window.addEventListener("keydown", customKeyDownHandler);
    document.addEventListener("click", customClickHandler);

    return () => {
      window.removeEventListener("keydown", customKeyDownHandler);
      document.removeEventListener("click", customClickHandler);
    };
  }, [customClickHandler, customKeyDownHandler]);
  return { menuPopup, controllingButton, isVisible, setVisible };
};
