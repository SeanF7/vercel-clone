export type Author = {
  id: number;
  name: string;
  avatar: string;
};

export type CommentThread = {
  threadId: number;
  author: Author;
  time: string;
  project: Pick<Project, "id" | "name" | "image" | "url">;
  page: string;
  branch: string;
  read: boolean;
  comments: Comment[];
};

export type Comment = {
  threadId: number;
  author: Author;
  text: string;
  time: string;
};

export type Notification = {
  id: number;
  image: string;
  description: string;
  time: string;
};

export type User = {
  name: string;
  avatar: string;
};

export type Team = {
  id: number;
  name: string;
  image: string;
};

export type Project = {
  id: number;
  name: string;
  description: string;
  url: string;
  image: string;
  lastUpdated: string;
  favorite: boolean;
};
