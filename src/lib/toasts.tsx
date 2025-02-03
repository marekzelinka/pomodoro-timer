import type { SessionType } from "@/types";
import { AlarmClockCheckIcon } from "lucide-react";
import { toast } from "sonner";

const timerMessage: Record<SessionType, string> = {
  pomodoro: "Pomodoro time is over",
  "short-break": "Short break time is over",
  "long-break": "Long break time is over",
};

export function showTimerDoneToast(type: SessionType) {
  const message = timerMessage[type];
  toast(message, {
    icon: <AlarmClockCheckIcon className="text-primary" />,
    closeButton: true,
    duration: Infinity,
  });
}

export function dismissToasts() {
  console.log("here");
  toast.dismiss();
}
