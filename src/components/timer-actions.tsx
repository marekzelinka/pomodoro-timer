import { HistoryIcon, PauseIcon, PlayIcon } from "lucide-react";
import { Button } from "./ui/button";

export function TimerActions({
  isRunning,
  onToggle,
  onReset,
}: {
  isRunning: boolean;
  onToggle: () => void;
  onReset: () => void;
}) {
  return (
    <div className="grid w-full grid-cols-2 gap-4">
      <Button type="button" onClick={onToggle} className="w-full">
        {isRunning ? (
          <>
            <PauseIcon aria-hidden />
            Pause
          </>
        ) : (
          <>
            <PlayIcon aria-hidden />
            Start
          </>
        )}
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={onReset}
        className="w-full"
      >
        <HistoryIcon aria-hidden />
        Reset
      </Button>
    </div>
  );
}
