// src/components/Header.tsx - ATUALIZADO
"use client";

import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Wallet, Sun, Moon } from "lucide-react";

const Header = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="app-header">
      <div className="header-content">
        <h1 className="header-title">
          <Wallet className="w-6 h-6" />
          Minhas Finanças
        </h1>

        <button
          onClick={toggleTheme}
          className="theme-toggle"
          aria-label={
            isDark ? "Alternar para modo claro" : "Alternar para modo escuro"
          }
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </header>
  );
};

export default Header;
