import { useContext } from "react";

import { TasksContext } from "@/contexts/task-context";

export default function HeaderSection() {
  const { resetAllTasks } = useContext(TasksContext);

  const handleClickReset = () => {
    resetAllTasks();
  };

  return (
    <header className="flex flex-col ">
      <div className="flex justify-between w-full">
        <div className="flex flex-col">
          <h1 className="text-2xl text-purple-500 font-inter">Task Manager</h1>
          <h2 className="mt-1 text-base text-zinc-500">
            Control and monitor tasks
          </h2>
        </div>
        <button
          type="button"
          className="px-4 py-1 btn btn-primary border-[1px] rounded-lg text-zinc-500 border-zinc-500 w-fit h-fit self-end text-sm font-semibold"
          onClick={handleClickReset}
        >
          Reset
        </button>
      </div>
      <hr className="mt-2 border-zinc-700" />
    </header>
  );
}
