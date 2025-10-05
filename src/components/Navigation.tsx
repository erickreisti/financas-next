// src/components/Navigation.tsx
// ✅ DIRETIVA USE CLIENT - OBRIGATÓRIO para hooks do React Router
"use client";

// Importa React para criar componente
import React from "react";

// Importa hooks do React Router para navegação
// ✅ Link PARA NAVEGAÇÃO CLIENT-SIDE (sem reload)
// ✅ usePathname PARA OBTER CAMINHO ATUAL
import Link from "next/link";
import { usePathname } from "next/navigation";

// Componente de navegação entre páginas
// ✅ CLIENT COMPONENT por causa dos hooks (use client acima)
export default function Navigation() {
  // Hook para obter pathname atual (ex: "/", "/transactions", "/reports")
  // ✅ usePathname PARA DESTACAR PÁGINA ATUAL
  const pathname = usePathname();

  // Array com itens de navegação (caminho e rótulo)
  // ✅ ARRAY DE ROTAS PARA MANUTENÇÃO FÁCIL
  const navItems = [
    { path: "/", label: "🏠 Dashboard" },
    { path: "/transactions", label: "📋 Transações" },
    { path: "/reports", label: "📈 Relatórios" },
  ];

  // Retorna JSX do componente
  // ✅ JSX COM DADOS PROCESSADOS E HOOKS
  return (
    // Elemento nav HTML para navegação
    // ✅ NAVIGATION SEMÂNTICA COM BORDA INFERIOR
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      {/* Container flexível para itens de menu */}
      // ✅ CONTAINER RESPONSIVO COM MAX-WIDTH E PADDING
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Flex container para itens de navegação */}
        // ✅ FLEXBOX PARA ALINHAR ITENS DE NAVEGAÇÃO
        <div className="flex justify-between h-16">
          {/* Seção esquerda da navegação */}
          // ✅ FLEX-SHRINK-0 PARA EVITAR ENCOLHER LOGO
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              {/* Logo da aplicação */}
              // ✅ LOGO COM EMOJI PARA IDENTIFICAÇÃO
              <span className="font-bold text-xl">💰</span>
            </div>
            {/* Menu de navegação em desktop */}
            // ✅ SM:ML-6 PARA MARGEM EM DESKTOP // ✅ SM:FLEX PARA MOSTRAR EM
            DESKTOP // ✅ SM:SPACE-X-8 PARA ESPAÇO ENTRE ITENS
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {/* Mapeia itens de navegação para elementos JSX */}
              // ✅ MAP PARA RENDERIZAR ITENS DINAMICAMENTE
              {navItems.map((item) => (
                // Cada item de menu com key única (importante para React)
                // ✅ KEY ÚNICA PARA PERFORMANCE DO REACT
                <Link
                  key={item.path} // ✅ KEY BASEADA NO CAMINHO ÚNICO
                  href={item.path} // Caminho da rota
                  // Classe CSS dinâmica baseada na rota atual
                  // ✅ CLASSE DINÂMICA PARA DESTACAR PÁGINA ATUAL
                  className={`${
                    pathname === item.path
                      ? "border-indigo-500 text-gray-900 dark:text-white" // Ativo
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100" // Inativo
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  {item.label} {/* Texto do link */}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
