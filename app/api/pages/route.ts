import { type NextRequest } from "next/server";
import { projects } from "@/lib/utils/fakeDatabase";
import type { ProjectPage } from "@/types";

export async function GET(request: NextRequest) {
  let search = request.nextUrl.searchParams.get("q");
  let pages = [];
  for (const project of projects) {
    for (const page of project.pages) {
      if (page.includes(search || "")) {
        pages.push({
          projectId: project.id,
          name: project.name,
          image: project.image,
          page: page,
        } as ProjectPage);
      }
    }
  }
  return Response.json(pages);
}
