import { Task } from "@/domain/Task";

export enum ActionTypes {
  ADD_TASK = "ADD_TASK",
  REMOVE_TASK = "REMOVE_TASK",
  RESET_TIMER_TASK = "RESET_TIMER_TASK",
  RESET_ALL_TASKS = "RESET_ALL_TASKS",
  CHANGE_TASK_STATUS = "CHANGE_TASK_STATUS",
}

export function addTaskAction(newTask: Task) {
  return {
    type: ActionTypes.ADD_TASK,
    payload: {
      newTask,
    },
  };
}

export function removeTaskAction(taskId: string) {
  return {
    type: ActionTypes.REMOVE_TASK,
    payload: {
      taskId,
    },
  };
}

export function changeTaskStatusAction(
  taskId: string,
  newStatus: Task["status"],
) {
  return {
    type: ActionTypes.CHANGE_TASK_STATUS,
    payload: {
      taskId,
      newStatus,
    },
  };
}

export function resetTimerTaskAction(taskId: string) {
  return {
    type: ActionTypes.RESET_TIMER_TASK,
    payload: {
      taskId,
    },
  };
}

export function resetAllTasksAction() {
  return {
    type: ActionTypes.RESET_ALL_TASKS,
    payload: {},
  };
}
