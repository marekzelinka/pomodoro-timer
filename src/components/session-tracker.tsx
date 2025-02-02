import { ScrollArea } from "@/components/ui/scroll-area";
import type { CompletedSession } from "@/types";
import { Fragment } from "react";
import { Separator } from "./ui/separator";

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: true,
  timeZone: "UTC",
});

export function SessionTracker({ sessions }: { sessions: CompletedSession[] }) {
  return (
    <ScrollArea className="h-32">
      {sessions.map((session, index) => (
        <Fragment key={index}>
          <div className="text-muted-foreground space-y-1 text-xs">
            <p>
              Completed at{" "}
              <time
                dateTime={session.createdAt.toISOString()}
                className="text-foreground"
              >
                {dateFormatter.format(session.createdAt)}
              </time>
            </p>
            <p>
              Started at{" "}
              <time
                dateTime={session.completedAt.toISOString()}
                className="text-foreground"
              >
                {dateFormatter.format(session.completedAt)}
              </time>
            </p>
          </div>
          {index < sessions.length - 1 ? <Separator className="my-4" /> : null}
        </Fragment>
      ))}
    </ScrollArea>
  );
}
