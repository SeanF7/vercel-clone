import { NextRequest } from "next/server";
import vercelLogo from "@/public/vercel.ico";
import { Comment, Author, Project, CommentThread } from "@/types";
const avatarURL = "https://avatar.vercel.sh/";

const authors: Author[] = [
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

const projects: CommentThread["project"][] = [
  {
    id: 1,
    name: "Vercel",
    image: vercelLogo.src,
    url: "vercel.com",
  },
  {
    id: 3,
    name: "Twitch",
    image: "/twitch.webp",
    url: "twitch.com",
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
let commentThreads: CommentThread[] = generateCommentThreads();

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get("q");
  if (search) {
    return Response.json(
      commentThreads.filter((thread) =>
        thread.comments[0].text.toLowerCase().includes(search.toLowerCase())
      )
    );
  }
  return Response.json(commentThreads);
}

export async function PATCH(request: NextRequest) {
  const id = Number(request.nextUrl.searchParams.get("id"));
  if (id) {
    commentThreads.forEach((thread) => {
      if (thread.threadId === id) {
        thread.read = true;
      }
    });
  }
  return Response.json(comments);
}

setInterval(() => {
  commentThreads = generateCommentThreads();
}, 300000);

function generateCommentThreads() {
  let arr: CommentThread[] = [
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
  return arr;
}
