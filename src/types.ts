/**
 * Types for our timer state
 */
export interface TimerSettings {
  pomodoroDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
}

/**
 * Represents the current timer session.
 *
 * - "pomodoro": Work session (default 25 mins).
 * - "short-break": Break session (default 5 mins).
 * - "long-break": Break session (default 15 mins).
 */
export type SessionType = "pomodoro" | "short-break" | "long-break";

export interface Session {
  type: SessionType;
  hasStarted: boolean;
  isRunning: boolean;
  timeLeft: number;
  createdAt?: Date;
  completedAt?: Date;
}

export type CompletedSession = Omit<Session, "createdAt" | "completedAt"> & {
  createdAt: Date;
  completedAt: Date;
};
