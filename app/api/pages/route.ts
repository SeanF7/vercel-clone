import { type NextRequest } from "next/server";
import { projects } from "@/lib/utils/fakeDatabase";

export async function GET(request: NextRequest) {
  let search = request.nextUrl.searchParams.get("q");
  let pages = [];
  for (const project of projects) {
    for (const page of project.pages) {
      if (page.includes(search || "")) {
        pages.push({
          id: project.id,
          name: project.name,
          image: project.image,
          page: page,
        });
      }
    }
  }
  return Response.json(pages);
}
