import { formatTime } from "@/lib/dates";

export function TimerDisplay({ timeLeft }: { timeLeft: number }) {
  return (
    <div className="text-4xl font-bold tabular-nums sm:text-6xl">
      {formatTime(timeLeft)}
    </div>
  );
}
