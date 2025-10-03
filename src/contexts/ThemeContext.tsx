// src/contexts/ThemeContext.tsx
// ✅ DIRETIVA USE CLIENT - marca arquivo como Client Component
// Isso é OBRIGATÓRIO para arquivos que usam React Hooks no App Router
"use client";

// Importa React e hooks necessários para criar contexto de tema
// createContext: cria contexto para compartilhar dados globalmente
// useContext: hook para consumir dados de um contexto
// useState: hook para gerenciar estado local
// useEffect: hook para efeitos colaterais (carregar/salvar dados)
import React, { createContext, useContext, useState, useEffect } from "react";

// Interface para definir o que o contexto de tema vai fornecer
// ✅ CONTRATO EXPLÍCITO DO QUE O CONTEXTO DE TEMA OFERECE
interface ThemeContextType {
  darkMode: boolean; // Estado atual do modo escuro
  toggleDarkMode: () => void; // Função para alternar modo escuro
}

// Cria o contexto com valor inicial undefined
// ✅ CRIAÇÃO DO CONTEXTO COM TIPAGEM SEGURA
// O tipo indica que pode ser ThemeContextType ou undefined
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Componente Provider: fornece os dados do contexto para toda árvore de componentes
// ✅ PROVIDER É UM COMPONENTE QUE ENVOLVE OUTROS COMPONENTES
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children, // ✅ children são os componentes filhos que vão usar o contexto
}) => {
  // Estado local para controlar modo escuro (true = dark, false = light)
  // ✅ useState COM TIPAGEM EXPLÍCITA BOOLEAN
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // useEffect: executa quando componente monta (carrega preferência do usuário)
  // ✅ useEffect PARA EFEITOS COLATERAIS (carregar preferências)
  useEffect(() => {
    // Tenta carregar preferência de modo escuro salva no navegador
    // ✅ PERSISTÊNCIA DE PREFERÊNCIAS DO USUÁRIO
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode === "true") {
      // Se estava salvo como true, ativa modo escuro
      // ✅ RESTAURAÇÃO DE ESTADO PERSISTIDO
      setDarkMode(true);
    }
  }, []); // Array vazio = executa só uma vez na montagem

  // useEffect: aplica tema ao body e salva preferência quando darkMode muda
  // ✅ useEffect PARA SINCRONIZAR ESTADO COM DOM E PERSISTÊNCIA
  useEffect(() => {
    if (darkMode) {
      // Adiciona classe 'dark' ao body quando modo escuro está ativo
      // ✅ MANIPULAÇÃO DO DOM PARA APLICAR TEMA
      document.body.classList.add("dark");
    } else {
      // Remove classe 'dark' do body quando modo claro está ativo
      // ✅ MANIPULAÇÃO DO DOM PARA REMOVER TEMA
      document.body.classList.remove("dark");
    }
    // Salva preferência de modo escuro no localStorage
    // ✅ PERSISTÊNCIA DE ESTADO ENTRE SESSÕES
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]); // Executa sempre que darkMode mudar

  // Função para alternar entre modo claro e escuro
  // ✅ FUNÇÃO PURA PARA ALTERAR ESTADO
  const toggleDarkMode = (): void => {
    // Inverte o valor atual do estado darkMode
    // ✅ ATUALIZAÇÃO OTIMISTA DE ESTADO
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  // Objeto com todos os valores que o contexto de tema vai fornecer
  // ✅ VALOR DO CONTEXTO COM TODAS FUNÇÕES E DADOS
  const contextValue: ThemeContextType = {
    darkMode, // Estado atual do modo escuro
    toggleDarkMode, // Função para alternar modo escuro
  };

  // Retorna JSX do componente Provider
  // ✅ PROVIDER ENVOLVE COMPONENTES FILHOS
  return (
    <ThemeContext.Provider value={contextValue}>
      {children} // Componentes filhos que vão usar o contexto de tema
    </ThemeContext.Provider>
  );
};

// Hook customizado para usar o contexto de tema
// ✅ HOOK CUSTOMIZADO PARA FACILITAR USO DO CONTEXTO DE TEMA
export const useTheme = (): ThemeContextType => {
  // Usa hook useContext para acessar o contexto de tema
  // ✅ useContext PARA CONSUMIR DADOS DO CONTEXTO DE TEMA
  const context = useContext(ThemeContext);

  // Verifica se o hook está sendo usado dentro de um ThemeProvider
  // ✅ VERIFICAÇÃO DE ERRO PARA USO CORRETO
  if (context === undefined) {
    // Lança erro se não estiver dentro do Provider
    // ✅ MENSAGEM CLARA PARA DESENVOLVEDOR
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  // Retorna o contexto se estiver tudo certo
  // ✅ RETORNO SEGuro DO CONTEXTO DE TEMA
  return context;
};
