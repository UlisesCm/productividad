import { useDisclosure } from "@mantine/hooks";
import { createContext, PropsWithChildren, useState } from "react";
import { Task } from "../interfaces/task.interface";

/**
 * Props for the TaskContext.
 */
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

/**
 * Create a context for managing task selection and modal state.
 */
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

/**
 * Provider component for the TaskContext.
 * Handles task selection and modal state management.
 */
export const TaskProvider = ({ children }: PropsWithChildren) => {
  // State for storing the currently selected task
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  /**
   * Use Mantine's useDisclosure hook to manage modal state.
   */
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
