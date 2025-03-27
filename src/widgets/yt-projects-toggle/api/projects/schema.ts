import { z } from "zod";

export const BaseProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  shortName: z.string(),
  iconUrl: z.string(),
});

export const BaseProjectsSchema = z.array(BaseProjectSchema);

export const ProjectsStatusesSchema = z.record(z.string(), z.boolean());

export const ProjectSchema = BaseProjectSchema.merge(z.object({status: z.boolean()}));
