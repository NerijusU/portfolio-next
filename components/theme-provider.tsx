"use client";

import type { PropsWithChildren } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Provides theme context for client components.
 * @param {PropsWithChildren<React.ComponentProps<typeof NextThemesProvider>>} props - Theme provider props and children.
 * @returns {JSX.Element} The wrapped children with theme context.
 */
export function ThemeProvider({
  children,
  ...props
}: PropsWithChildren<React.ComponentProps<typeof NextThemesProvider>>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
