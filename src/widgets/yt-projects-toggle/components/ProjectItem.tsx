import React, { memo } from "react";
import { type Project } from "../api/projects";
import Avatar from "@jetbrains/ring-ui-built/components/avatar/avatar";

interface Props {
  project: Project;
}

const ProjectItemComponent: React.FunctionComponent<Props> = ({project}) => (
  <div>
    <Avatar size={40} url={project.iconUrl} alt={`${ project.name } icon`}/>
    <span>{project.shortName}</span>
  </div>
);

export const ProjectItem = memo(ProjectItemComponent);
