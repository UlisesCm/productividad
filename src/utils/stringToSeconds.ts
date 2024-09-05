export const stringToSeconds = (timeString: string | undefined): number => {
  if (!timeString) {
    return 0;
  }
  const [hours, minutes, seconds] = timeString.split(":").map(Number);
  const milliseconds = hours * 60 * 60 + minutes * 60 + seconds;
  return milliseconds ?? 0;
};
