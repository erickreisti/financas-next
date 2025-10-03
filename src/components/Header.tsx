// src/components/Header.tsx
// Diretiva use client - marca componente como Client Component para interatividade
"use client";

// Importa React para criar componente
import React from "react";

// Importa hooks customizados dos contextos
import { useTheme } from "@/contexts/ThemeContext"; // Hook para tema (dark/light mode)

// Componente Header: cabeçalho da aplicação com toggle de tema
const Header = () => {
  // Usa hook customizado para acessar contexto de tema
  // Desestrutura darkMode (estado atual) e toggleDarkMode (função para alternar)
  const { darkMode, toggleDarkMode } = useTheme();

  // Retorna JSX do componente
  return (
    // Elemento header HTML com estilos do Tailwind CSS
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 shadow-lg">
      {/* Container flexível para alinhar itens */}
      <div className="container mx-auto flex justify-between items-center">
        {/* Título da aplicação com emoji de dinheiro */}
        <h1 className="text-2xl font-bold flex items-center gap-2">
          💰 Minhas Finanças
        </h1>

        {/* Botão para alternar modo claro/escuro */}
        <button
          // Tipo de botão explícito (boa prática)
          type="button"
          // ID para estilização e identificação
          id="toggle-theme"
          // Evento onClick chamando função do contexto
          onClick={toggleDarkMode}
          // Estilos do Tailwind CSS para botão
          className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200 flex items-center justify-center"
          // Atributo aria-label para acessibilidade
          aria-label={
            darkMode ? "Alternar para modo claro" : "Alternar para modo escuro"
          }
        >
          {/* Operador ternário: mostra ícone diferente baseado no modo atual */}
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </header>
  );
};

// Exporta componente para ser usado em outros arquivos
export default Header;
