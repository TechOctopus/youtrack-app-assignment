import type { HostAPI } from "../../../../@types/globals";
import { useCallback, useEffect, useState } from 'react';
import { usePagination } from "./usePagination.ts";
import { getProjects, type Project, setProjectStatus } from "../api/projects";

export function useProjects(host: HostAPI) {
  const [query, setQuery] = useState('');

  const pagination = usePagination<Project>(
    async (top, skip) => await getProjects(host, query, top, skip)
  );

  const search = useCallback((newQuery: string) => {
    setQuery(newQuery);
  }, []);

  async function changeProjectStatus(projectKey: string, status: boolean) {
    await setProjectStatus(host, projectKey, status)
      .then(() => {
        pagination.setData((prevData) => prevData.map((project) => {
          if (project.shortName === projectKey) {
            return {...project, status};
          }
          return project;
        }));
      }).catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  }

  useEffect(() => {
    (async () => await pagination.reset())()
  }, [query]);

  return {
    ...pagination,
    changeProjectStatus,
    search
  };
}

