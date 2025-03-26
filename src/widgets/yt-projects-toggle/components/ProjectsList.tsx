import React from "react";
import { type Project } from "../api/projects";
import { ProjectItem } from "./ProjectItem.tsx";
import Button from "@jetbrains/ring-ui-built/components/button/button";

interface ProjectsListProps {
  projects: Project[];
  hasMore: boolean;
  isLoadingMore: boolean;
  onLoadMore: () => void;
}

export const ProjectsList: React.FC<ProjectsListProps> = ({
                                                            projects,
                                                            hasMore,
                                                            isLoadingMore,
                                                            onLoadMore,
                                                          }) => {
  return (
    <>
      <div>
        {projects.map((project) => (
          <ProjectItem key={project.id} project={project}/>
        ))}
      </div>

      {hasMore && (
        <div>
          <Button
            onClick={onLoadMore}
            loader={isLoadingMore}
            disabled={isLoadingMore}
          >
            Load more
          </Button>
        </div>
      )}
    </>
  );
};
