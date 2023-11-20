import { type NextRequest } from "next/server";
import { projects } from "@/lib/utils/fakeDatabase";

export async function GET(request: NextRequest) {
  let search = request.nextUrl.searchParams.get("q");
  let branches = [];
  for (const project of projects) {
    for (const branch of project.branches) {
      if (branch.includes(search || "")) {
        branches.push({
          id: project.id,
          projectName: project.name,
          branchName: branch,
        });
      }
    }
  }
  return Response.json(branches);
}
