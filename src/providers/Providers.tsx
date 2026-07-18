"use client";

/**
 * HeroUI v3 does not require a top-level Provider wrapper.
 * Components from @heroui/react can be used directly.
 *
 * This file is kept as the client boundary for any future providers
 * (e.g. theme, auth state, query client, etc.)
 */

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return <>{children}</>;
}
