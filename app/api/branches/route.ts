import { type NextRequest } from "next/server";
import { branches } from "@/lib/utils/fakeDatabase";

export async function GET(request: NextRequest) {
  let search = request.nextUrl.searchParams.get("q");
  if (!search) return Response.json(branches);
  branches.filter((branch) => branch.branchName.includes(search!));
  return Response.json(branches);
}
