import { DateTime } from "luxon";

export const formatTimeString = (timeString: string) => {
  const [hours, minutes, seconds] = timeString.split(":").map(Number);
  const dateTime = DateTime.now().set({
    hour: hours ?? 0,
    minute: minutes ?? 0,
    second: seconds ?? 0,
  });
  return dateTime.toJSDate();
};
