"use client";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1f8a9d",
      dark: "#146f7f",
      light: "#5eb3c1",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#5a6b7d",
    },
    text: {
      primary: "#152433",
      secondary: "#5a6b7d",
    },
    background: {
      default: "#eef4f8",
      paper: "rgba(255,255,255,0.72)",
    },
  },
  typography: {
    fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
    h1: { fontFamily: "var(--font-syne), Syne, sans-serif" },
    h2: { fontFamily: "var(--font-syne), Syne, sans-serif" },
    h3: { fontFamily: "var(--font-syne), Syne, sans-serif" },
    h4: { fontFamily: "var(--font-syne), Syne, sans-serif" },
    h5: { fontFamily: "var(--font-syne), Syne, sans-serif" },
    h6: { fontFamily: "var(--font-syne), Syne, sans-serif" },
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 999 },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
});

export default function AppTheme({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
