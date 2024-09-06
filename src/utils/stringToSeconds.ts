/**
 * Convert a time string in HH:MM:SS format to total seconds.
 *
 * Handles undefined input and potential parsing errors.
 *
 * @param timeString Time string in HH:MM:SS format or undefined
 * @returns Total seconds represented by the input time string
 */
export const stringToSeconds = (timeString: string | undefined): number => {
  // Handle undefined input case
  if (!timeString) {
    return 0;
  }

  // Split time string into hours, minutes, and seconds components
  const [hours, minutes, seconds] = timeString.split(":").map(Number);

  // Calculate total milliseconds from individual components
  const milliseconds = hours * 60 * 60 + minutes * 60 + seconds;

  // Return calculated milliseconds, defaulting to 0 if NaN
  return milliseconds ?? 0;
};
