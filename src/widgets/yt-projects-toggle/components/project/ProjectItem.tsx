import React, { memo } from "react";
import { type Project } from "../../api/projects";
import Avatar from "@jetbrains/ring-ui-built/components/avatar/avatar";
import Link from "@jetbrains/ring-ui-built/components/link/link";
import Toggle from "@jetbrains/ring-ui-built/components/toggle/toggle";

interface Props {
  project: Project;
  toggleStatus: () => void;
}

const ProjectItemComponent: React.FunctionComponent<Props> = ({project, toggleStatus}) => (
  <div className="project-item">
    <div className="project-item__info">
      <Avatar size={40} url={project.iconUrl} alt={`${ project.name } icon`}/>
      <Link className="project-item__link" href={`/projects/${ project.shortName }`} active>
        {project.shortName}
      </Link>
    </div>
    <Toggle checked={project.status} onClick={toggleStatus}/>
  </div>
);

export const ProjectItem = memo(ProjectItemComponent);
