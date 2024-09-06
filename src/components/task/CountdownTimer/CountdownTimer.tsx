import React, { useEffect, useState } from "react";
import { Box, Group, Text } from "@mantine/core";
import { secondsToString } from "../../../utils/secondsToString";
import { TaskStatus } from "../../../enums/task.enum";

/**
 * Props for the CountdownTimer component.
 */
interface CountdownTimerProps {
  status: TaskStatus;
  seconds: number;
  handleDismountTimer: ({
    status,
    remainingTime,
  }: {
    status: TaskStatus;
    remainingTime: number;
  }) => void;
  totalTime: number;
}

/**
 * Component for displaying a countdown timer.
 * Updates every second when active.
 */
const CountdownTimer = ({
  status,
  seconds,
  handleDismountTimer,
  totalTime,
}: CountdownTimerProps) => {
  // State for tracking countdown progress
  const [countdown, setCountdown] = useState(seconds);
  // Reference to the interval ID
  const timerId = React.useRef<number>();

  useEffect(() => {
    // Start counting down when task is active
    if (status === TaskStatus.ACTIVE) {
      // Set up interval to decrement countdown every second
      timerId.current = setInterval(() => {
        setCountdown((prev: number) => {
          if (prev === 0) {
            console.log("Task finished");
            handleDismountTimer({
              status: TaskStatus.FINISHED,
              remainingTime: 0,
            });
            clearInterval(timerId.current);
            return prev;
          }
          return prev - 1;
        });
      }, 1000);

      // Cleanup function to stop timer when component unmounts
      return () => {
        // handleDismountTimer({ initDate, dismountDate: new Date() });
        clearInterval(timerId.current);
      };
    }
  }, [status]);

  return (
    <Group justify="end">
      <Text fz={"sm"}>
        {status === TaskStatus.FINISHED ? "Tiempo total:" : "Tiempo restante:"}{" "}
        <Box component="span" fw={600} c={"blue"}>
          {status === TaskStatus.FINISHED
            ? secondsToString(totalTime)
            : secondsToString(countdown)}
        </Box>
      </Text>
    </Group>
  );
};

export default CountdownTimer;
