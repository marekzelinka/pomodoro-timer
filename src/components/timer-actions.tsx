import { HistoryIcon, PlayIcon } from "lucide-react";
import { Button } from "./ui/button";

export function TimerActions() {
  return (
    <div className="grid w-full grid-cols-2 gap-4">
      <Button type="button" className="w-full">
        <PlayIcon aria-hidden />
        Start
      </Button>
      <Button type="button" variant="outline" className="w-full">
        <HistoryIcon aria-hidden />
        Reset
      </Button>
    </div>
  );
}
