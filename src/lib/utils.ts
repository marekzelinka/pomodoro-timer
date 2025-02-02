import type { Theme } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validateTheme(value: unknown): value is Theme {
  return value === "system" || value === "light" || value === "dark";
}
