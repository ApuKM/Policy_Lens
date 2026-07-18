import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mongodb",
  }),

  /**
   * Email + password authentication.
   * Additional providers (e.g. GitHub, Google) can be added under `socialProviders`.
   */
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // set to true when email transport is configured
  },

  /**
   * Session configuration.
   * Defaults: 7-day expiry, rolling sessions enabled.
   */
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days in seconds
    updateAge: 60 * 60 * 24,      // refresh session if older than 1 day
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,             // client-side cookie cache for 5 minutes
    },
  },

  /**
   * Trust the X-Forwarded-Host header when running behind a reverse proxy
   * (e.g. Vercel, Railway, etc.). Set to false for localhost-only development.
   */
  trustedOrigins: [process.env.BETTER_AUTH_URL ?? "http://localhost:3000"],
});

export type Auth = typeof auth;
