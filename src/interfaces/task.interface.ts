import { TaskStatus } from "../enums/task.enum";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  time?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
