// ALTERNATIVA: src/contexts/ThemeContext.tsx - VERSÃO MAIS ROBUSTA
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);

    try {
      // Verificar preferência salva
      const savedTheme = localStorage.getItem("theme");

      if (savedTheme) {
        const isDarkMode = savedTheme === "dark";
        setIsDark(isDarkMode);
        if (isDarkMode) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      } else {
        // Verificar preferência do sistema
        const systemPrefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        if (systemPrefersDark) {
          setIsDark(true);
          document.documentElement.classList.add("dark");
        }
      }
    } catch (error) {
      console.error("Erro ao carregar tema:", error);
    }
  }, []);

  const toggleTheme = () => {
    try {
      const newTheme = !isDark;
      setIsDark(newTheme);

      if (newTheme) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    } catch (error) {
      console.error("Erro ao alternar tema:", error);
    }
  };

  // Durante SSR, renderizar sem tema para evitar hidratação inconsistente
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  return useContext(ThemeContext);
};
