import React, { memo } from "react";
import { type Project } from "../api/projects";
import Avatar from "@jetbrains/ring-ui-built/components/avatar/avatar";
import Checkbox from "@jetbrains/ring-ui-built/components/checkbox/checkbox";

interface Props {
  project: Project;
  toggleStatus: () => void;
}

const ProjectItemComponent: React.FunctionComponent<Props> = ({project, toggleStatus}) => (
  <div>
    <Avatar size={40} url={project.iconUrl} alt={`${ project.name } icon`}/>
    <span>{project.shortName}</span>
    <Checkbox checked={project.status} onClick={toggleStatus}/>
  </div>
);

export const ProjectItem = memo(ProjectItemComponent);
