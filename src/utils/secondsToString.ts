/**
 * Convert total seconds to a formatted time string in HH:MM:SS format.
 *
 * @param seconds Total seconds to convert
 * @returns Formatted time string
 */
export const secondsToString = (seconds: number): string => {
  // Calculate hours, minutes, and remaining seconds
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  // Format each component to always display two digits
  const hoursLabel = hours.toString().padStart(2, "0");
  const minutesLabel = minutes.toString().padStart(2, "0");
  const secondsLabel = remainingSeconds.toString().padStart(2, "0");

  // Combine formatted components into final time string
  return `${hoursLabel}:${minutesLabel}:${secondsLabel}`;
};
