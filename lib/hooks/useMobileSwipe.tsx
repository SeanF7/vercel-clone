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
  scrollableElements?: React.RefObject<HTMLDivElement>[];
};

export const useMobileSwipe = ({
  setDropdownVisible,
  dontChangeIfTrue = [],
  overlayRef,
  popupRef,
  startingOpacity = 0.4,
}: useMobileSwipeProps) => {
  const [menuPosition, setMenuPosition] = useState<menuPos>({
    startingY: 0,
    currentY: 0,
    deltaY: 0,
  });
  const [topOfScroll, setTopOfScroll] = useState(true);

  // Hacky way to check if the element is scrollable and if they are at the top.
  const checkIfTopOfScroll = (target: HTMLElement | null) => {
    while (target) {
      if (target.scrollHeight > target.clientHeight) {
        if (target.scrollTop !== 0) setTopOfScroll(false);
        else setTopOfScroll(true);

        break;
      }
      target = target.parentElement;
    }
  };

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      checkIfTopOfScroll(e.target as HTMLElement | null);
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
      if (topOfScroll) {
        checkIfTopOfScroll(e.target as HTMLElement | null);
      }
      if (
        menuPosition !== null &&
        menuPosition.startingY !== 0 &&
        dontChangeIfTrue.every((x) => !x) &&
        menuPosition.currentY + 20 >=
          popupRef.current?.getBoundingClientRect().top! &&
        topOfScroll
      ) {
        const currentY = e.touches[0].clientY;
        const deltaY = Math.max(currentY - menuPosition.startingY, -30);
        setMenuPosition((prevState) => ({
          ...prevState!,
          currentY,
          deltaY,
        }));
        if (overlayRef.current)
          overlayRef.current.style.opacity = `${Math.min(
            startingOpacity - deltaY / window.innerHeight,
            startingOpacity
          )}`;
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
      if (dontChangeIfTrue.some((x) => x)) return;
      if (
        menuPosition !== null &&
        menuPosition?.deltaY > popupRef.current?.clientHeight! / 3
      ) {
        overlayRef!.current!.style.opacity = "0";
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
    topOfScroll,
    popupRef.current,
  ]);
};
