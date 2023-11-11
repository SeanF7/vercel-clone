import { NextRequest } from "next/server";

type Notification = {
  id: number;
  image: string;
  description: string;
  time: string;
};
const notifications: Notification[] = [
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
const archivedNotifications: Notification[] = [
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
export async function GET(request: NextRequest) {
  const isArchived = Boolean(request.nextUrl.searchParams.get("archived"));
  console.log(isArchived, request.nextUrl.searchParams.get("archived"));
  if (isArchived) return Response.json(archivedNotifications);
  return Response.json(notifications);
}

export async function DELETE(request: NextRequest) {
  const id = Number(request.nextUrl.searchParams.get("id"));
  const index = notifications.findIndex((project) => project.id === id);
  archivedNotifications.push(notifications[index]);
  notifications.splice(index, 1);
  return Response.json(notifications);
}
