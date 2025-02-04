import type { SessionType } from "@/types";
import { AlarmClockCheckIcon } from "lucide-react";
import { toast } from "sonner";

const timerMessage: Record<SessionType, string> = {
  pomodoro: "Pomodoro time is over",
  "short-break": "Short break time is over",
  "long-break": "Long break time is over",
};

const DEFAULT_DURATION = 10_000;

export function showTimerDoneToast(type: SessionType) {
  const message = timerMessage[type];
  toast(message, {
    icon: <AlarmClockCheckIcon className="text-primary" />,
    closeButton: true,
    duration: DEFAULT_DURATION,
  });
}

export function dismissToasts() {
  toast.dismiss();
}
