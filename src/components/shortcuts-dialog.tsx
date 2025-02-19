import { CommandIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function ShortcutsDialog() {
  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="size-7">
              <CommandIcon aria-hidden />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>View shortcuts</p>
        </TooltipContent>
      </Tooltip>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Shortcuts</DialogTitle>
        </DialogHeader>
        <Table>
          <TableCaption>A list of available keyboard shortcuts.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Shortcut</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <kbd className="pointer-events-none h-5 items-center rounded border bg-muted px-1.5 py-1 font-mono text-[10px] font-medium tracking-widest select-none">
                  ⌘/Ctrl + P
                </kbd>
              </TableCell>
              <TableCell>Play/Pause timer</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <kbd className="pointer-events-none h-5 items-center rounded border bg-muted px-1.5 py-1 font-mono text-[10px] font-medium tracking-widest select-none">
                  ⌘/Ctrl + R
                </kbd>
              </TableCell>
              <TableCell>Reset timer (if started)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <kbd className="pointer-events-none h-5 items-center rounded border bg-muted px-1.5 py-1 font-mono text-[10px] font-medium tracking-widest select-none">
                  ⌘/Ctrl + Alt + 1
                </kbd>
              </TableCell>
              <TableCell>Select pomodoro timer</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <kbd className="pointer-events-none h-5 items-center rounded border bg-muted px-1.5 py-1 font-mono text-[10px] font-medium tracking-widest select-none">
                  ⌘/Ctrl + Alt + 2
                </kbd>
              </TableCell>
              <TableCell>Select short break</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <kbd className="pointer-events-none h-5 items-center rounded border bg-muted px-1.5 py-1 font-mono text-[10px] font-medium tracking-widest select-none">
                  ⌘/Ctrl + Alt + 3
                </kbd>
              </TableCell>
              <TableCell>Select long break</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}
