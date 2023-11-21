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
  status: "All" | "Resolved";
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
  branches: string[];
  pages: string[];
};

export type ProjectPage = {
  page: string;
  projectId: number;
  name: string;
  image: string;
};

export type Branch = {
  projectId: number;
  projectName: string;
  branchName: string;
};

export type CommentFilters = {
  authors: Author[];
  status: string;
  branches: Branch[];
  pages: ProjectPage[];
  projects: Project[];
};
