import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { Task } from "../interfaces/task.interface";
import { TaskStatus } from "../enums/task.enum";
import { seed } from "../utils/seed";
import { hardCodeData } from "../data/data";

/**
 * Props for the DBContext.
 */
interface ContextProps {
  data: Task[];
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  removeTask: (taskId: string) => void;
  updateTimer: ({
    id,
    newRemainingTime,
  }: {
    id: string;
    newRemainingTime: number;
  }) => void;
  handleFilter: {
    filter: string | null;
    setFilter: (order: string) => void;
  };
}

/**
 * Create a context for managing database operations and filtering.
 */
export const DBContext = createContext<ContextProps>({
  data: [],
  addTask: () => {},
  updateTask: () => {},
  removeTask: () => {},
  updateTimer: () => {},
  handleFilter: {
    filter: "",
    setFilter: () => {},
  },
});

/**
 * Provider component for the DBContext.
 * Handles state management for tasks, timers, and filtering.
 */
export const DBProvider = ({ children }: PropsWithChildren) => {
  // State for storing all tasks
  const [data, setData] = useState<Task[]>(hardCodeData);

  // State for handling filtering
  const [filter, setFilter] = useState<string | null>(null);

  /**
   * Add a new task to the data.
   * @param task - Task object to add
   */
  const addTask = (task: Task) => {
    setData([task, ...data]);
  };

  /**
   * Update an existing task in the data.
   * @param task - Updated task object
   */
  const updateTask = (task: Task) => {
    const taskIndex = data.findIndex((t) => t.id === task.id);
    const updatedTask = { ...task, updatedAt: new Date() };

    if (updatedTask.status === TaskStatus.ACTIVE) {
      // Remove the task from its current position
      data.splice(taskIndex, 1);
      // Add the updated task at the beginning of the array
      setData([updatedTask, ...data]);
    } else {
      // Update the task in its current position
      data[taskIndex] = updatedTask;
      setData([...data]);
    }
  };
  /**
   * Remove a task from the data.
   * @param taskId - ID of the task to remove
   */
  const removeTask = (taskId: string) => {
    const taskIndex = data.findIndex((t) => t.id === taskId);
    data.splice(taskIndex, 1);
    setData([...data]);
  };

  /**
   * Update the remaining time for a specific task.
   * @param id - ID of the task to update
   * @param newRemainingTime - New remaining time for the task
   */
  const updateTimer = ({
    id,
    newRemainingTime,
  }: {
    id: string;
    newRemainingTime: number;
  }) => {
    const taskIndex = data.findIndex((t) => t.id === id);
    data[taskIndex] = {
      ...data[taskIndex],
      updatedAt: new Date(),
      remainingTime: newRemainingTime,
    };
    setData([...data]);
  };

  /**
   * Seed the initial data when the component mounts.
   */
  useEffect(() => {
    // const dataSeed = seed();
    // setData(dataSeed);
  }, []);

  return (
    <DBContext.Provider
      value={{
        data,
        addTask,
        updateTask,
        removeTask,
        updateTimer,
        handleFilter: { filter, setFilter },
      }}
    >
      {children}
    </DBContext.Provider>
  );
};
