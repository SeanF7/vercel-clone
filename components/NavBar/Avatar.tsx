import React from "react";
import Image from "next/image";

async function getUser() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const json = (await res.json()) as AvatarProps;
  return json;
}

type AvatarProps = {
  width: number;
  height: number;
};

export const Avatar = async ({ width, height }: AvatarProps) => {
  const user = await getUser();

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
