import { useEffect } from "react";

export const useDisableScroll = (disable: boolean) => {
  useEffect(() => {
    const body = document.querySelector("body");
    if (!body) return;
    if (disable) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }
    return () => {
      body.style.overflow = "auto";
    };
  }, [disable]);
};
