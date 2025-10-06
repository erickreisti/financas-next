// src/components/Sidebar.tsx - ATUALIZADO
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BarChart3,
  CreditCard,
  PieChart,
  Settings,
  HelpCircle,
  Download,
  Target,
} from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: Home,
      badge: null,
    },
    {
      name: "Transações",
      href: "/transactions",
      icon: CreditCard,
      badge: "12",
    },
    {
      name: "Relatórios",
      href: "/reports",
      icon: BarChart3,
      badge: null,
    },
    {
      name: "Metas",
      href: "/goals",
      icon: Target,
      badge: "2",
    },
    {
      name: "Orçamentos",
      href: "/budgets",
      icon: PieChart,
      badge: null,
    },
    {
      name: "Exportar",
      href: "/export",
      icon: Download,
      badge: null,
    },
  ];

  const secondaryItems = [
    {
      name: "Configurações",
      href: "/settings",
      icon: Settings,
    },
    {
      name: "Ajuda",
      href: "/help",
      icon: HelpCircle,
    },
  ];

  return (
    <aside className="professional-sidebar">
      <div className="sidebar-content">
        {/* Menu Principal */}
        <nav className="main-nav">
          <div className="nav-section">
            <h3 className="nav-section-title">PRINCIPAL</h3>
            <ul className="nav-list">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`nav-item ${isActive ? "nav-item-active" : ""}`}
                    >
                      <div className="nav-item-content">
                        <Icon className="nav-icon" />
                        <span className="nav-text">{item.name}</span>
                      </div>
                      {item.badge && (
                        <span className="nav-badge">{item.badge}</span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Menu Secundário */}
          <div className="nav-section">
            <h3 className="nav-section-title">GERAL</h3>
            <ul className="nav-list">
              {secondaryItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`nav-item ${isActive ? "nav-item-active" : ""}`}
                    >
                      <div className="nav-item-content">
                        <Icon className="nav-icon" />
                        <span className="nav-text">{item.name}</span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/* Status do Sistema */}
        <div className="sidebar-footer">
          <div className="system-status">
            <div className="status-indicator"></div>
            <span className="status-text">Sistema Online</span>
          </div>
          <div className="storage-info">
            <div className="storage-bar">
              <div className="storage-progress" style={{ width: "65%" }}></div>
            </div>
            <span className="storage-text">65% usado</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
