import { NextRequest } from "next/server";
import { Comment, Author, Project, CommentThread } from "@/types";
import { commentThreads } from "@/lib/utils/fakeDatabase";

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get("q");
  if (search) {
    return Response.json(
      commentThreads.filter((thread) =>
        thread.comments[0].text.toLowerCase().includes(search.toLowerCase())
      )
    );
  }
  return Response.json(commentThreads);
}

export async function PATCH(request: NextRequest) {
  const id = Number(request.nextUrl.searchParams.get("id"));
  if (id) {
    commentThreads.forEach((thread) => {
      if (thread.threadId === id) {
        thread.read = true;
      }
    });
  }
  return Response.json(commentThreads);
}
