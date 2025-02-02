import type { CompletedSession } from "@/types";

const STORAGE_KETYS = {
  completedSessions: "completedSessions",
};

export function saveCompletedSessions(completedSessions: CompletedSession[]) {
  localStorage.setItem(
    STORAGE_KETYS.completedSessions,
    JSON.stringify(completedSessions),
  );
}

export function loadCompletedSessions() {
  try {
    const storedValue =
      localStorage.getItem(STORAGE_KETYS.completedSessions) ?? "";

    const completedSessions = JSON.parse(storedValue) as CompletedSession[];
    if (!completedSessions || !Array.isArray(completedSessions)) {
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
