import vercelLogo from "@/public/vercel.png";

type Project = {
  id: number;
  name: string;
  description: string;
  url: string;
  image: string;
  lastUpdated: string;
};

const projects: Project[] = [
  {
    id: 1,
    name: "Vercel",
    description: "Develop. Preview. Ship.",
    url: "vercel.com",
    image: vercelLogo.src,
    lastUpdated: generateTimeAgo(),
  },
  {
    id: 2,
    name: "Netflix Jobs",
    description: "Netflix jobs website to help people find jobs at Netflix",
    url: "jobs.netflix.com",
    image: "/netflix.png",
    lastUpdated: generateTimeAgo(),
  },
  {
    id: 3,
    name: "Twitch",
    description:
      "Twitch is the world's leading video platform and community for gamers.",
    url: "twitch.tv",
    image: "/twitch.webp",
    lastUpdated: generateTimeAgo(),
  },
  {
    id: 4,
    name: "Notion",
    description:
      "The all-in-one workspace for your notes, tasks, wikis, and databases.",
    url: "notion.so",
    image: "/notion.webp",
    lastUpdated: generateTimeAgo(),
  },
  {
    id: 5,
    name: "DoorDash",
    description:
      "DoorDash is a technology company that connects people with the best in their cities.",
    url: "doordash.com",
    image: "/doordash.webp",
    lastUpdated: generateTimeAgo(),
  },
];

function generateTimeAgo() {
  let timeSpan = Math.round(Math.random());
  if (timeSpan === 0) {
    return Math.floor(Math.random() * 24) + " hours ago";
  } else {
    return Math.floor(Math.random() * 30) + " days ago";
  }
}

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return Response.json(projects);
}
