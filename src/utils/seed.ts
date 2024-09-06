import { TaskStatus } from "../enums/task.enum";
import { Task } from "../interfaces/task.interface";
import { faker } from "@faker-js/faker";

/**
 * Generate mock task data for seeding purposes.
 *
 * Creates 50 tasks with varying statuses, times, and dates.
 *
 * @returns Array of Task objects
 */
export function seed(): Task[] {
  const tasks: Task[] = [];

  for (let i = 0; i < 50; i++) {
    // Generate random creation and update dates within the last week
    const createdAt = faker.date.between({
      from: faker.date.recent({ days: 7 }),
      to: new Date(),
    });
    const updatedAt = faker.date.between({ from: createdAt, to: new Date() });

    // Assign status based on index (80% finished, 20% paused)
    const status = i < 40 ? TaskStatus.FINISHED : TaskStatus.PAUSED;

    // Calculate time assigned and remaining time based on status
    const timeAssigned = faker.number.int({ min: 10, max: 7200 });
    const remainingTime =
      status === TaskStatus.FINISHED
        ? 0
        : faker.number.int({ min: 10, max: timeAssigned });

    tasks.push({
      id: crypto.randomUUID(),
      title: faker.lorem.words(3),
      description: faker.lorem.sentence(),
      status,
      createdAt,
      updatedAt,
      remainingTime,
      timeAssigned,
    });
  }

  return tasks;
}
