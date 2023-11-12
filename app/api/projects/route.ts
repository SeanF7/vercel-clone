import vercelLogo from "@/public/vercel.ico";
import { type NextRequest } from "next/server";
import { revalidateTag } from "next/cache";

type Project = {
  id: number;
  name: string;
  description: string;
  url: string;
  image: string;
  lastUpdated: string;
  favorite: boolean;
};

let projects: Project[] = generateProjects();

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get("s");

  if (search) {
    const filteredProjects = projects.filter((project) => {
      return project.name.toLowerCase().includes(search.toLowerCase());
    });
    return Response.json(filteredProjects);
  }
  return Response.json(projects);
}

export async function PATCH(request: NextRequest) {
  const id = Number(await request.nextUrl.searchParams.get("id"));

  const index = projects.findIndex((project) => project.id === id);
  projects[index].favorite = !projects[index].favorite;

  return Response.json(projects[index]);
}

setInterval(() => {
  projects = generateProjects();
}, 10000);

function generateTimeAgo() {
  let timeSpan = Math.round(Math.random());
  if (timeSpan === 0) {
    return Math.ceil(Math.random() * 24) + "h ago";
  } else {
    return Math.ceil(Math.random() * 30) + "d ago";
  }
}

function generateProjects() {
  return [
    {
      id: 1,
      name: "Vercel",
      description: "Develop. Preview. Ship.",
      url: "vercel.com",
      image: vercelLogo.src,
      lastUpdated: generateTimeAgo(),
      favorite: true,
    },
    {
      id: 2,
      name: "Netflix Jobs",
      description: "Netflix jobs website to help people find jobs at Netflix",
      url: "jobs.netflix.com",
      image: "/netflix.png",
      lastUpdated: generateTimeAgo(),
      favorite: false,
    },
    {
      id: 3,
      name: "Twitch",
      description:
        "Twitch is the world's leading video platform and community for gamers.",
      url: "twitch.tv",
      image: "/twitch.webp",
      lastUpdated: generateTimeAgo(),
      favorite: false,
    },
    {
      id: 4,
      name: "Notion",
      description:
        "The all-in-one workspace for your notes, tasks, wikis, and databases.",
      url: "notion.so",
      image: "/notion.webp",
      lastUpdated: generateTimeAgo(),
      favorite: false,
    },
    {
      id: 5,
      name: "DoorDash",
      description:
        "DoorDash is a technology company that connects people with the best in their cities.",
      url: "doordash.com",
      image: "/doordash.webp",
      lastUpdated: generateTimeAgo(),
      favorite: false,
    },
  ];
}
