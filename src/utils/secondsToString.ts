export const secondsToString = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const hoursLabel = hours.toString().padStart(2, "0");
  const minutesLabel = minutes.toString().padStart(2, "0");
  const secondsLabel = remainingSeconds.toString().padStart(2, "0");

  return `${hoursLabel}:${minutesLabel}:${secondsLabel}`;
};
