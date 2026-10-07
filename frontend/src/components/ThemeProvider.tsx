"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

type Props = React.PropsWithChildren<
  React.ComponentProps<typeof NextThemesProvider>
>;

const Provider = NextThemesProvider as React.ComponentType<Props>;

export default function ThemeProvider({ children, ...props }: Props) {
  return <Provider {...props}>{children}</Provider>;
}
