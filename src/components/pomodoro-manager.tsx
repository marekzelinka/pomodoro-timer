import { SessionType, type Session } from "@/types";
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
  const [currentSession, setCurrentSession] = useState<Session>({
    type: "pomodoro",
    hasStarted: false,
    isRunning: false,
    timeLeft: 25 * 60,
  });

  useEffect(() => {
    const emoji = currentSession.type === "pomodoro" ? "🍅" : "☕";
    document.title = `${formatTime(currentSession.timeLeft)} ${emoji} - Pomodoro Timer`;
  }, [currentSession.timeLeft, currentSession.type]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (currentSession.isRunning && currentSession.timeLeft > 0) {
      // Start the timer, count down every second
      timer = setInterval(() => {
        setCurrentSession((currentSession) => ({
          ...currentSession,
          timeLeft: currentSession.timeLeft - 1,
        }));
      }, 1000);
    } else if (currentSession.timeLeft === 0 && currentSession.isRunning) {
      // Timer is complete, calling `handleSessionChange` will stop the timer

      if (currentSession.type === "pomodoro") {
        // TODO: play pomodoro sound
        // TODO: set session cound

        // Switch to break session
        const nextSessionType: SessionType = "short-break";
        handleSessionChange(nextSessionType);
      } else {
        // Break (short/long) completed
        // TODO: play break complete sound
        handleSessionChange("pomodoro");
      }
    }

    return () => clearInterval(timer);
  }, [currentSession.isRunning, currentSession.timeLeft, currentSession.type]);

  function handleSessionChange(nextSessionType: SessionType) {
    let timeLeft: Session["timeLeft"];

    // Set appropriate time for the session
    switch (nextSessionType) {
      case "short-break": {
        timeLeft = 5 * 60;
        break;
      }
      case "long-break": {
        timeLeft = 15 * 60;
        break;
      }
      case "pomodoro":
      default: {
        timeLeft = 25 * 60;
        break;
      }
    }

    setCurrentSession({
      type: nextSessionType,
      hasStarted: false,
      isRunning: false,
      timeLeft,
      createdAt: undefined,
      completedAt: undefined,
    });
  }

  function startTimer() {
    // TODO: play button click sound
    setCurrentSession((currentSession) => ({
      ...currentSession,
      hasStarted: true,
      isRunning: true,
      createdAt: new Date(),
    }));
  }

  function toggleTimer() {
    // TODO: play button click sound
    // setIsRunning((isRunning) => !isRunning);
    setCurrentSession((currentSession) => ({
      ...currentSession,
      isRunning: !currentSession.isRunning,
    }));
  }

  function resetTimer() {
    // TODO: play button click sound
    handleSessionChange(currentSession.type);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Tabs
          defaultValue="pomodoro"
          value={currentSession.type}
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
            <TimerDisplay timeLeft={currentSession.timeLeft} />
          </CardContent>
          <CardFooter>
            <TimerActions
              hasStarted={currentSession.hasStarted}
              isRunning={currentSession.isRunning}
              onStart={startTimer}
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
