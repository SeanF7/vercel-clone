import {
  Author,
  Project,
  CommentThread,
  Notification,
  Branch,
  Team,
} from "@/types";
import { generateRandomDateWithinTwoWeeks } from "@/lib/utils/timeHelpers";

export const authors: Author[] = [
  {
    id: 1,
    name: "Lee Robinson",
    avatar: `/LeeRobinson.jpg`,
  },
  {
    id: 2,
    name: "Lindsey Simon",
    avatar: `/LindseySimon.jpg`,
  },
  {
    id: 3,
    name: "Guillermo Rauch",
    avatar: `/GuillermoRauch.jpg`,
  },
  {
    id: 4,
    name: "Dan Clancy",
    avatar: "/DanClancy.jpg",
  },
  {
    id: 5,
    name: "Tony Xu",
    avatar: "/TonyXu.jpg",
  },
  {
    id: 6,
    name: "Ivan Zhao",
    avatar: "/IvanZhao.jpg",
  },
  {
    id: 7,
    name: "Sean Firsching",
    avatar: "/SeanFirsching.jpg",
  },
];

export let teams = generateTeams();
export let inbox: Notification[] = generateInbox();
export let archive: Notification[] = generateArchive();
export let projects: Project[] = generateProjects();
export let favoriteProjects = new Map<number, boolean>();

export const branches = projects.flatMap((project) =>
  project.branches.map((branchName) => ({
    branchName,
    projectId: project.id,
    projectName: project.name,
  }))
) as Branch[];

export const pages = projects.flatMap((project) =>
  project.pages.map((pageName) => ({
    pageName,
    projectId: project.id,
    projectName: project.name,
    image: project.image,
  }))
);

export let commentThreads: CommentThread[] = generateCommentThreads();
export function clearInbox() {
  inbox = [];
}

setInterval(() => {
  inbox = generateInbox();
  archive = generateArchive();
  teams = generateTeams();

  projects = generateProjects();
  favoriteProjects = new Map<number, boolean>();
  projects.forEach((project) => {
    if (project.favorite) {
      favoriteProjects.set(project.id, true);
    }
  });
}, 10000);

function generateCommentThreads() {
  let times = Array.from(
    { length: 5 },
    () => new Date(generateRandomDateWithinTwoWeeks())
  )
    .sort((a, b) => b.getTime() - a.getTime())
    .map((time) => time.toISOString());
  console.log(pages.forEach((page, i) => console.log(page.pageName, i)));
  return [
    {
      threadId: 1,
      author: authors[0],
      branch: {
        branchName: projects[0].branches[0],
        projectId: projects[0].id,
        projectName: projects[0].name,
      },
      comments: [
        {
          threadId: 1,
          text: "I think this works well. The load time seems to good after it is cached but the first load is slow. Maybe we can improve that?",
          time: times[0],
          author: authors[0],
        },

        {
          threadId: 1,
          text: "We should probably add some tests for this as well. I'll take a look at that.",
          time: times[0],
          author: authors[1],
        },
      ],
      page: pages[0],
      project: projects[0],
      read: false,
      isResolved: false,
      time: times[0],
    },
    {
      threadId: 2,
      author: authors[1],
      branch: branches[1],
      comments: [
        {
          threadId: 2,
          text: "I encountered a bug on the Contact Us page. Could you take a look?",
          time: times[1],
          author: authors[1],
        },
      ],
      page: pages[1],
      project: projects[1],
      read: false,
      isResolved: true,
      time: times[1],
    },
    {
      threadId: 3,
      author: authors[2],
      branch: {
        branchName: "Staging",
        projectId: projects[0].id,
        projectName: projects[0].name,
      },
      comments: [
        {
          threadId: 3,
          text: "The mobile responsiveness looks off on smaller screens. We might need media queries for that.",
          time: times[2],
          author: authors[2],
        },
        {
          threadId: 3,
          text: "I agree. Let me check and fix it today.",
          time: times[2],
          author: authors[0],
        },
      ],
      page: pages[0],
      project: projects[0],
      read: false,
      isResolved: true,
      time: times[2],
    },
    {
      threadId: 4,
      author: authors[0],
      branch: {
        branchName: "feature-cron-jobs",
        projectId: projects[0].id,
        projectName: projects[0].name,
      },
      comments: [
        {
          threadId: 4,
          text: "I've implemented the new feature. Could someone review it?",
          time: times[3],
          author: authors[0],
        },
        {
          threadId: 4,
          text: "Sure, I'll take a look at it this afternoon.",
          time: "2023-11-21T12:00:00",
          author: authors[1],
        },
      ],
      page: pages[2],
      project: projects[0],
      read: false,
      isResolved: false,
      time: times[3],
    },
    {
      threadId: 5,
      author: authors[3],
      branch: {
        branchName: projects[2].branches[1],
        projectId: projects[2].id,
        projectName: projects[2].name,
      },
      comments: [
        {
          threadId: 4,
          text: "Looks all good to me. Can you add a test for this as well?",
          time: times[4],
          author: authors[3],
        },
      ],
      page: pages[5],
      project: projects[2],
      read: false,
      isResolved: false,
      time: times[4],
    },
  ] as CommentThread[];
}

function generateTeams() {
  return [
    {
      id: 1,
      name: "Sean Firsching",
      image: "/SeanFirsching.jpg",
    },
  ] as Team[];
}

function generateProjects() {
  return [
    {
      id: 1,
      name: "Vercel",
      description: "Develop. Preview. Ship.",
      url: "vercel.com",
      image: "/vercelRound.png",
      lastUpdated: generateRandomDateWithinTwoWeeks(),
      pages: ["/integrations", "/about", "/contact"],
      branches: ["main", "feature-jira-integration", "staging"],
      favorite: true,
    },
    {
      id: 2,
      name: "Netflix Jobs",
      description: "Netflix jobs website to help people find jobs at Netflix",
      url: "jobs.netflix.com",
      image: "/netflix.png",
      lastUpdated: generateRandomDateWithinTwoWeeks(),
      pages: ["/locations", "/teams"],
      branches: ["main", "dev", "staging"],
      favorite: false,
    },
    {
      id: 3,
      name: "Twitch",
      description:
        "Twitch is the world's leading video platform and community for gamers.",
      url: "twitch.tv",
      image: "/twitch.webp",
      lastUpdated: generateRandomDateWithinTwoWeeks(),
      pages: ["/creatorstudio"],
      branches: ["main", "bugfix-creator-studio", "staging"],
      favorite: false,
    },
    {
      id: 4,
      name: "Notion",
      description:
        "The all-in-one workspace for your notes, tasks, wikis, and databases.",
      url: "notion.so",
      image: "/notion.webp",
      lastUpdated: generateRandomDateWithinTwoWeeks(),
      pages: ["/pricing", "/about"],
      branches: ["main", "dev", "staging"],
      favorite: false,
    },
    {
      id: 5,
      name: "DoorDash",
      description:
        "DoorDash is a technology company that connects people with the best in their cities.",
      url: "doordash.com",
      image: "/doordash.webp",
      lastUpdated: generateRandomDateWithinTwoWeeks(),
      pages: ["/store"],
      branches: ["main", "dev", "staging"],
      favorite: false,
    },
  ] as Project[];
}

function generateInbox() {
  return [
    {
      id: 3,
      image: authors[0].avatar,
      description: "Lee Robinson joined your team!",
      time: generateRandomDateWithinTwoWeeks(),
    },
    {
      id: 4,
      image: authors[1].avatar,
      description: "Lindsey Simon added you to the Next.js Docs project",
      time: generateRandomDateWithinTwoWeeks(),
    },
  ] as Notification[];
}

function generateArchive() {
  return [
    {
      id: 1,
      image: "/vercelRound.png",
      description: "Thanks for signing up for Vercel!",
      time: generateRandomDateWithinTwoWeeks(),
    },
    {
      id: 2,
      image: authors[1].avatar,
      description: "Created a new branch: feature-jira-integration",
      time: generateRandomDateWithinTwoWeeks(),
    },
  ] as Notification[];
}
