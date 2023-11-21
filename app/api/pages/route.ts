import { type NextRequest } from "next/server";
import { pages } from "@/lib/utils/fakeDatabase";

export async function GET(request: NextRequest) {
  let search = request.nextUrl.searchParams.get("q");
  if (!search) return Response.json(pages);
  return Response.json(
    pages.filter((page) =>
      page.pageName.toLowerCase().includes(search!.toLowerCase())
    )
  );
}
