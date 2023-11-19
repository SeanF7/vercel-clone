import { NextRequest } from "next/server";
import { Notification } from "@/types";
import { generateRandomDateWithinTwoWeeks } from "@/lib/utils/timeHelpers";
import { archive, inbox, clearInbox } from "@/lib/utils/fakeDatabase";

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
    clearInbox();
  }
  return Response.json(inbox);
}
