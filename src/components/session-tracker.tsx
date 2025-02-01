import { ScrollArea } from "@/components/ui/scroll-area";
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

export function SessionTracker() {
  return (
    <ScrollArea className="h-32">
      <div className="flex items-center gap-4 px-2 text-sm">
        <div>#1</div>
        <Separator orientation="vertical" className="h-6" />
        <div className="text-muted-foreground space-y-1 text-xs">
          <p>
            Completed at{" "}
            <time
              dateTime={new Date().toISOString()}
              className="text-foreground"
            >
              {dateFormatter.format(new Date())}
            </time>
          </p>
          <p>
            Started at{" "}
            <time
              dateTime={new Date().toISOString()}
              className="text-foreground"
            >
              {dateFormatter.format(new Date())}
            </time>
          </p>
        </div>
      </div>
      <Separator className="my-4" />
    </ScrollArea>
  );
}
