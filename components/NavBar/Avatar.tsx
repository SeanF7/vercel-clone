import React from "react";
import Image from "next/image";
import { User } from "@/types";
import { authors } from "@/lib/utils/fakeDatabase";

type AvatarProps = {
  width?: number;
  height?: number;
};

export const Avatar = async ({ width = 16, height = 16 }: AvatarProps) => {
  const user = authors.slice(-1)[0];

  return (
    <Image
      src={user.avatar}
      height={width}
      width={height}
      className="rounded-full"
      alt="User avatar"
    ></Image>
  );
};
