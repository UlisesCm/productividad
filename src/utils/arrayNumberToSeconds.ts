/**
 * Convert an array of hours, minutes, and seconds to total milliseconds.
 *
 * @param numbers Array containing [hours, minutes, seconds]
 * @returns Total milliseconds represented by the input array
 */
export function arrayNumberToSeconds(numbers: number[]): number {
  // Destructure the array into separate hour, minute, and second values
  const [hours, minutes, seconds] = numbers;

  // Calculate total milliseconds from individual components
  const milliseconds = hours * 60 * 60 + minutes * 60 + seconds;

  // Return calculated milliseconds, defaulting to 0 if NaN
  return milliseconds ?? 0;
}
