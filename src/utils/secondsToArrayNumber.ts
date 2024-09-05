export function secondsToArrayNumber(milliseconds: number): number[] {
  const hours = Math.floor(milliseconds / 3600);
  const minutes = Math.floor((milliseconds % 3600) / 60);
  const seconds = milliseconds % 60;
  return [hours, minutes, seconds];
}
