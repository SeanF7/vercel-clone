"use client";
import Link from "next/link";
import { useState } from "react";

export function Popup() {
  const [showPopup, setShowPopup] = useState(true);

  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="rounded bg-neutral-950 p-6 shadow-[0_0px_0px_1px] shadow-neutral-800">
            <p>
              This is a copy of{" "}
              <Link
                href={"https://vercel.com/dashboard"}
                className="text-blue-500"
              >
                Vercel&apos;s
              </Link>{" "}
              dashboard.
            </p>
            <p className="mt-2">
              The source code is available{" "}
              <Link
                href={"https://github.com/SeanF7/vercel-clone"}
                className="text-blue-500"
              >
                here
              </Link>
            </p>
            <div className="flex flex-col items-center ">
              <button
                onClick={() => setShowPopup(false)}
                className="mt-4 rounded bg-neutral-800 px-4 py-2 text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
