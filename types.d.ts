export type Author = {
  id: number;
  name: string;
  avatar: string;
};

export type Comment = {
  threadId: number;
  authors: Author[];
  text: string;
  time: string;
  project: string;
  page: string;
  branch: string;
  numberOfReplies: number;
  read: boolean;
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
