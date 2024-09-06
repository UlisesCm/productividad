import { TaskStatus } from "../enums/task.enum";
import { Task } from "../interfaces/task.interface";
import { DateTime } from "luxon";

const date = DateTime.now();
/* DUMMY DATA */
export const hardCodeData: Task[] = [
  {
    id: "1",
    title: "Task 1",
    description: "Description 1",
    status: TaskStatus.PAUSED,
    remainingTime: 50,
    timeAssigned: 50,
    createdAt: date.minus({ days: 1 }).toJSDate(),
    updatedAt: date.minus({ days: 1 }).toJSDate(),
  },
  {
    id: "2",
    title: "Task 2",
    description: "Description 2",
    status: TaskStatus.PAUSED,
    remainingTime: 1000,
    timeAssigned: 1000,
    createdAt: date.toJSDate(),
    updatedAt: date.toJSDate(),
  },
  {
    id: "3",
    title: "Task 3",
    description: "Description 3",
    status: TaskStatus.PAUSED,
    remainingTime: 3000,
    timeAssigned: 3000,
    createdAt: date.minus({ days: 6 }).toJSDate(),
    updatedAt: date.minus({ days: 6 }).toJSDate(),
  },
  {
    id: "4",
    title: "Task 4",
    description: "Description 4",
    status: TaskStatus.PAUSED,
    remainingTime: 5000,
    timeAssigned: 5000,
    createdAt: date.minus({ days: 4 }).toJSDate(),
    updatedAt: date.minus({ days: 4 }).toJSDate(),
  },
];
