import type { HostAPI } from "../../../../@types/globals";
import { useCallback, useState } from 'react';
import { usePagination } from "./usePagination.ts";
import { getProjects, type Project } from "../api/projects";

export function useProjects(host: HostAPI) {
  const [query, setQuery] = useState('');

  const pagination = usePagination<Project>(
    async (top, skip) => await getProjects(host, query, top, skip)
  );

  const search = useCallback(async () => {
    await pagination.reset();
  }, [pagination]);

  return {
    ...pagination,
    search,
    query,
    setQuery
  };
}

