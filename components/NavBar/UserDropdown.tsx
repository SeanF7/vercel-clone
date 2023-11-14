"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserDropdownPopup } from "./UserDropdownPopup";
import { MobileUserDropdownPopup } from "./MobileUserDropdownPopup";
import { usePopupExits } from "@/lib/hooks/usePopupExits";

type User = {
  name: string;
  avatar: string;
};

type UserDropdownProps = {
  user: User;
};

export const UserDropdown = ({ user }: UserDropdownProps) => {
  const [width, setWidth] = useState(0);
  const [mobile, setMobile] = useState(false);
  const { controllingButton, isVisible, menuPopup, setVisible } =
    usePopupExits();

  useEffect(() => {
    const handleResize = () => {
      setMobile(width <= 600);
    };
    setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);
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
      {mobile ? (
        <MobileUserDropdownPopup avatar={user.avatar} />
      ) : (
        <UserDropdownPopup avatar={user.avatar} />
      )}
    </div>
  );
};
