import { z } from "zod";
import { BaseProjectSchema, ProjectSchema, ProjectsStatusesSchema } from "./schema.ts";

export type Project = z.infer<typeof ProjectSchema>;
export type BaseProject = z.infer<typeof BaseProjectSchema>;
export type ProjectsStatuses = z.infer<typeof ProjectsStatusesSchema>;