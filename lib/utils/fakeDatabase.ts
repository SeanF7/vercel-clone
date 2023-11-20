import vercelLogo from "@/public/vercel.ico";
import { Comment, Author, Project, CommentThread, Notification } from "@/types";
import { generateRandomDateWithinTwoWeeks } from "@/lib/utils/timeHelpers";

const avatarURL = "https://avatar.vercel.sh/";
export const authors: Author[] = [
  {
    id: 1,
    name: "Alice",
    avatar: `${avatarURL}alice`,
  },
  {
    id: 2,
    name: "Bob",
    avatar: `${avatarURL}bob`,
  },
  {
    id: 3,
    name: "Charlie",
    avatar: `${avatarURL}charlie`,
  },
];
const comments: Comment[] = [
  {
    threadId: 1,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac lorem nec leo tristique blandit sit amet ac quam. Ut ullamcorper quam id condimentum tempus. Nunc sit amet nisi faucibus, ullamcorper neque in, fringilla lorem. Etiam molestie pretium pellentesque. Nulla in dui et ligula laoreet iaculis. In vel sodales arcu, non luctus massa. Morbi in pellentesque quam, sed consequat nibh. Sed vitae lectus lacus. Etiam cursus feugiat turpis quis maximus. Vivamus non diam et mauris efficitur cursus. Sed ac libero tellus. Donec posuere semper sodales. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut nunc neque, porta in sem at, sagittis iaculis eros. Suspendisse erat lectus, placerat sed tincidunt ut, placerat non nisi. Nulla ut nulla quam.",
    time: "2023-11-19T10:00:00",
    author: authors[0],
  },
  {
    threadId: 2,
    text: "I encountered a bug on the Contact Us page. Could you take a look?",
    time: "2023-11-18T15:30:00",
    author: authors[1],
  },
  {
    threadId: 1,
    text: "Woah that's a lot of text!",
    time: "2023-11-19T10:00:00",
    author: authors[1],
  },
];

export let teams = generateTeams();
export let inbox: Notification[] = generateInbox();
export let archive: Notification[] = generateArchive();
export let projects: Project[] = generateProjects();
export let favoriteProjects = new Map<number, boolean>();
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
  return [
    {
      threadId: 1,
      author: authors[0],
      branch: "main",
      comments: comments.filter((comment) => comment.threadId === 1),
      page: "/index",
      project: projects[0],
      read: false,
      time: "2023-11-19T10:00:00",
    },
    {
      threadId: 2,
      author: authors[1],
      branch: "main",
      comments: comments.filter((comment) => comment.threadId === 2),
      page: "/contact",
      project: projects[0],
      read: false,
      time: "2023-11-18T15:30:00",
    },
  ];
}

function generateTeams() {
  return [
    {
      id: 1,
      name: "Sean Firsching",
      image: "https://avatar.vercel.sh/seanfirsching",
    },
  ];
}

function generateProjects() {
  return [
    {
      id: 1,
      name: "Vercel",
      description: "Develop. Preview. Ship.",
      url: "vercel.com",
      image: vercelLogo.src,
      lastUpdated: generateRandomDateWithinTwoWeeks(),
      pages: ["/dashboard", "/about", "/contact"],
      branches: ["main", "dev", "staging"],
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
      pages: ["/directory"],
      branches: ["main", "dev", "staging"],
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
  ];
}

function generateInbox() {
  return [
    {
      id: 3,
      image: "https://avatar.vercel.sh/seanfirsching",
      description: "Sean Firsching followed you",
      time: generateRandomDateWithinTwoWeeks(),
    },
    {
      id: 4,
      image: "https://avatar.vercel.sh/seanfirsching",
      description: "Sean Firsching followed you",
      time: generateRandomDateWithinTwoWeeks(),
    },
  ];
}

function generateArchive() {
  return [
    {
      id: 1,
      image: "https://avatar.vercel.sh/seanfirsching",
      description: "Sean Firsching followed you",
      time: generateRandomDateWithinTwoWeeks(),
    },
    {
      id: 2,
      image: "https://avatar.vercel.sh/seanfirsching",
      description: "Sean Firsching followed you",
      time: generateRandomDateWithinTwoWeeks(),
    },
  ];
}
