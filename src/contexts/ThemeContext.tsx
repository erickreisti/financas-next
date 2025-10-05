// src/contexts/ThemeContext.tsx
// ✅ DIRETIVA USE CLIENT - OBRIGATÓRIO para hooks no App Router
"use client";

// Importa React e hooks necessários para criar contexto de tema
import React, { createContext, useContext, useState, useEffect } from "react";

// ✅ INTERFACE PARA DEFINIR O QUE O CONTEXTO DE TEMA VAI FORNECER
interface ThemeContextType {
  darkMode: boolean; // Estado atual do modo escuro
  toggleDarkMode: () => void; // Função para alternar modo escuro
}

// ✅ CRIA CONTEXTO DE TEMA COM VALOR INICIAL UNDEFINED
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// ✅ COMPONENTE PROVIDER - FORNECE DADOS DE TEMA PARA ÁRVORE DE COMPONENTES
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children, // Componentes filhos que vão usar o tema
}) => {
  // ✅ ESTADO LOCAL PARA MODO ESCURO COM TIPAGEM EXPLÍCITA
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // ✅ useEffect: CARREGA PREFERÊNCIA DO USUÁRIO NA MONTAGEM
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode === "true") {
      setDarkMode(true);
    }
  }, []); // Executa só uma vez na montagem

  // ✅ useEffect: APLICA TEMA AO BODY E SALVA PREFERÊNCIA QUANDO darkMode MUDA
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]); // Executa sempre que darkMode mudar

  // ✅ FUNÇÃO PARA ALTERNAR MODO CLARO/ESCURO
  const toggleDarkMode = (): void => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  // ✅ VALOR DO CONTEXTO DE TEMA COM TODAS FUNÇÕES E DADOS
  const contextValue: ThemeContextType = {
    darkMode, // Estado atual do modo escuro
    toggleDarkMode, // Função para alternar modo escuro
  };

  // ✅ RETORNA JSX DO PROVIDER DE TEMA
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// ✅ HOOK CUSTOMIZADO PARA USAR O CONTEXTO DE TEMA
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  // ✅ VERIFICA SE HOOK ESTÁ SENDO USADO DENTRO DE UM PROVIDER
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  // ✅ RETORNA O CONTEXTO SE ESTIVER TUDO CERTO
  return context;
};
