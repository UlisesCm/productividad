import { ActionIcon, Menu } from "@mantine/core";
import { IconDotsVertical } from "@tabler/icons-react";
import { TaskContext } from "../../../context/TaskContext";
import { useContext } from "react";
import { Task } from "../../../interfaces/task.interface";

interface MenuButtonProps {
  task: Task;
}

const MenuButton = ({ task }: MenuButtonProps) => {
  const {
    taskState: { setSelectedTask },
    modalState: { open },
  } = useContext(TaskContext);
  const handleEdit = () => {
    setSelectedTask(task);
    open();
  };
  return (
    <Menu>
      <Menu.Target>
        <ActionIcon variant="filled" color="blue">
          <IconDotsVertical size={20} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={handleEdit}>Modificar</Menu.Item>
        <Menu.Item>Pausar</Menu.Item>
        <Menu.Item>Reiniciar contador</Menu.Item>
        <Menu.Item>Marcar como finalizada</Menu.Item>
        <Menu.Item>Eliminar</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default MenuButton;
