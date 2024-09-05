import { Button, Group, Paper, Text } from "@mantine/core";
import MenuButton from "../MenuButton/MenuButton";
import { Task } from "../../../interfaces/task.interface";
import { TaskStatus, TaskStatusLabel } from "../../../enums/task.enum";
import CountdownTimer from "../CountdownTimer/CountdownTimer";
import { useContext, useState } from "react";
import { DBContext } from "../../../context/dbContext";
import { calculateDifferenceInSeconds } from "../../../utils/calculateDifferenceInSeconds";
import { formatDate } from "../../../utils/formatDate";
import { secondsToString } from "../../../utils/secondsToString";

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const {
    title,
    description,
    status,
    timeAssigned = 0,
    remainingTime = 0,
    createdAt,
    updatedAt,
  } = task;
  const { updateTask } = useContext(DBContext);
  const [remainingTimeState, setRemainingTimeState] = useState(remainingTime);
  const [showMore, setShowMore] = useState(false);
  const handleDismountTimer = ({
    initDate,
    dismountDate,
  }: {
    initDate: Date;
    dismountDate: Date;
  }) => {
    const timer = calculateDifferenceInSeconds(initDate, dismountDate);
    const calc = remainingTimeState - Math.floor(timer);
    updateTask({
      ...task,
      status: calc <= 0 ? TaskStatus.FINISHED : TaskStatus.PAUSED,
      remainingTime: calc <= 0 ? 0 : calc,
    });
  };

  return (
    <Paper shadow="xs" withBorder p="md">
      <Group justify="space-between">
        <Text fz={"md"} fw={600}>
          {title}
        </Text>
        <MenuButton task={task} remainingTimeState={remainingTimeState} />
      </Group>
      <Text fz={"sm"} mt={"xs"}>
        Estado: {TaskStatusLabel[status]}
      </Text>
      <Text fz={"sm"}>{description}</Text>
      <CountdownTimer
        status={status}
        seconds={remainingTime}
        setRemainingTimeState={setRemainingTimeState}
        handleDismountTimer={handleDismountTimer}
      />
      <Group justify="center">
        <Button
          size="xs"
          variant="transparent"
          onClick={() => setShowMore((prev) => !prev)}
        >
          Mostrar {showMore ? "mas" : "menos"} información
        </Button>
      </Group>
      {showMore && (
        <>
          <Text size="xs">Tiempo inicial: {secondsToString(timeAssigned)}</Text>
          <Text size="xs">Creada: {formatDate(createdAt)}</Text>
          <Text size="xs">Ultima actualización: {formatDate(updatedAt)}</Text>
        </>
      )}
    </Paper>
  );
};

export default TaskCard;
