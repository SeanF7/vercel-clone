import { type NextRequest } from "next/server";
import { branches } from "@/lib/utils/fakeDatabase";

export async function GET(request: NextRequest) {
  let search = request.nextUrl.searchParams.get("q");
  if (!search) return Response.json(branches);
  return Response.json(
    branches.filter((branch) =>
      branch.branchName.toLowerCase().includes(search!.toLowerCase())
    )
  );
}
