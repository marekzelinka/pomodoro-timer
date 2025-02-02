/**
 * Format time for display.
 * @param {number} seconds - Time left in seconds.
 * @returns {string} A time string in MM:SS format.
 */
export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
}

/**
 * Are the given dates in the same day (and year and month)?
 * @param {Date} laterDate  - The first date to check
 * @param {Date} earlierDate - The second date to check
 * @returns {CompletedSession} Session is marked complete by setting the `completedAt` property.
 * @returns The dates are in the same day (and year and month)
 */
export function isSameDay(laterDate: Date, earlierDate: Date): boolean {
  return (
    laterDate.getFullYear() === earlierDate.getFullYear() &&
    laterDate.getMonth() === earlierDate.getMonth() &&
    laterDate.getDate() === earlierDate.getDate()
  );
}
