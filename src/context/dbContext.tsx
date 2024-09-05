import { createContext, PropsWithChildren, useState } from "react";
import { hardCodeData } from "../data/data";
import { Task } from "../interfaces/task.interface";

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

export const DBProvider = ({ children }: PropsWithChildren) => {
  const [data, setData] = useState<Task[]>(hardCodeData);
  const [filter, setFilter] = useState<string | null>(null);

  const addTask = (task: Task) => {
    setData([task, ...data]);
  };

  const updateTask = (task: Task) => {
    const taskIndex = data.findIndex((t) => t.id === task.id);
    data[taskIndex] = { ...task, updatedAt: new Date() };
    setData([...data]);
  };

  const removeTask = (taskId: string) => {
    const taskIndex = data.findIndex((t) => t.id === taskId);
    data.splice(taskIndex, 1);
    setData([...data]);
  };

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
