import React from "react";
import Image from "next/image";

type User = {
  name: string;
  avatar: string;
};

async function getUser() {
  "use server";
  const res = await fetch(`https://vercel-clone-three.vercel.app/api/user`);
  if (!res.ok) {
    return { name: "null", avatar: "null" };
  }
  const json = (await res.json()) as User;
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
