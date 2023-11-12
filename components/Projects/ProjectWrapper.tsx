"use client";
import { ProjectContext } from "@/lib/hooks/ProjectContext";
import { ProjectsContent } from "./ProjectsContent";

export const ProjectWrapper = () => {
  return (
    <ProjectContext>
      <ProjectsContent />
    </ProjectContext>
  );
};
