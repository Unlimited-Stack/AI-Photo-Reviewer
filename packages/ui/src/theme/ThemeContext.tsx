import React, { createContext, useContext, useState, useMemo } from "react";
import { useColorScheme } from "react-native";

export type ThemeMode = "system" | "light" | "dark";

export interface ThemeColors {
  bg: string;
  text: string;
  subtitle: string;
  accent: string;
  tabBarBg: string;
  pillColor: string;
  switcherBg: string;
  switcherBorder: string;
}

const LIGHT: ThemeColors = {
  bg: "#FFFFFF",
  text: "#333333",
  subtitle: "#999999",
  accent: "#FF2D55",
  tabBarBg: "rgba(245,245,245,0.93)",
  pillColor: "rgba(255,255,255,0.38)",
  switcherBg: "rgba(120,120,128,0.12)",
  switcherBorder: "rgba(60,60,67,0.18)",
};

const DARK: ThemeColors = {
  bg: "#1C1C1E",
  text: "#FFFFFF",
  subtitle: "#8E8E93",
  accent: "#FF375F",
  tabBarBg: "rgba(28,28,30,0.93)",
  pillColor: "rgba(80,80,80,0.50)",
  switcherBg: "rgba(120,120,128,0.24)",
  switcherBorder: "rgba(255,255,255,0.12)",
};

interface ThemeContextValue {
  mode: ThemeMode;
  setMode: (m: ThemeMode) => void;
  colors: ThemeColors;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextValue>({
  mode: "system",
  setMode: () => {},
  colors: LIGHT,
  isDark: false,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>("system");

  const isDark = useMemo(() => {
    if (mode === "dark") return true;
    if (mode === "light") return false;
    return systemScheme === "dark";
  }, [mode, systemScheme]);

  const colors = isDark ? DARK : LIGHT;

  return (
    <ThemeContext.Provider value={{ mode, setMode, colors, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}
