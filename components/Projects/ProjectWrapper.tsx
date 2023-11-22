"use client";
import { ProjectContext } from "@/lib/hooks/ProjectContext";
import { ProjectsContent } from "./ProjectsContent";
import { useEffect } from "react";

export const ProjectWrapper = () => {
  useEffect(() => {
    const alertUser = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, []);
  return (
    <ProjectContext>
      <ProjectsContent />
    </ProjectContext>
  );
};
