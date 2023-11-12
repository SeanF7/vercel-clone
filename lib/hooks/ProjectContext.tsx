import React, { createContext, useState, useEffect, useContext } from "react";

type ProjectContextType = {
  projects: Project[];
  fetchData: () => Promise<void>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

const projectContext = createContext<ProjectContextType | undefined>(undefined);

type Project = {
  id: number;
  name: string;
  description: string;
  url: string;
  image: string;
  lastUpdated: string;
  favorite: boolean;
};

type ProjectContextProps = {
  children: React.ReactNode;
};

export const useFetchProjects = async () => {
  const context = useContext(projectContext);
  if (!context) {
    throw new Error("useFetchProjects must be used within a ProjectContext");
  }
  return context.fetchData();
};

export const useSetSearch = (text: string) => {
  const context = useContext(projectContext);
  if (!context) {
    throw new Error("useSearchProjects must be used within a ProjectContext");
  }
  context.setSearch(text);
};

export const useGetProjects = () => {
  const context = useContext(projectContext);
  if (!context) {
    throw new Error("useGetProjects must be used within a ProjectContext");
  }
  return context.projects;
};

export const useProjectContext = () => {
  const context = useContext(projectContext);
  if (!context) {
    throw new Error("useProjectContext must be used within a ProjectContext");
  }
  return context;
};

export const ProjectContext = ({ children }: ProjectContextProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    const response = await fetch(`/api/projects?s=${search}`);
    const json = await response.json();
    setProjects(json);
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  return (
    <projectContext.Provider value={{ projects, fetchData, search, setSearch }}>
      {children}
    </projectContext.Provider>
  );
};
