import { PlayCircle, TimerReset, Trash2 } from "lucide-react";

interface TaskCardProps {
  title: string;
  time: string;
}

export default function TaskCard({ title, time }: TaskCardProps) {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <span className="text-xl font-semibold text-purple-500 ">{title}</span>
        <div className="flex items-center justify-center gap-5">
          <span className="text-xl text-zinc-400">{time}</span>

          <div className="flex gap-3">
            <PlayCircle className="w-full h-full duration-300 cursor-pointer text-zinc-600 hover:text-emerald-500" />
            <TimerReset className="w-full h-full duration-300 cursor-pointer text-zinc-600 hover:text-orange-500" />
            <Trash2 className="w-full h-full duration-300 cursor-pointer text-zinc-600 hover:text-rose-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
