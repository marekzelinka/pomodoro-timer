import { Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";

export function SessionActions() {
  return (
    <Button
      variant="destructive"
      size="icon"
      className="size-7"
      aria-label="Restart pomodoros today"
    >
      <Trash2Icon aria-hidden />
    </Button>
  );
}
