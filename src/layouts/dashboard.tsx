import { PomodoroManager } from "@/components/pomodoro-manager";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { TimerSettings } from "@/components/timer-settings";
import { Separator } from "@/components/ui/separator";
import { loadTimerSettings, saveTimerSettings } from "@/lib/storage";
import { AlarmClockIcon } from "lucide-react";
import { useState } from "react";

export function Dashboard() {
  const [timerSettings, setTimerSettings] = useState(() => loadTimerSettings());

  function updateTimerSettings(nextSettings: typeof timerSettings) {
    setTimerSettings(nextSettings);
    saveTimerSettings(nextSettings);
  }

  return (
    <div className="flex min-h-svh flex-col items-center gap-6 bg-muted/40 p-6 md:p-10">
      <div className="flex w-full max-w-[400px] flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-medium">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <AlarmClockIcon className="size-4" aria-hidden />
            </div>
            Pomodoro Timer
          </div>
          <div className="flex items-center gap-2">
            <ThemeSwitcher />
            <Separator orientation="vertical" className="h-3" />
            <TimerSettings
              settings={timerSettings}
              onUpdate={updateTimerSettings}
            />
          </div>
        </div>
        <PomodoroManager timerSettings={timerSettings} />
      </div>
    </div>
  );
}
