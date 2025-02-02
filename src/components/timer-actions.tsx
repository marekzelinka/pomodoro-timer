import {
  HistoryIcon,
  PauseIcon,
  PlayIcon,
  StepForwardIcon,
} from "lucide-react";
import { Button } from "./ui/button";

export function TimerActions({
  hasStarted,
  isRunning,
  onStart,
  onToggle,
  onReset,
}: {
  hasStarted: boolean;
  isRunning: boolean;
  onStart: () => void;
  onToggle: () => void;
  onReset: () => void;
}) {
  return (
    <div className="grid w-full grid-cols-2 gap-4">
      {hasStarted ? (
        <Button type="button" onClick={onToggle} className="w-full">
          {isRunning ? (
            <>
              <PauseIcon aria-hidden />
              Pause
            </>
          ) : (
            <>
              <StepForwardIcon aria-hidden />
              Resume
            </>
          )}
        </Button>
      ) : (
        <Button type="button" onClick={onStart} className="w-full">
          <PlayIcon aria-hidden />
          Start
        </Button>
      )}
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
