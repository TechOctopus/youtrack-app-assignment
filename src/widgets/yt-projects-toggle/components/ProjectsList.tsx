import React from "react";
import { type Project } from "../api/projects";
import { ProjectItem } from "./ProjectItem.tsx";
import Button from "@jetbrains/ring-ui-built/components/button/button";

interface ProjectsListProps {
  projects: Project[];
  hasMore: boolean;
  isLoadingMore: boolean;
  onLoadMore: () => void;
  changeProjectStatus: (projectId: string, status: boolean) => void;
}

export const ProjectsList: React.FC<ProjectsListProps> = ({
                                                            projects,
                                                            hasMore,
                                                            isLoadingMore,
                                                            onLoadMore,
                                                            changeProjectStatus,
                                                          }) => {
  return (
    <>
      <div>
        {projects.map((project) => (
          <ProjectItem
            key={project.id}
            project={project}
            toggleStatus={() => changeProjectStatus(project.shortName, !project.status)}
          />
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
