import Image from "next/image";
import Link from "next/link";

type ProjectProps = {
  name: string;
  description: string;
  image: string;
  lastUpdated: string;
  url: string;
  listView: boolean;
};

export const GridProject = ({
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
          {lastUpdated} ago on
          <span className="px-1">
            <svg
              height="16"
              strokeLinejoin="round"
              viewBox="0 0 16 16"
              width="16"
            >
              <path
                d="M4 6.25V14.25"
                stroke="currentColor"
                stroke-width="1.5"
                strokeLinecap="square"
                strokeLinejoin="round"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.5 12C10.5 12.8284 11.1716 13.5 12 13.5C12.8284 13.5 13.5 12.8284 13.5 12C13.5 11.1716 12.8284 10.5 12 10.5C11.1716 10.5 10.5 11.1716 10.5 12ZM9.079 12.6869C9.38957 14.0127 10.5795 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.6293 9 9.47333 9.91924 9.1149 11.1749C8.05096 10.9929 7.0611 10.4857 6.28769 9.71231C5.51428 8.9389 5.0071 7.94904 4.82513 6.8851C6.08076 6.52667 7 5.37069 7 4C7 2.34315 5.65685 1 4 1C2.34315 0.999999 1 2.34315 1 4C1 5.42051 1.98728 6.61042 3.3131 6.921C3.51279 8.37102 4.18025 9.72619 5.22703 10.773C6.2738 11.8197 7.62898 12.4872 9.079 12.6869ZM2.5 4C2.5 4.82843 3.17157 5.5 4 5.5C4.82843 5.5 5.5 4.82843 5.5 4C5.5 3.17157 4.82843 2.5 4 2.5C3.17157 2.5 2.5 3.17157 2.5 4Z"
                fill="currentColor"
              ></path>
            </svg>
          </span>
          master
        </span>
      </div>
    </Link>
  );
};

export const ListProject = ({
  name,
  description,
  image,
  lastUpdated,
  url,
}: ProjectProps) => {
  return (
    <div className="flex flex-col">
      <div>
        <div className="flex items-center text-sm">
          <span className="flex gap-2 py-2 text-neutral-200">
            <svg height="16" viewBox="0 0 14 14" width="16">
              <path
                d="M7 .175c-3.872 0-7 3.128-7 7 0 3.084 2.013 5.71 4.79 6.65.35.066.482-.153.482-.328v-1.181c-1.947.415-2.363-.941-2.363-.941-.328-.81-.787-1.028-.787-1.028-.634-.438.044-.416.044-.416.7.044 1.071.722 1.071.722.635 1.072 1.641.766 2.035.59.066-.459.24-.765.437-.94-1.553-.175-3.193-.787-3.193-3.456 0-.766.262-1.378.721-1.881-.065-.175-.306-.897.066-1.86 0 0 .59-.197 1.925.722a6.754 6.754 0 0 1 1.75-.24c.59 0 1.203.087 1.75.24 1.335-.897 1.925-.722 1.925-.722.372.963.131 1.685.066 1.86.46.48.722 1.115.722 1.88 0 2.691-1.641 3.282-3.194 3.457.24.219.481.634.481 1.29v1.926c0 .197.131.415.481.328C11.988 12.884 14 10.259 14 7.175c0-3.872-3.128-7-7-7z"
                fill="white"
              ></path>
            </svg>
            SeanF7/{slugify(name)}
          </span>
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
      <div className="flex justify-between rounded-md bg-neutral-950 py-4 align-middle shadow-[0_0px_0px_1px] shadow-neutral-800 transition-colors">
        <div className="flex w-full px-4 [@media(max-width:600px)]:flex-col">
          <div className="flex w-1/3 items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-white">
              <Image
                src={image}
                height={32}
                width={32}
                alt={`${name} logo`}
                className="bg-black"
              ></Image>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="flex flex-col">
                <Link href={"/"} className="hover:underline">
                  {name}
                </Link>
                <Link
                  href={url}
                  className="group flex items-center gap-1 text-neutral-500 hover:text-neutral-300 hover:underline"
                >
                  {url}
                  <svg
                    height="16"
                    strokeLinejoin="round"
                    viewBox="0 0 16 16"
                    width="16"
                    className="hidden group-hover:block"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.5 9.75V11.25C11.5 11.3881 11.3881 11.5 11.25 11.5H4.75C4.61193 11.5 4.5 11.3881 4.5 11.25L4.5 4.75C4.5 4.61193 4.61193 4.5 4.75 4.5H6.25H7V3H6.25H4.75C3.7835 3 3 3.7835 3 4.75V11.25C3 12.2165 3.7835 13 4.75 13H11.25C12.2165 13 13 12.2165 13 11.25V9.75V9H11.5V9.75ZM8.5 3H9.25H12.2495C12.6637 3 12.9995 3.33579 12.9995 3.75V6.75V7.5H11.4995V6.75V5.56066L8.53033 8.52978L8 9.06011L6.93934 7.99945L7.46967 7.46912L10.4388 4.5H9.25H8.5V3Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex w-2/3 [@media(max-width:600px)]:pt-4">
            <div className="flex flex-col text-sm">
              <Link
                className="line-clamp-1 text-ellipsis text-neutral-200 hover:underline"
                href={"/"}
              >
                {description}
              </Link>
              <span className="flex items-center text-neutral-400">
                {lastUpdated} on
                <span className="px-1">
                  <svg
                    height="16"
                    strokeLinejoin="round"
                    viewBox="0 0 16 16"
                    width="16"
                  >
                    <path
                      d="M4 6.25V14.25"
                      stroke="currentColor"
                      stroke-width="1.5"
                      strokeLinecap="square"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.5 12C10.5 12.8284 11.1716 13.5 12 13.5C12.8284 13.5 13.5 12.8284 13.5 12C13.5 11.1716 12.8284 10.5 12 10.5C11.1716 10.5 10.5 11.1716 10.5 12ZM9.079 12.6869C9.38957 14.0127 10.5795 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.6293 9 9.47333 9.91924 9.1149 11.1749C8.05096 10.9929 7.0611 10.4857 6.28769 9.71231C5.51428 8.9389 5.0071 7.94904 4.82513 6.8851C6.08076 6.52667 7 5.37069 7 4C7 2.34315 5.65685 1 4 1C2.34315 0.999999 1 2.34315 1 4C1 5.42051 1.98728 6.61042 3.3131 6.921C3.51279 8.37102 4.18025 9.72619 5.22703 10.773C6.2738 11.8197 7.62898 12.4872 9.079 12.6869ZM2.5 4C2.5 4.82843 3.17157 5.5 4 5.5C4.82843 5.5 5.5 4.82843 5.5 4C5.5 3.17157 4.82843 2.5 4 2.5C3.17157 2.5 2.5 3.17157 2.5 4Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </span>
                master
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center pl-2">
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
    </div>
  );
};

function slugify(text: string) {
  return text
    .toString()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}
