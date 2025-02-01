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
