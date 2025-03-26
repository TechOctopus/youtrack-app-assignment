import type { HostAPI } from "../../../../../@types/globals";
import { ProjectSchema, ProjectsResponseSchema } from "./schema";

export async function getProjects(
  host: HostAPI,
  query?: string,
  $top?: number,
  $skip?: number,
) {
  const projectFields = Object.keys(ProjectSchema.shape).join(",");

  const response = await host.fetchYouTrack("admin/projects", {
    query: {
      fields: projectFields,
      query,
      $top,
      $skip,
    },
  });

  const result = ProjectsResponseSchema.safeParse(response);
  if (!result.success) {
    throw new Error("Invalid response");
  }
  return result.data;
}
