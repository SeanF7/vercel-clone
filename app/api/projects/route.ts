import vercelLogo from "@/public/vercel.ico";
import { type NextRequest } from "next/server";
import { Project } from "@/types";
import { favoriteProjects, projects } from "@/lib/utils/fakeDatabase";

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get("s");
  if (search === null || search === "") return Response.json(projects);

  return Response.json(
    projects.filter((project) =>
      project.name.toLowerCase().includes(search.toLowerCase())
    )
  );
}

export async function PATCH(request: NextRequest) {
  const id = Number(await request.nextUrl.searchParams.get("id"));

  const index = projects.findIndex((project) => project.id === id);
  projects[index].favorite = !projects[index].favorite;

  if (projects[index].favorite) {
    favoriteProjects.set(id, true);
  } else {
    favoriteProjects.delete(id);
  }

  return Response.json(projects[index]);
}
