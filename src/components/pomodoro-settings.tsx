import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SettingsIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";

export function PomodoroSettings() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-7"
          aria-label="Settings"
        >
          <SettingsIcon aria-hidden />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Timer Settings</DialogTitle>
          <DialogDescription>
            Adjust the timer durations for work, short break, and long break.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <form>
            <div className="space-y-6">
              <div className="space-y-4">
                <Label>Pomodoro time</Label>
                <Slider />
              </div>
              <div className="space-y-4">
                <Label>Short break time</Label>
                <Slider />
              </div>
              <div className="space-y-4">
                <Label>Long break time</Label>
                <Slider />
              </div>
            </div>
          </form>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
