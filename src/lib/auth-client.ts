import { createAuthClient } from "better-auth/react";

/**
 * Client-side Better Auth instance.
 *
 * Usage in Client Components:
 *   const { data: session, isPending } = authClient.useSession();
 *   await authClient.signIn.email({ email, password });
 *   await authClient.signOut();
 */
export const authClient = createAuthClient({
  // Point the client at the Better Auth HTTP handler route so sign-in/out
  // requests are sent to the correct API endpoint.
  baseURL: (process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000") + "/api/auth",
});

export type Session = typeof authClient.$Infer.Session;
