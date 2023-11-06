import Image from "next/image";

export const Project = () => {
  return (
    <div className="rounded-md bg-neutral-950 px-4 pt-6 align-middle shadow-[0_0px_0px_1px] shadow-neutral-800 transition-colors hover:bg-neutral-800">
      <div className="flex items-center justify-between">
        <div className="flex">
          <div className="p-2">
            <Image
              src="/nextIcon.svg"
              height={32}
              width={32}
              alt="Next Icon"
              className="rounded-full border border-white"
            ></Image>
          </div>
          <div className="flex ">
            <div>
              <h1>politics-chat</h1>
              <p className="text-sm text-neutral-500">
                No Production Deployment
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center ">
          <div className="rounded-full border-2 border-neutral-800 p-1">
            <svg
              fill="none"
              height="18"
              viewBox="0 0 24 24"
              width="18"
              className="stroke-current text-neutral-800"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
          </div>
          <button className="p-3">
            <svg height="16" viewBox="0 0 16 16" width="16">
              <path
                d="M4 8C4 8.82843 3.32843 9.5 2.5 9.5C1.67157 9.5 1 8.82843 1 8C1 7.17157 1.67157 6.5 2.5 6.5C3.32843 6.5 4 7.17157 4 8ZM9.5 8C9.5 8.82843 8.82843 9.5 8 9.5C7.17157 9.5 6.5 8.82843 6.5 8C6.5 7.17157 7.17157 6.5 8 6.5C8.82843 6.5 9.5 7.17157 9.5 8ZM13.5 9.5C14.3284 9.5 15 8.82843 15 8C15 7.17157 14.3284 6.5 13.5 6.5C12.6716 6.5 12 7.17157 12 8C12 8.82843 12.6716 9.5 13.5 9.5Z"
                fill="currentColor"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div className="p-4 pt-12">
        <p className="text-sm text-neutral-400 "> No commits</p>
      </div>
    </div>
  );
};
