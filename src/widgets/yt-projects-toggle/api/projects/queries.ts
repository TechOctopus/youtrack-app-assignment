import type { HostAPI } from "../../../../../@types/globals";
import { BaseProjectsSchema, ProjectSchema, ProjectsStatusesSchema, } from "./schema";
import { BaseProject, ProjectsStatuses } from "./types.ts";

async function fetchBaseProjects(
  host: HostAPI,
  query?: string,
  $top?: number,
  $skip?: number
) {
  const projectFields = Object.keys(ProjectSchema.shape).join(",");

  const response = await host.fetchYouTrack("admin/projects", {
    query: {
      fields: projectFields,
      archived: false,
      query,
      $top,
      $skip,
    },
  });

  const parsedResponse = BaseProjectsSchema.safeParse(response);
  if (!parsedResponse.success) {
    throw new Error("Invalid projects response");
  }

  return parsedResponse.data;
}

async function fetchProjectStatuses(
  host: HostAPI,
  projects: BaseProject[]
) {
  /*
   *  TODO: Currently using .shortName instead of the preferred .key property
   *    because .key is not yet supported in the current YouTrack backend version.
   *    This should be updated when backend support is added.
   */
  const projectsKeys = projects.map((project) => project.shortName);

  const response = await host.fetchApp("backend/projects", {
    query: {
      projectsKeys: projectsKeys.join(","),
    }
  });

  const parsedResponse = ProjectsStatusesSchema.safeParse(response);
  if (!parsedResponse.success) {
    throw new Error("Invalid statuses response");
  }

  return parsedResponse.data;
}

function combineProjectsWithStatuses(
  projects: BaseProject[],
  statuses: ProjectsStatuses
) {
  return projects.map((project) => {
    return {
      ...project,
      status: statuses[project.shortName] ?? false,
    }
  });
}

export async function getProjects(
  host: HostAPI,
  query?: string,
  $top?: number,
  $skip?: number
) {
  const projects = await fetchBaseProjects(host, query, $top, $skip);
  if (projects.length === 0) {
    return [];
  }

  const statuses = await fetchProjectStatuses(host, projects);

  return combineProjectsWithStatuses(projects, statuses);
}

export async function setProjectStatus(
  host: HostAPI,
  projectKey: string,
  status: boolean
) {
  return await host.fetchApp("backend/project/status", {
    method: "PUT",
    body: {
      status,
      projectKey
    },
  })
}