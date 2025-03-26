import { z } from "zod";
import { ProjectSchema } from "./schema.ts";

export type Project = z.infer<typeof ProjectSchema>;
