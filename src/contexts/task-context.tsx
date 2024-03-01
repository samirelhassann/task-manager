import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from "react";

import { Task } from "@/domain/Task";
import {
  addTaskAction,
  changeTaskStatusAction,
  removeTaskAction,
  resetAllTasksAction,
  resetTimerTaskAction,
} from "@/reducers/task/action";
import { taskReducer } from "@/reducers/task/reducer";

const LOCAL_STORAGE_TASKS_NAME = "@task-manager:tasks-state-1.0.0";

interface TasksContextType {
  tasks: Task[];
  tasksSortedByStatuses: Task[];

  addTask: (product: Task) => void;
  removeTask: (taskId: string) => void;
  resetTimerTask: (taskId: string) => void;
  resetAllTasks: () => void;
  changeTaskStatus: (taskId: string, newStatus: Task["status"]) => void;
}

export const TasksContext = createContext({} as TasksContextType);

interface TaskContextProviderProps {
  children: ReactNode;
}

const TaskContextProvider = ({ children }: TaskContextProviderProps) => {
  const [tasksState, dispatch] = useReducer(
    taskReducer,
    {
      tasks: [],
    },
    () => {
      const storedTasksString = localStorage.getItem(LOCAL_STORAGE_TASKS_NAME);

      if (storedTasksString) {
        const parsedStoredTasks = JSON.parse(storedTasksString).map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (task: any) => {
            return {
              ...task,
              date: new Date(task.date),
              pausedDate: task.pausedDate
                ? new Date(task.pausedDate)
                : undefined,
            } as Task;
          },
        );

        return {
          tasks: parsedStoredTasks,
        };
      }

      return {
        tasks: [],
      };
    },
  );

  useEffect(() => {
    const storedTasksString = localStorage.getItem(LOCAL_STORAGE_TASKS_NAME);

    if (!storedTasksString) {
      localStorage.setItem(LOCAL_STORAGE_TASKS_NAME, JSON.stringify([]));
    }

    if (storedTasksString) {
      localStorage.setItem(
        LOCAL_STORAGE_TASKS_NAME,
        JSON.stringify(tasksState.tasks),
      );
    }
  }, [tasksState.tasks]);

  const addTask = useCallback((task: Task) => {
    dispatch(addTaskAction(task));
  }, []);

  const removeTask = useCallback((taskId: string) => {
    dispatch(removeTaskAction(taskId));
  }, []);

  const resetTimerTask = useCallback((taskId: string) => {
    dispatch(resetTimerTaskAction(taskId));
  }, []);

  const resetAllTasks = useCallback(() => {
    dispatch(resetAllTasksAction());
  }, []);

  const changeTaskStatus = useCallback(
    (taskId: string, newStatus: Task["status"]) => {
      dispatch(changeTaskStatusAction(taskId, newStatus));
    },
    [],
  );

  const tasksSortedByStatuses = useMemo(() => {
    const tasksSorted = [...tasksState.tasks].sort((a, b) => {
      if (a.status === "active") {
        return -1;
      }

      if (a.status === "paused" && b.status === "completed") {
        return -1;
      }

      return 1;
    });

    return tasksSorted;
  }, [tasksState.tasks]);

  const TaskContextProviderValue = useMemo(() => {
    return {
      tasks: tasksState.tasks,
      tasksSortedByStatuses,
      addTask,
      removeTask,
      resetTimerTask,
      resetAllTasks,
      changeTaskStatus,
    };
  }, [
    tasksState.tasks,
    tasksSortedByStatuses,
    addTask,
    removeTask,
    resetTimerTask,
    resetAllTasks,
    changeTaskStatus,
  ]);

  return (
    <TasksContext.Provider value={TaskContextProviderValue}>
      {children}
    </TasksContext.Provider>
  );
};

export default TaskContextProvider;
