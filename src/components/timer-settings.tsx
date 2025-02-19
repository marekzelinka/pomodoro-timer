import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DEFAULT_TIMER_SETTINGS } from "@/lib/storage";
import type { TimerSettings } from "@/types";
import { Settings2Icon } from "lucide-react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function TimerSettings({
  settings,
  onSubmit,
}: {
  settings: TimerSettings;
  onSubmit: (nextSettings: TimerSettings) => void;
}) {
  const [localSettings, setLocalSettings] = useState(settings);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsDialogOpen(false);

    onSubmit(localSettings);
  }

  const isFormDirty =
    JSON.stringify(localSettings) !== JSON.stringify(DEFAULT_TIMER_SETTINGS);

  function handleFormReset() {
    setLocalSettings(DEFAULT_TIMER_SETTINGS);
  }

  function handleFormFieldChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    const nextSettings = { ...localSettings, [name]: Number(value) * 60 };
    setLocalSettings(nextSettings);
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="size-7">
              <Settings2Icon aria-hidden />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Timer settings</p>
        </TooltipContent>
      </Tooltip>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Timer Settings</DialogTitle>
          <DialogDescription>
            Adjust the timer durations for pomodoro, short break, and long
            break.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <form
            id="timer-settings"
            onSubmit={handleFormSubmit}
            onReset={handleFormReset}
          >
            <div className="space-y-6">
              {[
                {
                  id: "pomodoroDuration",
                  label: "Pomodoro time",
                  min: 1,
                  max: 60,
                  value: localSettings.pomodoroDuration / 60,
                },
                {
                  id: "shortBreakDuration",
                  label: "Short break time",
                  min: 1,
                  max: 15,
                  value: localSettings.shortBreakDuration / 60,
                },
                {
                  id: "longBreakDuration",
                  label: "Long break time",
                  min: 1,
                  max: 30,
                  value: localSettings.longBreakDuration / 60,
                },
              ].map((props) => (
                <div key={props.id} className="space-y-4">
                  <div className="flex justify-between">
                    <Label htmlFor={props.id}>{props.label}</Label>
                    <div className="text-sm leading-none">
                      {props.value}{" "}
                      <span className="text-muted-foreground">
                        {props.value === props.min ? "min" : "mins"}
                      </span>
                    </div>
                  </div>
                  <Slider
                    name={props.id}
                    id={props.id}
                    min={props.min}
                    max={props.max}
                    step={1}
                    value={[props.value]}
                    onValueChange={(value) => {
                      handleFormFieldChange({
                        target: {
                          name: props.id,
                          value: String(value[0]),
                        },
                      } as ChangeEvent<HTMLInputElement>);
                    }}
                  />
                </div>
              ))}
            </div>
          </form>
        </div>
        <DialogFooter>
          <Button
            type="reset"
            form="timer-settings"
            variant="outline"
            disabled={!isFormDirty}
          >
            Reset defaults
          </Button>
          <Button type="submit" form="timer-settings">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
