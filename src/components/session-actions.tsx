import { Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export function SessionActions({
  completedSessionsCount,
  onClearCompletedSessions,
}: {
  completedSessionsCount: number;
  onClearCompletedSessions: () => void;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="destructive"
            size="icon"
            disabled={completedSessionsCount === 0}
            onClick={onClearCompletedSessions}
            className="size-7"
          >
            <Trash2Icon aria-hidden />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Clear pomodoros for today</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
