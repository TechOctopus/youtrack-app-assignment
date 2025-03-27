import React, { memo, useState } from "react";
import Input, { Size } from "@jetbrains/ring-ui-built/components/input/input";
import searchIcon from "@jetbrains/icons/search";

interface Props {
  search: (query: string) => void;
}

const ProjectSearchComponent: React.FunctionComponent<Props> = ({search}) => {
  const [query, setQuery] = useState("");

  return (
    <Input
      className="projects__search"
      icon={searchIcon}
      placeholder="Filter projects by name or ID"
      value={query}
      size={Size.L}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && search(query)}
    />
  )
};

export const ProjectSearch = memo(ProjectSearchComponent);
