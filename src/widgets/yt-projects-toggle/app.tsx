import React, { memo } from "react";
import type { HostAPI } from "../../../@types/globals";
import { Projects } from "./components/project/Projects.tsx";

interface Props {
  host: HostAPI;
}

const AppComponent: React.FunctionComponent<Props> = ({host}) => {
  return (
    <div className="widget">
      <Projects host={host}/>
    </div>
  );
};

export const App = memo(AppComponent);
