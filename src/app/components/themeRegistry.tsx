"use client";

import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "../createEmotionCache";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../theme";

const clientSideEmotionCache = createEmotionCache();

export default function EmotionThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
