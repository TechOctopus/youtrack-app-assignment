import React from "react";
import type { HostAPI } from "../../../../@types/globals";
import { useProjects } from "../hooks/useProjects.ts";
import { EmptyState } from "./EmptyState.tsx";
import Loader from "@jetbrains/ring-ui-built/components/loader/loader";
import { ErrorState } from "./ErrorState.tsx";
import { ProjectsList } from "./ProjectsList.tsx";
import Input from "@jetbrains/ring-ui-built/components/input/input";
import searchIcon from "@jetbrains/icons/search";

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
    query,
    setQuery,
  } = useProjects(host);

  return (
    <>
      <Input
        icon={searchIcon}
        placeholder="Filter projects by name or ID"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && search()}
      />
      {isLoading && <Loader message="Loading projects..."/>}
      {error && <ErrorState onRetry={retry}/>}
      {projects.length === 0 && <EmptyState/>}
      {projects.length > 0 && (
        <ProjectsList
          projects={projects}
          changeProjectStatus={changeProjectStatus}
          hasMore={hasMore}
          isLoadingMore={isFetchingMore}
          onLoadMore={loadMore}
        />
      )}
    </>
  );
};
