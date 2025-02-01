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
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Tabs defaultValue="pomodoro">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pomodoro">Pomodoro</TabsTrigger>
            <TabsTrigger value="short-break">Short break</TabsTrigger>
            <TabsTrigger value="long-break">Long break</TabsTrigger>
          </TabsList>
        </Tabs>
        <Card>
          <CardContent className="flex flex-col items-center gap-4 p-6">
            <TimerDisplay />
          </CardContent>
          <CardFooter>
            <TimerActions />
          </CardFooter>
        </Card>
      </div>
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <div className="5 space-y-1">
            <CardTitle>Sessions</CardTitle>
            <CardDescription>
              <Badge variant="outline">1</Badge> completed today
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
