export interface Task {
  id: string;
  title: string;
  date: Date;
  pausedDate?: Date;
  status: "active" | "paused" | "completed";
}
