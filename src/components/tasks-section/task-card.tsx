import { useContext, useEffect, useState } from "react";

import { Check, Pause, PlayCircle, TimerReset, Trash2 } from "lucide-react";

import { TasksContext } from "@/contexts/task-context";
import { Task } from "@/domain/Task";
import { formatDateBetweenDates } from "@/utils/date-formats";

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({
  task: { title, date: createdAt, id, status, pausedDate },
}: TaskCardProps) {
  const { removeTask, changeTaskStatus, resetTimerTask } =
    useContext(TasksContext);

  const [createdTime, setCreatedTime] = useState<string>("");

  const isTaskPaused = status === "paused";
  const isTaskActive = status === "active";
  const isTaskCompleted = status === "completed";

  useEffect(() => {
    if (pausedDate) {
      setCreatedTime(formatDateBetweenDates(createdAt, pausedDate));
    } else {
      setCreatedTime(formatDateBetweenDates(createdAt));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pausedDate]);

  useEffect(() => {
    if (status !== "active") {
      return () => {};
    }

    const updateCreatedTime = () => {
      if (pausedDate) {
        setCreatedTime(formatDateBetweenDates(createdAt, pausedDate));
      } else {
        setCreatedTime(formatDateBetweenDates(createdAt));
      }
    };

    updateCreatedTime();
    const intervalId = setInterval(updateCreatedTime, 1000);

    return () => clearInterval(intervalId);
  }, [createdAt, pausedDate, status]);

  const handleDeleteTask = () => {
    removeTask(id);
  };

  const handleCompleteTask = () => {
    changeTaskStatus(id, "completed");
  };

  const handlePauseTask = () => {
    changeTaskStatus(id, "paused");
  };

  const handleActiveTask = () => {
    changeTaskStatus(id, "active");
  };

  const handleResetTimerTask = () => {
    resetTimerTask(id);
  };

  return (
    <div className="flex flex-col">
      <div className="grid justify-between grid-cols-my-columns">
        <span
          className="text-xl font-semibold text-purple-500 max-w-[400px] data-[complete=true]:text-zinc-500 data-[complete=true]:font-normal"
          data-complete={isTaskCompleted}
        >
          {title}
        </span>
        <div className="flex items-center justify-center gap-5">
          <span
            className="w-[90px] text-xl text-zinc-500 text-end bg-transparent data-[active=true]:text-emerald-500 data-[paused=true]:text-yellow-400"
            data-active={isTaskActive}
            data-paused={isTaskPaused}
          >
            {createdTime}
          </span>

          <div className="flex gap-3">
            <PlayCircle
              className="w-full h-full duration-300 cursor-pointer text-zinc-600 hover:text-emerald-500
              data-[visible=true]:block hidden"
              data-visible={isTaskPaused}
              onClick={handleActiveTask}
            />
            <Pause
              className="w-full h-full hidden duration-300 cursor-pointer text-zinc-600 hover:text-yellow-400 data-[visible=true]:block"
              data-visible={isTaskActive}
              onClick={handlePauseTask}
            />
            <TimerReset
              className="w-full h-full duration-300 cursor-pointer text-zinc-600 hover:text-orange-500 data-[invisible=true]:hidden"
              onClick={handleResetTimerTask}
              data-invisible={isTaskCompleted}
            />
            <Check
              className="w-full h-full duration-300 cursor-pointer text-zinc-600 hover:text-emerald-500 data-[invisible=true]:hidden"
              onClick={handleCompleteTask}
              data-invisible={isTaskCompleted}
            />
            <Trash2
              className="w-full h-full duration-300 cursor-pointer text-zinc-600 hover:text-rose-500"
              onClick={handleDeleteTask}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
