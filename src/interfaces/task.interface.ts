import { TaskStatus } from "../enums/task.enum";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  timeAssigned?: number;
  remainingTime?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
