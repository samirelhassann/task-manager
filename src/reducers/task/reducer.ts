/* eslint-disable no-param-reassign */
import { produce } from "immer";

import { Task } from "@/domain/Task";

import { ActionTypes } from "./action";

export interface Tasktate {
  tasks: Task[];
}

export function taskReducer(
  state: Tasktate,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: { type: ActionTypes; payload: any },
) {
  switch (action.type) {
    case ActionTypes.ADD_TASK: {
      const updatedTasks = [...state.tasks];

      updatedTasks.push(action.payload.newTask);

      return produce(state, (draft) => {
        draft.tasks = updatedTasks;
      });
    }
    case ActionTypes.REMOVE_TASK: {
      const updatedTasks = state.tasks.filter(
        (task) => task.id !== action.payload.taskId,
      );

      return produce(state, (draft) => {
        draft.tasks = updatedTasks;
      });
    }

    case ActionTypes.CHANGE_TASK_STATUS: {
      const updatedTasks = [...state.tasks].map((task) => {
        if (task.id === action.payload.taskId) {
          const { newStatus } = action.payload;

          if (task.status === newStatus) {
            return task;
          }

          if (newStatus === "completed") {
            return <Task>{
              ...task,
              status: newStatus,
              pausedDate: task.pausedDate ?? new Date(),
            };
          }

          if (newStatus === "active" && task.pausedDate) {
            const difference = task.pausedDate.getTime() - task.date.getTime();

            const newCreatedAt = new Date(new Date().getTime() - difference);

            return <Task>{
              ...task,
              status: newStatus,
              date: newCreatedAt,
              pausedDate: undefined,
            };
          }

          return <Task>{
            ...task,
            status: newStatus,
            pausedDate: new Date(),
          };
        }

        return task;
      });

      return produce(state, (draft) => {
        draft.tasks = updatedTasks;
      });
    }

    case ActionTypes.RESET_TIMER_TASK: {
      const updatedTasks = state.tasks.map((task) => {
        if (task.id === action.payload.taskId) {
          return <Task>{
            ...task,
            date: new Date(),
            pausedDate: new Date(),
            status: "paused",
          };
        }

        return task;
      });

      return produce(state, (draft) => {
        draft.tasks = updatedTasks;
      });
    }

    case ActionTypes.RESET_ALL_TASKS: {
      return produce(state, (draft) => {
        draft.tasks = [];
      });
    }

    default:
      return state;
  }
}
