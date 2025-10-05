// src/components/Header.tsx
// ✅ DIRETIVA USE CLIENT - OBRIGATÓRIO para hooks no App Router
"use client";

// Importa React para criar componente
import React from "react";

// Importa hook customizado para usar contexto de tema
// ✅ useTheme PARA ACESSAR ESTADO GLOBAL DE TEMA
import { useTheme } from "@/contexts/ThemeContext";

// Componente Header: cabeçalho da aplicação com toggle de tema
// ✅ CLIENT COMPONENT por causa dos hooks (use client acima)
const Header = () => {
  // Usa hook customizado para acessar contexto de tema
  // ✅ DESTRUCTURING para acessar estado e função do tema
  const { darkMode, toggleDarkMode } = useTheme();

  // Retorna JSX do componente
  // ✅ JSX COM DADOS PROCESSADOS E HOOKS
  return (
    // Elemento header HTML com classes Tailwind para layout
    // ✅ POSITION STICKY para fixar no topo
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 shadow-lg sticky top-0 z-100">
      {/* Container flexível para alinhar itens */}
      // ✅ FLEXBOX PARA ALINHAR TÍTULO E BOTÃO
      <div className="container mx-auto flex justify-between items-center">
        {/* Título principal da aplicação com emoji de dinheiro */}
        // ✅ TÍTULO SEMÂNTICO COM EMOJI PARA UX
        <h1 className="text-2xl font-bold flex items-center gap-2">
          💰 Minhas Finanças
        </h1>
        {/* Botão para alternar modo claro/escuro - POSICIONADO À DIREITA */}
        // ✅ BOTÃO DE TOGGLE POSICIONADO À DIREITA COM FLEXBOX
        <button
          type="button" // Tipo de botão explícito (boa prática)
          id="toggle-theme" // ID para estilização
          onClick={toggleDarkMode} // Quando clicado, chama função do contexto
          className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200 flex items-center justify-center"
          aria-label={
            darkMode ? "Alternar para modo claro" : "Alternar para modo escuro"
          }
        >
          {/* Operador ternário: mostra ícone diferente baseado no modo atual */}
          // ✅ ÍCONE DINÂMICO BASEADO NO ESTADO
          {darkMode ? "☀️" : "🌙"} {/* Sol se darkMode=true, lua se false */}
        </button>
      </div>
    </header>
  );
};

// Exporta o componente para ser usado em outros arquivos
// ✅ EXPORTAÇÃO PADRÃO PARA REUTILIZAÇÃO
export default Header;
