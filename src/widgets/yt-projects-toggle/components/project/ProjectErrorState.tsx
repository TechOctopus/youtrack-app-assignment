import React from "react";
import Button from "@jetbrains/ring-ui-built/components/button/button";
import frownIcon from "@jetbrains/icons/frown";
import ErrorMessage from "@jetbrains/ring-ui-built/components/error-message/error-message";

interface ErrorStateProps {
  onRetry: () => void;
}

export const ProjectErrorState: React.FC<ErrorStateProps> = ({onRetry}) => {
  return (
    <div className="projects__error">
      <ErrorMessage
        icon={frownIcon}
        code="Disconnected"
        message="no answer from server."
        description="Please try again soon."
      >
        <Button onClick={onRetry}>Try again</Button>
      </ErrorMessage>
    </div>
  );
};
