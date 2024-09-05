import { TaskStatus } from "../enums/task.enum";
import { Task } from "../interfaces/task.interface";
import { faker } from "@faker-js/faker";

export function seed(): Task[] {
  const tasks: Task[] = [];

  for (let i = 0; i < 50; i++) {
    const createdAt = faker.date.between({
      from: faker.date.recent({ days: 7 }),
      to: new Date(),
    });
    const updatedAt = faker.date.between({ from: createdAt, to: new Date() });
    const status = i < 40 ? TaskStatus.FINISHED : TaskStatus.PAUSED;
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
