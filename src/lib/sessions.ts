import type { CompletedSession, Session } from "@/types";

/**
 * Marks session as completed
 * @param {Session} session - The finished session.
 * @returns {CompletedSession} Session is marked complete by setting the `completedAt` property.
 */
export function completeSession(
  session: Session,
  completedAt = new Date(),
): CompletedSession {
  const completedSessions: CompletedSession = {
    ...(session as CompletedSession),
    completedAt,
  };

  return completedSessions;
}
