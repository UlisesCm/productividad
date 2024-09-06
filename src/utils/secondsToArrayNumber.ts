/**
 * Convert total milliseconds to an array of hours, minutes, and seconds.
 *
 * @param milliseconds Total milliseconds to convert
 * @returns Array containing [hours, minutes, seconds]
 */
export function secondsToArrayNumber(milliseconds: number): number[] {
  // Calculate hours, minutes, and seconds from total milliseconds
  const hours = Math.floor(milliseconds / 3600);
  const minutes = Math.floor((milliseconds % 3600) / 60);
  const seconds = milliseconds % 60;

  // Return calculated values as an array
  return [hours, minutes, seconds];
}
