import { NextRequest } from "next/server";
import { Comment, Author, Project, CommentThread } from "@/types";
import { commentThreads } from "@/lib/utils/fakeDatabase";

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get("q");
  const status = request.nextUrl.searchParams.get("status");
  const authors =
    request.nextUrl.searchParams.get("authors") === ""
      ? []
      : request.nextUrl.searchParams.get("authors")?.split(",");
  const projects =
    request.nextUrl.searchParams.get("projects") === ""
      ? []
      : request.nextUrl.searchParams.get("projects")?.split(",");
  const branches =
    request.nextUrl.searchParams.get("branches") === ""
      ? []
      : request.nextUrl.searchParams
          .get("branches")
          ?.split(",")
          .map((branch) => branch.split("-"));
  const pages =
    request.nextUrl.searchParams.get("pages") === ""
      ? []
      : request.nextUrl.searchParams.get("pages")?.split(",");
  let filteredThreads = commentThreads;
  if (search)
    filteredThreads = filteredThreads.filter((thread) =>
      thread.comments[0].text.toLowerCase().includes(search.toLowerCase())
    );
  if (status)
    filteredThreads = filteredThreads.filter(
      (thread) => thread.status === status
    );
  if (authors && authors?.length > 0)
    filteredThreads = filteredThreads.filter((thread) =>
      thread.comments.some((comment) => authors.includes(comment.author.name))
    );
  if (projects && projects?.length > 0)
    filteredThreads = filteredThreads.filter((thread) =>
      projects.includes(thread.project.name)
    );
  if (branches && branches?.length > 0)
    filteredThreads = filteredThreads.filter(
      (thread) =>
        branches.some((branch) => branch[0] === thread.branch) &&
        branches.some((branch) => branch[1] === thread.project.id.toString())
    );
  if (pages && pages?.length > 0)
    filteredThreads = filteredThreads.filter((thread) =>
      pages.includes(thread.page)
    );
  return Response.json(filteredThreads);
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
