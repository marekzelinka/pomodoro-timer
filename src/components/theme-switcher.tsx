import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function ThemeSwitcher() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-7"
          aria-label="Select your theme preference"
        >
          <SunIcon aria-hidden />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <MonitorIcon aria-hidden />
          System
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SunIcon aria-hidden />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem>
          <MoonIcon aria-hidden />
          Dark
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
