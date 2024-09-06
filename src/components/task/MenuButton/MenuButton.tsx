import { ActionIcon, Group, Menu } from "@mantine/core";
import {
  IconDotsVertical,
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
} from "@tabler/icons-react";
import { TaskContext } from "../../../context/TaskContext";
import { useContext } from "react";
import { Task } from "../../../interfaces/task.interface";
import { TaskStatus } from "../../../enums/task.enum";
import { DBContext } from "../../../context/dbContext";

interface MenuButtonProps {
  task: Task;
  remainingTimeState: number;
}

const MenuButtons = ({ task, remainingTimeState }: MenuButtonProps) => {
  const {
    taskState: { setSelectedTask },
    modalState: { open },
  } = useContext(TaskContext);

  const { updateTask, removeTask } = useContext(DBContext);

  const handleEdit = () => {
    setSelectedTask(task);
    open();
  };

  const handleStatus = (status: TaskStatus) => {
    updateTask({
      ...task,
      status,
      remainingTime: remainingTimeState,
    });
  };

  const handleDelete = () => {
    removeTask(task.id);
  };

  const handleFinish = () => {
    updateTask({
      ...task,
      remainingTime: 0,
      status: TaskStatus.FINISHED,
    });
  };

  const handleRestartTimer = () => {
    updateTask({
      ...task,
      remainingTime: task.timeAssigned,
      status:
        task.status === TaskStatus.FINISHED ? TaskStatus.PAUSED : task.status,
    });
  };

  const handlePauseAndPlay = () => {
    handleStatus(
      task.status === TaskStatus.ACTIVE ? TaskStatus.PAUSED : TaskStatus.ACTIVE,
    );
  };

  return (
    <Group>
      <ActionIcon
        variant="filled"
        onClick={handlePauseAndPlay}
        color={task.status === TaskStatus.ACTIVE ? "red" : undefined}
      >
        {task.status === TaskStatus.ACTIVE ? (
          <IconPlayerPauseFilled />
        ) : (
          <IconPlayerPlayFilled />
        )}
      </ActionIcon>
      <Menu>
        <Menu.Target>
          <ActionIcon variant="light">
            <IconDotsVertical size={20} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item onClick={handleEdit}>Modificar</Menu.Item>
          <Menu.Item onClick={handlePauseAndPlay}>
            {task.status === TaskStatus.ACTIVE ? "Pausar" : "Reanudar"}
          </Menu.Item>
          <Menu.Item onClick={handleRestartTimer}>Reiniciar contador</Menu.Item>
          <Menu.Item onClick={handleFinish}>Marcar como finalizada</Menu.Item>
          <Menu.Item onClick={handleDelete}>Eliminar</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
};

export default MenuButtons;
