import { useDisclosure } from "@mantine/hooks";
import { createContext, PropsWithChildren, useState } from "react";
import { Task } from "../interfaces/task.interface";

interface ContextProps {
  taskState: {
    selectedTask: Task | null;
    setSelectedTask: React.Dispatch<React.SetStateAction<Task | null>>;
  };
  modalState: {
    opened: boolean;
    open: () => void;
    close: () => void;
  };
}

export const TaskContext = createContext<ContextProps>({
  taskState: {
    selectedTask: null,
    setSelectedTask: () => {},
  },
  modalState: {
    opened: false,
    open: () => {},
    close: () => {},
  },
});

export const TaskProvider = ({ children }: PropsWithChildren) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <TaskContext.Provider
      value={{
        taskState: {
          selectedTask,
          setSelectedTask,
        },
        modalState: {
          opened,
          open,
          close,
        },
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
