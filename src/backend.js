// eslint-disable-next-line @typescript-eslint/no-require-imports
const entities = require("@jetbrains/youtrack-scripting-api/entities");

function handleGetProjects(ctx) {
  const projectsKeys = ctx.request.getParameter("projectsKeys").split(",");

  if (!projectsKeys || projectsKeys.length === 0) {
    ctx.response.code = 400;
    return ctx.response.json({
      error: "Missing required query parameter: projectsKeys"
    })
  }

  const projects = new Map();

  for (const projectKey of projectsKeys) {
    const project = entities.Project.findByKey(projectKey);

    if (!project) {
      ctx.response.code = 404;
      return ctx.response.json({
        error: `Project with key ${projectKey} not found`,
      });
    }

    projects.set(
      projectKey,
      project.extensionProperties.testStatus ?? false
    );
  }

  return ctx.response.json(Object.fromEntries(projects));
}

function handlePostProjectStatus(ctx) {
  const {projectKey, status} = ctx.request.json()

  if (!projectKey || typeof status !== "boolean") {
    ctx.response.code = 400;
    return ctx.response.json({
      error: "Invalid request body",
    });
  }

  const project = entities.Project.findByKey(projectKey)
  if (!project) {
    ctx.response.code = 404;
    return ctx.response.json({
      error: "Project not found",
    });
  }

  project.extensionProperties.testStatus = status;

  return ctx.response.json({status: "ok"});
}

exports.httpHandler = {
  endpoints: [
    {
      method: "GET",
      path: "projects",
      handle: handleGetProjects,
    },
    {
      method: "POST",
      path: "project/status",
      handle: handlePostProjectStatus,
    },
  ],
};
