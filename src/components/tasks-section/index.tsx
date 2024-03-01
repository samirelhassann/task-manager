import { useContext } from "react";

import { TasksContext } from "@/contexts/task-context";

import NewTaskContent from "./new-task-content";
import TaskCard from "./task-card";

export default function TasksContent() {
  const { tasksSortedByStatuses } = useContext(TasksContext);

  return (
    <section className="flex flex-col gap-5">
      {tasksSortedByStatuses.map((task) => {
        return <TaskCard key={task.id} task={task} />;
      })}

      <NewTaskContent />
    </section>
  );
}
