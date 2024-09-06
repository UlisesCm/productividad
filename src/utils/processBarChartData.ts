import { DateTime } from "luxon";
import { Task } from "../interfaces/task.interface";
import { TaskStatus } from "../enums/task.enum";

/**
 * Process task data to generate a chart of completed tasks over the last 5 days.
 *
 * @param tasks - Array of Task objects to be processed
 * @returns Array of objects containing day names and task counts
 */
export function processData(tasks: Task[]): { day: string; Tareas: number }[] {
  // Get current date and calculate dates for the last 5 days
  const now = DateTime.now();
  const lastFiveDays = Array.from({ length: 5 }, (_, i) =>
    now.minus({ days: i }).toISODate(),
  );

  // Initialize an object to store task counts per day
  const taskCountByDay: Record<string, number> = {};

  // Iterate through tasks and count completed ones within the last 5 days
  tasks.forEach((task) => {
    if (task.status === TaskStatus.FINISHED) {
      const taskDate =
        DateTime.fromJSDate(task.updatedAt ?? new Date()).toISODate() ?? "";
      // Check if the task date falls within the last 5 days
      if (lastFiveDays.includes(taskDate)) {
        taskCountByDay[taskDate] = (taskCountByDay[taskDate] || 0) + 1;
      }
    }
  });

  // Transform and sort the data for chart display
  return Object.entries(taskCountByDay)
    .map(([date, count]) => ({
      day: DateTime.fromISO(date).setLocale("es").toFormat("EEEE"),
      Tareas: count,
    }))
    .reverse(); // Reverse the order to show most recent days first
}
