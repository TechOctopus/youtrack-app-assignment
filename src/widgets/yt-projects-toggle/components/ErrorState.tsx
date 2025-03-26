import React from "react";
import Button from "@jetbrains/ring-ui-built/components/button/button";

interface ErrorStateProps {
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({onRetry}) => {
  return (
    <div>
      <p>Failed to load projects.</p>
      <Button onClick={onRetry}>Retry</Button>
    </div>
  );
};
