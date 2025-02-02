import type { CompletedSession, Theme, TimerSettings } from "@/types";

const STORAGE_KETYS = {
  TIMER_SETTINGS: "timerSettings",
  COMPLETED_SESSIONS: "completedSessions",
  THEME: "theme",
};

export const DEFAULT_TIMER_SETTINGS: TimerSettings = {
  pomodoroDuration: 25 * 60,
  shortBreakDuration: 5 * 60,
  longBreakDuration: 15 * 60,
};

export function saveTimerSettings(timerSettings: TimerSettings) {
  window.localStorage.setItem(
    STORAGE_KETYS.TIMER_SETTINGS,
    JSON.stringify(timerSettings),
  );
}

export function loadTimerSettings(): TimerSettings {
  try {
    const storedValue =
      window.localStorage.getItem(STORAGE_KETYS.TIMER_SETTINGS) ?? "";

    const timerSettings = JSON.parse(storedValue) as TimerSettings;
    if (!timerSettings) {
      return DEFAULT_TIMER_SETTINGS;
    }

    return timerSettings;
  } catch {
    return DEFAULT_TIMER_SETTINGS;
  }
}

export function saveCompletedSessions(completedSessions: CompletedSession[]) {
  window.localStorage.setItem(
    STORAGE_KETYS.COMPLETED_SESSIONS,
    JSON.stringify(completedSessions),
  );
}

export function loadCompletedSessions(): CompletedSession[] {
  try {
    const storedValue =
      window.localStorage.getItem(STORAGE_KETYS.COMPLETED_SESSIONS) ?? "";

    const completedSessions = JSON.parse(storedValue) as CompletedSession[];
    if (!completedSessions) {
      return [];
    }

    // Fix dates as they are not parsed by `JSON.parse`
    return completedSessions.map((session) => ({
      ...session,
      createdAt: new Date(session.createdAt),
      completedAt: new Date(session.completedAt),
    }));
  } catch {
    return [];
  }
}

const DEFAULT_THEME: Theme = "system";

function validateTheme(value: unknown): value is Theme {
  return value === "system" || value === "light" || value === "dark";
}

export function saveTheme(nextTheme: Theme) {
  window.localStorage.setItem(STORAGE_KETYS.THEME, JSON.stringify(nextTheme));
}

export function loadTheme(): Theme {
  const storedValue = window.localStorage.getItem(STORAGE_KETYS.THEME) ?? "";
  if (validateTheme(storedValue)) {
    return storedValue;
  }

  return DEFAULT_THEME;
}
