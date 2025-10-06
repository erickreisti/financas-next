// src/components/Navigation.tsx - ATUALIZADO
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, BarChart3 } from "lucide-react";

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { path: "/", label: "Dashboard", icon: Home },
    { path: "/transactions", label: "Transações", icon: FileText },
    { path: "/reports", label: "Relatórios", icon: BarChart3 },
  ];

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link href="/" className="nav-brand">
          <span className="text-gradient">💰 Finanças Pro</span>
        </Link>

        <div className="nav-links">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`nav-link ${isActive ? "nav-link-active" : ""}`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
