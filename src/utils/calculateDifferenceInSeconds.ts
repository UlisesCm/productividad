import { DateTime } from "luxon";

/**
 * Calculate the absolute difference between two dates in seconds.
 *
 * Uses Luxon library for precise date calculations.
 *
 * @param date1 First date for comparison (defaults to current date if omitted)
 * @param date2 Second date for comparison
 * @returns Absolute difference in seconds
 */
export const calculateDifferenceInSeconds = (
  date1: Date = new Date(),
  date2: Date,
): number => {
  // Convert JavaScript Dates to Luxon DateTime objects
  const dt1 = DateTime.fromJSDate(date1);
  const dt2 = DateTime.fromJSDate(date2);

  // Calculate difference in seconds using Luxon's diff method
  const diffInSeconds = dt2.diff(dt1, "seconds").seconds;

  // Return absolute value to ensure positive result regardless of order
  return Math.abs(diffInSeconds);
};
