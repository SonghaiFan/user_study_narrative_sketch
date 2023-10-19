// config.ts
export enum Status {
  TaskNotStarted = "task-not-started",
  TaskInProgress = "task-in-progress",
  TaskCompleted = "task-completed",
  // ... any other statuses
}

export const getStatusForPath = (path: string): Status => {
  switch (path) {
    case "/task":
      return Status.TaskInProgress;
    default:
      return Status.TaskNotStarted;
  }
};

export const getStatusForTaskIndex = (
  currentTaskIndex: number,
  maxTasks: number
): Status => {
  if (currentTaskIndex === maxTasks - 1) {
    return Status.TaskCompleted;
  } else {
    return Status.TaskInProgress;
  }
};
