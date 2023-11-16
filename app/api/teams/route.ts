import vercelLogo from "@/public/vercel.ico";
import { type NextRequest } from "next/server";

type Team = {
  id: number;
  name: string;
  image: string;
};

let teams: Team[] = generateTeams();

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

setInterval(() => {
  teams = generateTeams();
}, 10000);

function generateTeams() {
  return [
    {
      id: 1,
      name: "Sean Firsching",
      image: "https://avatar.vercel.sh/seanfirsching",
    },
  ];
}
