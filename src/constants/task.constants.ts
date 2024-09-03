import { TaskStatus } from "../enums/task.enum";

export const taskStatusLabel = [
  { label: "En proceso", value: TaskStatus.ACTIVE },
  { label: "Pausada", value: TaskStatus.PAUSED },
  { label: "Finalizada", value: TaskStatus.FINISHED },
  { label: "Eliminada", value: TaskStatus.DELETED },
];
