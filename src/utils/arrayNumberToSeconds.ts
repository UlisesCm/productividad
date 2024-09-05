export function arrayNumberToSeconds(numbers: number[]): number {
  const [hours, minutes, seconds] = numbers;
  const milliseconds = hours * 60 * 60 + minutes * 60 + seconds;
  return milliseconds ?? 0;
}
