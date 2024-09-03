import { Button } from "@mantine/core";
import { useContext } from "react";
import { TaskContext } from "../../../context/TaskContext";

const CreateTaskButton = () => {
  const {
    modalState: { open },
    taskState: { setSelectedTask },
  } = useContext(TaskContext);

  const handleCreateTask = () => {
    setSelectedTask(null);
    open();
  };

  return <Button onClick={handleCreateTask}>Crear una tarea</Button>;
};

export default CreateTaskButton;
