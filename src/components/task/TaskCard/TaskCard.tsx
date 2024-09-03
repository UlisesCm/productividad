import { Group, Paper, Text } from "@mantine/core";
import MenuButton from "../MenuButton/MenuButton";
import { Task } from "../../../interfaces/task.interface";
import { TaskStatusLabel } from "../../../enums/task.enum";

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const { title, description, status, time } = task;
  return (
    <Paper shadow="xs" withBorder p="md">
      <Group justify="space-between">
        <Text fz={"md"} fw={600}>
          {title}
        </Text>
        <MenuButton task={task} />
      </Group>
      <Text fz={"sm"} mt={"xs"}>
        Estado :{TaskStatusLabel[status]}
      </Text>
      <Text fz={"sm"}>{description}</Text>
      <Text fz={"sm"} mt={"xs"}>
        {time?.toISOString() ?? "00:00:00"}
      </Text>
    </Paper>
  );
};

export default TaskCard;
