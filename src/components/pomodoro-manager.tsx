import { SessionType } from "@/types";
import { formatTime } from "@/utils";
import { useEffect, useState } from "react";
import { SessionActions } from "./session-actions";
import { SessionTracker } from "./session-tracker";
import { TimerActions } from "./timer-actions";
import { TimerDisplay } from "./timer-display";
import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

export function PomodoroManager() {
  const [currentSession, setCurrentSession] = useState<SessionType>("pomodoro");
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);

  useEffect(() => {
    const emoji = currentSession === "pomodoro" ? "🍅" : "☕";
    document.title = `${formatTime(timeLeft)} ${emoji} - Pomodoro Timer`;
  }, [currentSession, timeLeft]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      // Start the timer, count down every second
      timer = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      // Timer is complete, calling `handleSessionChange` will stop the timer

      if (currentSession === "pomodoro") {
        // TODO: play pomodoro sound
        // TODO: set session cound

        // Switch to break session
        const nextSession: SessionType = "short-break";
        handleSessionChange(nextSession);
      } else {
        // Break (short/long) completed
        // TODO: play break complete sound
        handleSessionChange("pomodoro");
      }
    }

    return () => clearInterval(timer);
  }, [currentSession, isRunning, timeLeft]);

  function handleSessionChange(nextSession: SessionType) {
    setIsRunning(false);
    setCurrentSession(nextSession);

    // Set appropriate time for the session
    switch (nextSession) {
      case "short-break": {
        setTimeLeft(5 * 60);
        break;
      }
      case "long-break": {
        setTimeLeft(15 * 60);
        break;
      }
      case "pomodoro":
      default: {
        setTimeLeft(25 * 60);
        break;
      }
    }
  }

  function toggleTimer() {
    // TODO: play button click sound
    setIsRunning((isRunning) => !isRunning);
  }

  function resetTimer() {
    // TODO: play button click sound
    setIsRunning(false);
    handleSessionChange(currentSession);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Tabs
          defaultValue="pomodoro"
          value={currentSession}
          onValueChange={(value) => handleSessionChange(value as SessionType)}
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pomodoro">Pomodoro</TabsTrigger>
            <TabsTrigger value="short-break">Short break</TabsTrigger>
            <TabsTrigger value="long-break">Long break</TabsTrigger>
          </TabsList>
        </Tabs>
        <Card>
          <CardContent className="flex flex-col items-center gap-4 p-6">
            <TimerDisplay timeLeft={timeLeft} />
          </CardContent>
          <CardFooter>
            <TimerActions
              isRunning={isRunning}
              onToggle={toggleTimer}
              onReset={resetTimer}
            />
          </CardFooter>
        </Card>
      </div>
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <div className="space-y-1.5">
            <CardTitle>Sessions</CardTitle>
            <CardDescription>
              <Badge variant="secondary">1</Badge> completed today
            </CardDescription>
          </div>
          <SessionActions />
        </CardHeader>
        <CardContent>
          <SessionTracker />
        </CardContent>
      </Card>
    </div>
  );
}
