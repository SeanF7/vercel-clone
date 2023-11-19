import { type NextRequest } from "next/server";
import { teams } from "@/lib/utils/fakeDatabase";

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get("s");
  let returnTeams =
    search !== null && search !== ""
      ? teams.filter((team) =>
          team.name.toLowerCase().includes(search.toLowerCase())
        )
      : teams;
  return Response.json(returnTeams);
}
