import React from "react";
import Image from "next/image";

type User = {
  name: string;
  avatar: string;
};

async function getUser() {
  const res = await fetch(`${process.env.URL}/api/user`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const json = await res.json();
  return json as User;
}

export const UserDropdown = async () => {
  const user = await getUser();

  return (
    <div className="flex text-neutral-300">
      <div className="flex items-center">
        <Image
          src={user.avatar}
          height={20}
          width={20}
          className="rounded-full"
          alt="User avatar"
        ></Image>
        <h1 className="mx-2 text-sm">{user.name}</h1>
        <span className="hidden h-5 items-center rounded-xl bg-neutral-800 p-2 py-2 md:flex">
          <span className="text-[11px]">Hobby</span>
        </span>
      </div>
      <div className="flex items-center">
        <button className="flex h-10 w-7 flex-shrink-0 items-center justify-center rounded-lg text-sm text-gray-400 hover:bg-neutral-800">
          <svg
            aria-hidden="true"
            fill="none"
            height="16"
            viewBox="0 0 16 24"
            className="stroke-current text-gray-400"
          >
            <path d="M13 8.517L8 3 3 8.517M3 15.48l5 5.517 5-5.517"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};
