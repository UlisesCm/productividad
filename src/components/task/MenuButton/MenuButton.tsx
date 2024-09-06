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

/**
 * Props for the MenuButtons component.
 */
interface MenuButtonProps {
  task: Task;
}

/**
 * Component for rendering menu buttons related to task management.
 */
const MenuButtons = ({ task }: MenuButtonProps) => {
  // Get necessary context values
  const {
    taskState: { setSelectedTask },
    modalState: { open },
  } = useContext(TaskContext);

  const { updateTask, removeTask } = useContext(DBContext);

  /**
   * Handle editing the task.
   */
  const handleEdit = () => {
    setSelectedTask(task);
    open();
  };

  /**
   * Update the task status (pause/play).
   * @param status - New task status
   */
  const handleStatus = (status: TaskStatus) => {
    updateTask({
      ...task,
      status,
    });
  };

  /**
   * Remove the task from the database.
   */
  const handleDelete = () => {
    removeTask(task.id);
  };

  /**
   * Mark the task as finished.
   */
  const handleFinish = () => {
    updateTask({
      ...task,
      status: TaskStatus.FINISHED,
    });
  };

  /**
   * Restart the timer and change the task status.
   */
  const handleRestartTimer = () => {
    updateTask({
      ...task,
      remainingTime: task.timeAssigned,
      status:
        task.status === TaskStatus.FINISHED ? TaskStatus.PAUSED : task.status,
    });
  };

  /**
   * Toggle the task status between ACTIVE and PAUSED.
   */
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
          <Menu.Item onClick={handleEdit}>Editar</Menu.Item>
          <Menu.Item onClick={handlePauseAndPlay}>
            {task.status === TaskStatus.ACTIVE ? "Pause" : "Resume"}
          </Menu.Item>
          <Menu.Item onClick={handleRestartTimer}>Reiniciar contador</Menu.Item>
          <Menu.Item onClick={handleFinish}>Marcar como finalizado</Menu.Item>
          <Menu.Item onClick={handleDelete}>Borrar</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
};

export default MenuButtons;
