import { SearchBar } from "@/components/SearchBar";
import { usePopupExits } from "@/lib/hooks/useMobileSwipe";
import { useState, useEffect, useRef } from "react";

type TransferProjectProps = {
  setTransferVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setTransferTeamVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TransferProject = ({
  setTransferVisible,
  setTransferTeamVisible,
}: TransferProjectProps) => {
  const [searchAccount, setSearchAccount] = useState("");
  const [searchSVG, setSearchSVG] = useState<React.ReactNode>(null);
  const [showAccounts, setShowAccounts] = useState(false);
  const transferPopup = useRef(null);
  usePopupExits({
    popupRef: transferPopup,
    setDropdownVisible: setTransferVisible,
  });

  useEffect(() => {
    if (searchAccount === "Create Team")
      setSearchSVG(
        <svg
          fill="none"
          height="24"
          width="24"
          shapeRendering="geometricPrecision"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          className="text-blue-500"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 8v8"></path>
          <path d="M8 12h8"></path>
        </svg>
      );
    else setSearchSVG(null);
  }, [searchAccount]);

  return (
    <>
      <div className="fixed inset-0 z-30 bg-black opacity-60"></div>
      <div className="fixed bottom-0 left-0 z-30 flex h-full w-full items-center justify-center px-2">
        <div
          className="flex w-[450px] flex-col rounded-md  bg-neutral-950 shadow-[0_0px_0px_1px] shadow-neutral-800"
          ref={transferPopup}
        >
          <div className="flex flex-col gap-4 p-6">
            <h1 className="text-2xl font-semibold text-neutral-200">
              Transfer
            </h1>
            <p className="text-sm text-neutral-600">
              Transfer your project from
              <span className="text-white"> Sean Firsching</span> to another
              Vercel account.
            </p>
          </div>
          <div className="">
            <SearchBar
              inputValue={searchAccount}
              placeHolderText="Select a Vercel Account"
              setInputValue={setSearchAccount}
              onFocus={() => setShowAccounts(true)}
              onBlur={() => {
                setTimeout(() => {
                  setShowAccounts(false);
                }, 100);
              }}
              replaceSVG={searchSVG}
              focusColors={true}
              clearButton={true}
              classes="rounded-none"
            />
            {showAccounts && (
              <div
                className="z-50 flex w-full rounded-xl bg-neutral-950 p-2 shadow-[0_0px_0px_1px] shadow-neutral-800"
                onClick={() => {
                  setSearchAccount("Create Team");
                }}
              >
                <div className="flex w-full items-center gap-4 rounded-md bg-neutral-800 p-2 text-sm">
                  <svg
                    fill="none"
                    height="24"
                    width="24"
                    shapeRendering="geometricPrecision"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    className="text-blue-500"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 8v8"></path>
                    <path d="M8 12h8"></path>
                  </svg>
                  Create Team
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-between p-4">
            <button
              className="h-10 rounded-md bg-neutral-950 px-3 text-sm shadow-[0_0px_0px_1px] shadow-neutral-800 transition hover:bg-neutral-900"
              onClick={() => setTransferVisible(false)}
            >
              Cancel
            </button>
            <button
              className="disable:text-white h-10 rounded-md bg-white px-3 text-sm text-neutral-800 shadow-[0_0px_0px_1px] 
              shadow-neutral-800 hover:bg-neutral-300 disabled:bg-neutral-800"
              onClick={() => setTransferTeamVisible(true)}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
