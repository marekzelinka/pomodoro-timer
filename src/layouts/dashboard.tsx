import { PomodoroManager } from "@/components/pomodoro-manager";
import { ShortcutsDialog } from "@/components/shortcuts-dialog";
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
    <div className="bg-muted/40 flex min-h-svh flex-col items-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-[400px] flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <AlarmClockIcon className="size-4" aria-hidden />
            </div>
            Pomodoro Timer
          </div>
          <div className="flex items-center gap-2">
            <ThemeSwitcher />
            <Separator orientation="vertical" className="h-3" />
            <ShortcutsDialog />
            <Separator orientation="vertical" className="h-3" />
            <TimerSettings
              settings={timerSettings}
              onSubmit={updateTimerSettings}
            />
          </div>
        </div>
        <PomodoroManager timerSettings={timerSettings} />
      </div>
    </div>
  );
}
