// src/components/Header.tsx - PROFISSIONAL
"use client";

import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Wallet, Sun, Moon, Bell, User, Settings, Search } from "lucide-react";

const Header = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="professional-header">
      <div className="header-container">
        {/* Logo e Brand */}
        <div className="brand-section">
          <div className="logo">
            <Wallet className="logo-icon" />
            <span className="logo-text">Finanças</span>
            <span className="logo-pro">Pro</span>
          </div>
        </div>

        {/* Barra de Pesquisa */}
        <div className="search-section">
          <div className="search-container">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Buscar transações, categorias..."
              className="search-input"
            />
          </div>
        </div>

        {/* Ações do Usuário */}
        <div className="actions-section">
          {/* Botão de Tema */}
          <button
            onClick={toggleTheme}
            className="theme-btn"
            aria-label="Alternar tema"
          >
            {isDark ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>

          {/* Notificações */}
          <button className="action-btn notification-btn">
            <Bell className="w-5 h-5" />
            <span className="notification-badge">3</span>
          </button>

          {/* Configurações */}
          <button className="action-btn">
            <Settings className="w-5 h-5" />
          </button>

          {/* Perfil do Usuário */}
          <div className="user-profile">
            <div className="avatar">
              <User className="w-6 h-6" />
            </div>
            <div className="user-info">
              <span className="user-name">Usuário</span>
              <span className="user-role">Premium</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
