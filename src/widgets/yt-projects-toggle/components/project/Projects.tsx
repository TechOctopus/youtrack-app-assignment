import React from "react";
import type { HostAPI } from "../../../../../@types/globals";
import { useProjects } from "../../hooks/useProjects.ts";
import { ProjectEmptyState } from "./ProjectEmptyState.tsx";
import Loader from "@jetbrains/ring-ui-built/components/loader/loader";
import { ProjectErrorState } from "./ProjectErrorState.tsx";
import { ProjectsList } from "./ProjectsList.tsx";
import ContentLayout from "@jetbrains/ring-ui-built/components/content-layout/content-layout";
import { ProjectSearch } from "./ProjectSearch.tsx"
import "./project.css";

interface Props {
  host: HostAPI;
}

export const Projects: React.FunctionComponent<Props> = ({host}) => {
  const {
    data: projects,
    changeProjectStatus,
    isLoading,
    isFetchingMore,
    error,
    hasMore,
    loadMore,
    retry,
    search,
  } = useProjects(host);

  const isEmpty = projects.length === 0 && !isLoading && !error

  return (
    <ContentLayout className="projects">
      <div className="projects__content">
        <ProjectSearch search={search}/>
        {isLoading && <Loader message="Loading projects..."/>}
        {error && <ProjectErrorState onRetry={retry}/>}
        {isEmpty && <ProjectEmptyState/>}
        {projects.length > 0 && (
          <ProjectsList
            projects={projects}
            changeProjectStatus={changeProjectStatus}
            hasMore={hasMore}
            isLoadingMore={isFetchingMore}
            onLoadMore={loadMore}
          />
        )}
      </div>
    </ContentLayout>
  );
};
