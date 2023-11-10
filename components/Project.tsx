import Image from "next/image";
import Link from "next/link";

type ProjectProps = {
  name: string;
  description: string;
  image: string;
  lastUpdated: string;
  url: string;
};

export const Project = ({
  name,
  description,
  image,
  lastUpdated,
  url,
}: ProjectProps) => {
  return (
    <Link
      href={`https://${url}`}
      className="flex flex-col justify-between rounded-md bg-neutral-950 px-4 pt-6 align-middle shadow-[0_0px_0px_1px] shadow-neutral-800 transition-colors hover:bg-neutral-800"
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-white">
            <Image
              src={image}
              height={32}
              width={32}
              alt={`${name} logo`}
              className="bg-black"
            ></Image>
          </div>
          <div className="flex">
            <div>
              <h1>{name}</h1>
              <p className="text-sm text-neutral-500">{url}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center ">
          <div className="rounded-full border-[3px] border-neutral-700 p-1">
            <svg
              fill="none"
              height="18"
              viewBox="0 0 24 24"
              width="18"
              className="stroke-current text-neutral-700"
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
      <div className="pt-6 text-sm">
        <span className="text-neutral-200">{description}</span>
        <span className="flex gap-2 py-2 text-neutral-500">
          <svg height="16" viewBox="0 0 14 14" width="16">
            <path
              d="M7 .175c-3.872 0-7 3.128-7 7 0 3.084 2.013 5.71 4.79 6.65.35.066.482-.153.482-.328v-1.181c-1.947.415-2.363-.941-2.363-.941-.328-.81-.787-1.028-.787-1.028-.634-.438.044-.416.044-.416.7.044 1.071.722 1.071.722.635 1.072 1.641.766 2.035.59.066-.459.24-.765.437-.94-1.553-.175-3.193-.787-3.193-3.456 0-.766.262-1.378.721-1.881-.065-.175-.306-.897.066-1.86 0 0 .59-.197 1.925.722a6.754 6.754 0 0 1 1.75-.24c.59 0 1.203.087 1.75.24 1.335-.897 1.925-.722 1.925-.722.372.963.131 1.685.066 1.86.46.48.722 1.115.722 1.88 0 2.691-1.641 3.282-3.194 3.457.24.219.481.634.481 1.29v1.926c0 .197.131.415.481.328C11.988 12.884 14 10.259 14 7.175c0-3.872-3.128-7-7-7z"
              fill="white"
            ></path>
          </svg>
          {lastUpdated} ago on master
        </span>
      </div>
    </Link>
  );
};
