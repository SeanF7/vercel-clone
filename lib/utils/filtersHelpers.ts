import { Project, CommentFilters, Branch, ProjectPage, Author } from "@/types";

export const isProjectInFilter = (
  activeProjects: Project[],
  project: Project
) => {
  return activeProjects.some((p) => p.id === project.id);
};

export const addToProjectFilter = (
  project: Project,
  setFilters: React.Dispatch<React.SetStateAction<CommentFilters>>,
  toggle: boolean
) => {
  setFilters((prev) => {
    if (isProjectInFilter(prev.projects, project)) {
      if (!toggle) return prev;
      return {
        ...prev,
        projects: prev.projects.filter((p) => p.id !== project.id),
      };
    } else
      return {
        ...prev,
        projects: [...prev.projects, project],
      };
  });
};

export const isBranchInFilters = (activeBranches: Branch[], branch: Branch) => {
  return activeBranches.some(
    (b) =>
      b.branchName === branch.branchName && b.projectId === branch.projectId
  );
};

export const addToBranchFilter = (
  branch: Branch,
  setFilters: React.Dispatch<React.SetStateAction<CommentFilters>>,
  toggle: boolean
) => {
  setFilters((prev) => {
    if (isBranchInFilters(prev.branches, branch)) {
      if (!toggle) return prev;
      return {
        ...prev,
        branches: prev.branches.filter(
          (p) =>
            p.projectId !== branch.projectId ||
            p.branchName !== branch.branchName
        ),
      };
    } else {
      return {
        ...prev,
        branches: [...prev.branches, branch],
      };
    }
  });
};

export const isPageInFilters = (
  activePages: ProjectPage[],
  page: ProjectPage
) => {
  return activePages.some(
    (p) => p.pageName === page.pageName && p.projectId === p.projectId
  );
};

export const addToPageFilter = (
  page: ProjectPage,
  setFilters: React.Dispatch<React.SetStateAction<CommentFilters>>,
  toggle: boolean
) => {
  setFilters((prev) => {
    if (isPageInFilters(prev.pages, page)) {
      if (!toggle) return prev;
      return {
        ...prev,
        pages: prev.pages.filter(
          (p) => p.projectId !== page.projectId || p.pageName !== page.pageName
        ),
      };
    } else {
      return {
        ...prev,
        pages: [...prev.pages, page],
      };
    }
  });
};

export const addToStatusFilter = (
  status: string,
  setFilters: React.Dispatch<React.SetStateAction<CommentFilters>>
) => {
  setFilters((prev) => {
    if (prev.status === status) {
      return {
        ...prev,
        status: "",
      };
    } else {
      return {
        ...prev,
        status,
      };
    }
  });
};

export const isAuthorInFilters = (activeAuthors: Author[], author: Author) => {
  return activeAuthors.some((a) => a.id === author.id);
};

export const addToAuthorFilter = (
  author: Author,
  setFilters: React.Dispatch<React.SetStateAction<CommentFilters>>,
  toggle: boolean
) => {
  setFilters((prev) => {
    if (isAuthorInFilters(prev.authors, author)) {
      if (!toggle) return prev;
      return {
        ...prev,
        authors: prev.authors.filter((a) => a.id !== author.id),
      };
    } else {
      return {
        ...prev,
        authors: [...prev.authors, author],
      };
    }
  });
};
