import { NextRequest } from "next/server";
import { Notification } from "@/types";
import { generateRandomDateWithinTwoWeeks } from "@/lib/utils/timeHelpers";

let inbox: Notification[] = generateInbox();
let archive: Notification[] = generateArchive();

export async function GET(request: NextRequest) {
  const isArchived = Boolean(request.nextUrl.searchParams.get("archived"));
  let body = isArchived ? archive : inbox;
  return Response.json(body);
}

export async function DELETE(request: NextRequest) {
  const id = Number(request.nextUrl.searchParams.get("id"));
  if (id) {
    const index = inbox.findIndex((project) => project.id === id);
    archive.push(inbox[index]);
    inbox.splice(index, 1);
  } else {
    archive.push(...inbox);
    inbox = [];
  }
  return Response.json(inbox);
}

setInterval(() => {
  inbox = generateInbox();
  archive = generateArchive();
}, 300000);

function generateInbox() {
  return [
    {
      id: 3,
      image: "https://avatar.vercel.sh/seanfirsching",
      description: "Sean Firsching followed you",
      time: generateRandomDateWithinTwoWeeks(),
    },
    {
      id: 4,
      image: "https://avatar.vercel.sh/seanfirsching",
      description: "Sean Firsching followed you",
      time: generateRandomDateWithinTwoWeeks(),
    },
  ];
}

function generateArchive() {
  return [
    {
      id: 1,
      image: "https://avatar.vercel.sh/seanfirsching",
      description: "Sean Firsching followed you",
      time: generateRandomDateWithinTwoWeeks(),
    },
    {
      id: 2,
      image: "https://avatar.vercel.sh/seanfirsching",
      description: "Sean Firsching followed you",
      time: generateRandomDateWithinTwoWeeks(),
    },
  ];
}
