import { Button } from "@mantine/core";
import { TaskStatus } from "../../../enums/task.enum";
import { Task } from "../../../interfaces/task.interface";
import { useContext } from "react";
import { DBContext } from "../../../context/dbContext";

interface RestartButtonProps {
  task: Task;
}

export const RestartButton = ({ task }: RestartButtonProps) => {
  const { updateTask } = useContext(DBContext);
  const handleRestartTimer = () => {
    const newTask = {
      ...task,
      remainingTime: task.timeAssigned,
      status: TaskStatus.PAUSED,
    };

    updateTask(newTask);
  };
  return (
    <Button size="xs" variant="outline" onClick={handleRestartTimer}>
      Restablecer
    </Button>
  );
};
