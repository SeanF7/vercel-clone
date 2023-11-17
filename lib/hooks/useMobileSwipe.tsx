import { use, useEffect, useState } from "react";

type menuPos = {
  startingY: number;
  currentY: number;
  deltaY: number;
} | null;

type useMobileSwipeProps = {
  setDropdownVisible: React.Dispatch<React.SetStateAction<boolean>>;
  overlayRef: React.RefObject<HTMLDivElement>;
  popupRef: React.RefObject<HTMLDivElement>;
  dontChangeIfTrue?: boolean[];
  startingOpacity?: number;
};

export const useMobileSwipe = ({
  setDropdownVisible,
  dontChangeIfTrue = [],
  overlayRef,
  popupRef,
  startingOpacity = 0.4,
}: useMobileSwipeProps) => {
  const [menuPosition, setMenuPosition] = useState<menuPos>(null);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (
        e.touches[0].clientY + 20 >
        popupRef.current?.getBoundingClientRect().top!
      ) {
        setMenuPosition({
          startingY: e.touches[0].clientY,
          currentY: e.touches[0].clientY,
          deltaY: 0,
        });
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (
        menuPosition !== null &&
        menuPosition.startingY !== 0 &&
        dontChangeIfTrue.every((x) => !x)
      ) {
        const currentY = e.touches[0].clientY;
        const deltaY = Math.max(currentY - menuPosition.startingY, -30);
        setMenuPosition((prevState) => ({
          ...prevState!,
          currentY,
          deltaY,
        }));
        if (overlayRef.current)
          overlayRef.current.style.opacity = `${
            startingOpacity - deltaY / window.innerHeight
          }`;
        if (popupRef.current) {
          if (deltaY > -30) {
            popupRef.current.style.transitionDuration = "0ms";
            popupRef.current.style.transform = `translateY(${deltaY}px)`;
          } else {
            popupRef.current.style.transitionDuration = "300ms";
            popupRef.current.style.transform = `translateY(-30px)`;
          }
        }
      }
    };

    const handleTouchEnd = () => {
      if (
        menuPosition !== null &&
        menuPosition?.deltaY > popupRef.current?.clientHeight! / 3
      ) {
        if (popupRef.current) {
          popupRef.current.style.transitionDuration = "300ms";
          popupRef.current.style.transform = `translateY(${window.innerHeight}px)`;
        }
        setTimeout(() => {
          setDropdownVisible(false);
        }, 300);
      } else {
        if (popupRef.current) {
          popupRef.current.style.transform = `translateY(0px)`;
          popupRef.current.style.transitionDuration = "300ms";
        }
        if (overlayRef.current)
          overlayRef.current.style.opacity = startingOpacity.toString();
      }
    };

    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [
    menuPosition,
    dontChangeIfTrue,
    setDropdownVisible,
    startingOpacity,
    overlayRef,
    popupRef,
  ]);
};
