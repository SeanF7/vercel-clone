import { NextRequest } from "next/server";

type Notification = {
  id: number;
  image: string;
  description: string;
  time: string;
};

let inbox: Notification[] = generateInbox();
let archive: Notification[] = generateArchive();

export async function GET(request: NextRequest) {
  const isArchived = Boolean(request.nextUrl.searchParams.get("archived"));
  let body = isArchived ? archive : inbox;
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function DELETE(request: NextRequest) {
  const id = Number(request.nextUrl.searchParams.get("id"));
  const index = inbox.findIndex((project) => project.id === id);
  archive.push(inbox[index]);
  inbox.splice(index, 1);
  return new Response(JSON.stringify(inbox), {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
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
      time: "2h ago",
    },
    {
      id: 4,
      image: "https://avatar.vercel.sh/seanfirsching",
      description: "Sean Firsching followed you",
      time: "2h ago",
    },
  ];
}

function generateArchive() {
  return [
    {
      id: 1,
      image: "https://avatar.vercel.sh/seanfirsching",
      description: "Sean Firsching followed you",
      time: "1h ago",
    },
    {
      id: 2,
      image: "https://avatar.vercel.sh/seanfirsching",
      description: "Sean Firsching followed you",
      time: "1h ago",
    },
  ];
}
