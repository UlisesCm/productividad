import {
  DurationOptions,
  FilterOptions,
  SortOptions,
  TaskStatus,
} from "../enums/task.enum";

export const taskStatusLabel = [
  { label: "En proceso", value: TaskStatus.ACTIVE },
  { label: "Pausada", value: TaskStatus.PAUSED },
  { label: "Finalizada", value: TaskStatus.FINISHED },
  { label: "Eliminada", value: TaskStatus.DELETED },
];

export const durationOptions = [
  { label: "Corta (30 min)", value: DurationOptions.SHORT },
  { label: "Media (45 min)", value: DurationOptions.MEDIUM },
  { label: "Larga (1 hora)", value: DurationOptions.LONG },
  { label: "Personalizada", value: DurationOptions.CUSTOM },
];

export const filterOptions = [
  { label: "Todas", value: FilterOptions.ALL },
  { label: "Corta", value: FilterOptions.SHORT },
  { label: "Media", value: FilterOptions.MEDIUM },
  { label: "Larga", value: FilterOptions.LONG },
];

export const sortOptions = [
  { label: "Por defecto", value: SortOptions.ALL },
  { label: "Creadas recientemente", value: SortOptions.RECENT },
  { label: "Ultimas modificadas", value: SortOptions.UPDATE },
  { label: "Menor Duración", value: SortOptions.DURATION },
  { label: "Mayor Duración", value: SortOptions.DURATION_DESC },
];
