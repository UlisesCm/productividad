import { Badge, Box, Button, Group, Paper, Text } from "@mantine/core";
import MenuButton from "../MenuButton/MenuButton";
import { Task } from "../../../interfaces/task.interface";
import {
  TaskStatus,
  TaskStatusColor,
  TaskStatusLabel,
} from "../../../enums/task.enum";
import CountdownTimer from "../CountdownTimer/CountdownTimer";
import { useContext, useEffect, useState } from "react";
import { DBContext } from "../../../context/dbContext";
import { calculateDifferenceInSeconds } from "../../../utils/calculateDifferenceInSeconds";
import { formatDate } from "../../../utils/formatDate";
import { secondsToString } from "../../../utils/secondsToString";
import { RestartButton } from "../RestartButton/RestartButton";

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
    totalTime,
  } = task;

  const { updateTask } = useContext(DBContext);
  const [showMore, setShowMore] = useState(false);

  const handleDismountTimer = ({
    status,
    remainingTime,
    totalTime,
  }: {
    status: TaskStatus;
    remainingTime: number;
    totalTime?: number;
  }) => {
    updateTask({
      ...task,
      status,
      remainingTime,
      ...(totalTime && { totalTime }),
    });
  };

  useEffect(() => {
    let initCount: Date;
    if (status === TaskStatus.ACTIVE) {
      initCount = new Date();
    }
    return () => {
      if (status === TaskStatus.ACTIVE) {
        const timer = calculateDifferenceInSeconds(
          initCount as Date,
          new Date(),
        );
        if (timer > 1 || timer < -1) {
          const calc = remainingTime - Math.floor(timer);
          const totalTime =
            timeAssigned - calc > timeAssigned
              ? timeAssigned
              : timeAssigned - calc;
          handleDismountTimer({
            status: calc >= 0 ? TaskStatus.PAUSED : TaskStatus.FINISHED,
            remainingTime: calc >= 0 ? calc : 0,
            totalTime,
          });
        }
      }
    };
  }, [status]);

  return (
    <Paper shadow="xs" withBorder p="md">
      <Group justify="space-between">
        <Badge color={TaskStatusColor[status]}>{TaskStatusLabel[status]}</Badge>
        {status !== TaskStatus.FINISHED ? (
          <MenuButton task={task} />
        ) : (
          <RestartButton task={task} />
        )}
      </Group>
      <Box ml={5}>
        <Text fz={"md"} fw={600}>
          {title}
        </Text>
        <Text fz={"sm"}>{description}</Text>
      </Box>
      <CountdownTimer
        status={status}
        seconds={remainingTime}
        totalTime={totalTime ?? 0}
        handleDismountTimer={handleDismountTimer}
      />
      <Group justify="center">
        <Button
          size="xs"
          variant="transparent"
          onClick={() => setShowMore((prev) => !prev)}
        >
          Mostrar {!showMore ? "mas" : "menos"} información
        </Button>
      </Group>
      {showMore && (
        <Box ml={5}>
          <Text size="xs">Tiempo inicial: {secondsToString(timeAssigned)}</Text>
          <Text size="xs">Creada: {formatDate(createdAt)}</Text>
          <Text size="xs">Ultima actualización: {formatDate(updatedAt)}</Text>
        </Box>
      )}
    </Paper>
  );
};

export default TaskCard;
