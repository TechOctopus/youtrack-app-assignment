import { z } from "zod";

export const ProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  shortName: z.string(),
  iconUrl: z.string(),
});

export const ProjectsResponseSchema = z.array(ProjectSchema);
