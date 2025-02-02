import { Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";

export function SessionActions({
  completedSessionsCount,
  onClear,
}: {
  completedSessionsCount: number;
  onClear: () => void;
}) {
  return (
    <Button
      disabled={completedSessionsCount === 0}
      variant="destructive"
      size="icon"
      onClick={onClear}
      className="size-7"
      aria-label="Clear pomodoros for today"
    >
      <Trash2Icon aria-hidden />
    </Button>
  );
}
