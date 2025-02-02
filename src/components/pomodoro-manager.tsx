import type { CompletedSession, Session, SessionType } from "@/types";
import { completeSession, formatTime, isSameDay } from "@/utils";
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
    timeLeft: 0.1 * 60,
  });
  // TODO: Get saved sessions from localStorage
  const [completedSessions, setCompletedSessions] = useState<
    CompletedSession[]
  >([]);
  const completedSessionsToday = completedSessions.filter((session) =>
    isSameDay(session.completedAt, new Date()),
  );

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
        // Work (pomodoro) session completed
        // TODO: play pomodoro sound

        const completedSession = completeSession(currentSession);
        const nextSessionsCompleted = [...completedSessions, completedSession];
        // TODO: Save completed sessions to localStorage
        setCompletedSessions(nextSessionsCompleted);

        // Switch to break session after 4 pomodoro sessions
        const nextSessionType: SessionType =
          nextSessionsCompleted.length % 4 === 0 ? "long-break" : "short-break";
        resetCurrentSession(nextSessionType);
      } else {
        // Break completed
        // TODO: play break complete sound
        resetCurrentSession("pomodoro");
      }
    }

    return () => clearInterval(timer);
  }, [currentSession, completedSessions]);

  function clearCompletedSessions() {
    setCompletedSessions([]);
  }

  function resetCurrentSession(nextSessionType: SessionType) {
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
        timeLeft = 0.1 * 60;
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
    setCurrentSession((currentSession) => ({
      ...currentSession,
      isRunning: !currentSession.isRunning,
    }));
  }

  function resetTimer() {
    // TODO: play button click sound
    resetCurrentSession(currentSession.type);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Tabs
          defaultValue="pomodoro"
          value={currentSession.type}
          onValueChange={(value) => resetCurrentSession(value as SessionType)}
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
              <Badge variant="secondary">{completedSessionsToday.length}</Badge>{" "}
              completed today
            </CardDescription>
          </div>
          <SessionActions
            completedSessionsCount={completedSessions.length}
            onClear={clearCompletedSessions}
          />
        </CardHeader>
        <CardContent>
          {completedSessions.length ? (
            <SessionTracker sessions={completedSessions} />
          ) : (
            <div className="flex h-32 flex-col items-center justify-center">
              <p className="text-muted-foreground text-sm">No sessions yet!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
