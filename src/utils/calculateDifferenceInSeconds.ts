import { DateTime } from "luxon";

export const calculateDifferenceInSeconds = (
  date1: Date = new Date(),
  date2: Date,
): number => {
  const dt1 = DateTime.fromJSDate(date1);
  const dt2 = DateTime.fromJSDate(date2);
  const diffInSeconds = dt2.diff(dt1, "seconds").seconds;
  return Math.abs(diffInSeconds);
};
