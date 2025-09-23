// src/components/Navigation.tsx
// Adicionar diretiva use client no topo do arquivo
"use client";

// Importa hooks do React Router
import Link from "next/link";
import { usePathname } from "next/navigation";

// Componente de navegação
export default function Navigation() {
  // Hook para obter pathname atual
  const pathname = usePathname();

  // Array com itens de navegação
  const navItems = [
    { path: "/", label: "🏠 Dashboard" },
    { path: "/transactions", label: "📋 Transações" },
    { path: "/reports", label: "📈 Relatórios" },
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="font-bold text-xl">💰</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`${
                    pathname === item.path
                      ? "border-indigo-500 text-gray-900 dark:text-white"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
