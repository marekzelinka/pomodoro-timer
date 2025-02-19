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
  const { completedToday, completedOlder } = sessions.reduce<{
    completedToday: CompletedSession[];
    completedOlder: CompletedSession[];
  }>(
    (obj, session) => {
      const isCompletedToday = isSameDay(session.completedAt, new Date());
      if (isCompletedToday) {
        obj.completedToday.push(session);
      } else {
        obj.completedOlder.push(session);
      }

      return obj;
    },
    { completedToday: [], completedOlder: [] },
  );

  return (
    <ScrollArea className="h-32 text-xs">
      {completedToday.length ? <SessionList items={completedToday} /> : null}
      {completedOlder.length ? (
        <>
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
          <SessionList items={completedOlder} />
        </>
      ) : null}
    </ScrollArea>
  );
}

function SessionList({ items }: { items: CompletedSession[] }) {
  const sortedItems = [...items].sort(
    (a, b) => b.completedAt.getTime() - a.completedAt.getTime(),
  );

  return sortedItems.map((session, index) => {
    const isLast = index < items.length - 1;

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
        {isLast ? null : <Separator className="my-4" />}
      </Fragment>
    );
  });
}
