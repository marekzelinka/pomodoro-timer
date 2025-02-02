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
  onUpdate,
}: {
  settings: TimerSettings;
  onUpdate: (nextSettings: TimerSettings) => void;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsDialogOpen(false);
  }

  const isFormTouched =
    JSON.stringify(settings) !== JSON.stringify(DEFAULT_TIMER_SETTINGS);

  function handleFormReset() {
    onUpdate(DEFAULT_TIMER_SETTINGS);
  }

  function handleFormFieldChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    const nextSettings = { ...settings, [name]: Number(value) * 60 };
    onUpdate(nextSettings);
  }

  const settingsFields: {
    id: keyof TimerSettings;
    label: string;
    min: number;
    max: number;
    value: number;
  }[] = [
    {
      id: "pomodoroDuration",
      label: "Pomodoro time",
      min: 1,
      max: 60,
      value: settings.pomodoroDuration / 60,
    },
    {
      id: "shortBreakDuration",
      label: "Short break time",
      min: 1,
      max: 15,
      value: settings.shortBreakDuration / 60,
    },
    {
      id: "longBreakDuration",
      label: "Long break time",
      min: 1,
      max: 30,
      value: settings.longBreakDuration / 60,
    },
  ];

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
              {settingsFields.map((props) => (
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
            form="timer-settings"
            type="reset"
            variant="outline"
            disabled={!isFormTouched}
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
