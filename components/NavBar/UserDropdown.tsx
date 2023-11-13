import React from "react";
import Image from "next/image";
import Link from "next/link";
import { UserDropdownPopup } from "./UserDropdownPopup";
import { Avatar } from "./Avatar";

type User = {
  name: string;
  avatar: string;
};

async function getUser() {
  const res = await fetch(`${process.env.URL}/api/user`);
  if (!res.ok) {
    return { name: "null", avatar: "null" };
  }
  const json = await res.json();
  return json as User;
}

export const UserDropdown = async () => {
  const user = await getUser();

  return (
    <div className="flex text-neutral-300">
      <Link className="flex items-center" href={"/dashboard"}>
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
      </Link>
      <UserDropdownPopup avatar={<Avatar width={20} height={20} />} />
    </div>
  );
};
