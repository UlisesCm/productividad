import React, { useEffect, useState } from "react";
import { Box, Group, Text } from "@mantine/core";
import { secondsToString } from "../../../utils/secondsToString";
import { TaskStatus } from "../../../enums/task.enum";

interface CountdownTimerProps {
  status: TaskStatus;
  seconds: number;
  setRemainingTimeState: (remainingTime: number) => void;
  handleDismountTimer: ({
    initDate,
    dismountDate,
  }: {
    initDate: Date;
    dismountDate: Date;
  }) => void;
}

const CountdownTimer = ({
  status,
  seconds,
  setRemainingTimeState,
  handleDismountTimer,
}: CountdownTimerProps) => {
  const [countdown, setCountdown] = useState(seconds);
  const timerId = React.useRef<number>();

  useEffect(() => {
    if (status === TaskStatus.ACTIVE) {
      const initDate = new Date();

      timerId.current = setInterval(() => {
        setCountdown((prev: number) => {
          if (prev === 0) {
            clearInterval(timerId.current);
            setRemainingTimeState(prev);
            handleDismountTimer({ initDate, dismountDate: new Date() });
            return prev;
          }
          setRemainingTimeState(prev - 1);
          return prev - 1;
        });
      }, 1000);
      return () => {
        handleDismountTimer({ initDate, dismountDate: new Date() });
        clearInterval(timerId.current);
      };
    }
  }, [status]);

  return (
    <Group justify="end">
      <Text fz={"sm"}>
        tiempo restante:{" "}
        <Box component="span" fw={600} c={"blue"}>
          {secondsToString(countdown)}
        </Box>
      </Text>
    </Group>
  );
};

export default CountdownTimer;
