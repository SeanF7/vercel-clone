import { createPortal } from "react-dom";
import { useRef, useState } from "react";

export const Activity = () => {
  const [boundingBox, setBoundingBox] = useState<{
    left: number;
    top: number;
  } | null>(null);
  const activityRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [trianglePosition, setTrianglePosition] = useState<"center" | "right">(
    "center"
  );

  const handleActivityHover = () => {
    if (activityRef.current) {
      const newBoundingBox = activityRef.current?.getBoundingClientRect();
      let boundingBox = {
        left: newBoundingBox.left,
        top: newBoundingBox.top - 16 + window.scrollY,
      };
      const halfToolTipWidth = 288 / 2;
      if (window.innerWidth > 768 && window.innerWidth < 1344)
        boundingBox.left -= halfToolTipWidth - 32;
      if (window.innerWidth > 768 && window.innerWidth < 1344)
        setTrianglePosition("right");
      else setTrianglePosition("center");

      setBoundingBox(boundingBox);
    }
  };

  return (
    <div
      className="relative rounded-full border-[3px] border-neutral-700 p-1"
      onMouseEnter={() => {
        handleActivityHover();
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setBoundingBox(null);
        setIsHovered(false);
      }}
      ref={activityRef}
    >
      <svg
        fill="none"
        height="18"
        viewBox="0 0 24 24"
        width="18"
        className="stroke-current text-neutral-700"
      >
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
      </svg>
      {isHovered &&
        createPortal(
          <div
            className="absolute z-50 flex h-24 w-36 -translate-x-1/2 -translate-y-full flex-col md:h-12 md:w-72"
            style={{
              top: boundingBox?.top,
              left: boundingBox?.left,
            }}
          >
            <span className="flex-1 rounded bg-neutral-300 p-2 text-center text-sm  text-neutral-700">
              Get detailed performance metrics by enabling Speed Insights
            </span>
            <div
              className={`relative flex ${
                trianglePosition === "right"
                  ? "right-2 justify-end"
                  : "left-4 justify-center"
              }`}
            >
              <svg
                className="fill-current text-neutral-300"
                height="6"
                viewBox="0 0 14 6"
                width="14"
              >
                <path d="M13.8284 0H0.17157C0.702003 0 1.21071 0.210714 1.58578 0.585787L5.58578 4.58579C6.36683 5.36684 7.63316 5.36683 8.41421 4.58579L12.4142 0.585786C12.7893 0.210714 13.298 0 13.8284 0Z"></path>
              </svg>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};
