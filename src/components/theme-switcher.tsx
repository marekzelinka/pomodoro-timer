import type { Theme } from "@/types";
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "./theme-provider";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-7">
              {theme === "light" ? (
                <SunIcon aria-hidden />
              ) : theme === "dark" ? (
                <MoonIcon aria-hidden />
              ) : (
                <MonitorIcon aria-hidden />
              )}
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Select your theme preference</p>
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent align="end">
        {[
          { name: "system", icon: MonitorIcon },
          { name: "light", icon: SunIcon },
          { name: "dark", icon: MoonIcon },
        ].map((option) => (
          <DropdownMenuItem
            key={option.name}
            onClick={() => setTheme(option.name as Theme)}
            className="aria-selected:text-primary"
            aria-selected={option.name === theme}
          >
            <option.icon aria-hidden />
            {option.name.replace(/^./, (c) => c.toUpperCase())}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
