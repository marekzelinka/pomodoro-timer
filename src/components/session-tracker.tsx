import { ScrollArea } from "@/components/ui/scroll-area";
import { isSameDay } from "@/lib/dates";
import type { CompletedSession } from "@/types";
import { Fragment } from "react";
import { Separator } from "./ui/separator";

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: true,
  timeZone: "UTC",
});

export function SessionTracker({ sessions }: { sessions: CompletedSession[] }) {
  const sortedSessions = [...sessions].sort(
    (a, b) => b.completedAt.getTime() - a.completedAt.getTime(),
  );

  return (
    <ScrollArea className="h-32 text-xs">
      {sortedSessions.map((session, index) => {
        const isCompletedToday = isSameDay(session.completedAt, new Date());

        return (
          <Fragment key={index}>
            <div className="text-muted-foreground space-y-1">
              <p>
                Completed at{" "}
                <time
                  dateTime={session.completedAt.toISOString()}
                  className="text-foreground"
                >
                  {dateFormatter.format(session.completedAt)}
                </time>
              </p>
              <p>
                Started at{" "}
                <time
                  dateTime={session.createdAt.toISOString()}
                  className="text-foreground"
                >
                  {dateFormatter.format(session.createdAt)}
                </time>
              </p>
            </div>
            {index < sessions.length - 1 ? (
              !isCompletedToday ? (
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="bg-destructive/20" />
                  </div>
                  <div className="relative flex justify-start">
                    <span className="text-destructive bg-white pr-2">
                      Older than today
                    </span>
                  </div>
                </div>
              ) : (
                <Separator className="my-4" />
              )
            ) : null}
          </Fragment>
        );
      })}
    </ScrollArea>
  );
}
