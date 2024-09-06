export enum TaskStatus {
  ACTIVE = "active",
  PAUSED = "paused",
  FINISHED = "finished",
  DELETED = "deleted",
}

export enum TaskStatusLabel {
  active = "En proceso",
  paused = "Pausada",
  finished = "Finalizada",
  deleted = "Eliminada",
}

export enum TaskStatusColor {
  active = "blue",
  paused = "gray",
  finished = "green",
  deleted = "red",
}

export enum DurationOptions {
  SHORT = "1800",
  MEDIUM = "2700",
  LONG = "3600",
  CUSTOM = "0",
}

export enum FilterOptions {
  ALL = "",
  SHORT = "short",
  MEDIUM = "medium",
  LONG = "long",
}

export enum SortOptions {
  ALL = "all",
  RECENT = "recent",
  UPDATE = "update",
  DURATION = "duration",
  DURATION_DESC = "duration desc",
}
