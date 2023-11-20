import { NextRequest } from "next/server";
import { Comment, Author, Project, CommentThread } from "@/types";
import { authors } from "@/lib/utils/fakeDatabase";

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get("q");
  if (search) {
    return Response.json(
      authors.filter((author) =>
        author.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }
  return Response.json(authors);
}
