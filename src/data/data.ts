import { TaskStatus } from "../enums/task.enum";
import { Task } from "../interfaces/task.interface";

export const data: Task[] = [
  {
    id: "1",
    title: "Task 1",
    description: "Description 1",
    status: TaskStatus.ACTIVE,
  },
  {
    id: "2",
    title: "Task 2",
    description: "Description 2",
    status: TaskStatus.PAUSED,
  },
  {
    id: "3",
    title: "Task 3",
    description: "Description 3",
    status: TaskStatus.PAUSED,
  },
  {
    id: "4",
    title: "Task 4",
    description: "Description 4",
    status: TaskStatus.PAUSED,
  },
];
