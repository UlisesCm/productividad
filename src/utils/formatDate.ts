/**
 * Format a Date object into a readable string representation.
 *
 * Returns "N/A" if the input date is undefined.
 *
 * @param date Date object to format or undefined
 * @returns Formatted date string in DD/MM/YY HH:MM format
 */
export function formatDate(date: Date | undefined): string {
  // Handle undefined date case
  if (!date) return "N/A";

  // Extract and format date components
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  // Combine formatted components into final date string
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}
