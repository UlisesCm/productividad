import { TaskStatus } from "../enums/task.enum";

export const taskStatusLabel = [
  { label: "En proceso", value: TaskStatus.ACTIVE },
  { label: "Pausada", value: TaskStatus.PAUSED },
  { label: "Finalizada", value: TaskStatus.FINISHED },
  { label: "Eliminada", value: TaskStatus.DELETED },
];

export const durationOptions = [
  { label: "Corta (30 min)", value: "1800" },
  { label: "Media (45 min)", value: "2700" },
  { label: "Larga (1 hora)", value: "3600" },
  { label: "Personalizada", value: "0" },
];

export const filterOptions = [
  { label: "Todas", value: "" },
  { label: "Corta", value: "short" },
  { label: "Media", value: "medium" },
  { label: "Larga", value: "long" },
];

export const sortOptions = [
  { label: "Por defecto", value: "all" },
  { label: "Creadas recientemente", value: "recent" },
  { label: "Ultimas modificadas", value: "update" },
  { label: "Menor Duración", value: "duration" },
  { label: "Mayor Duración", value: "duration desc" },
];
