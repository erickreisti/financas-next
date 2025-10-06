// src/app/page.tsx - ATUALIZADO
import React from "react";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";

export default function Home() {
  return (
    <div className="home-container">
      <Header />
      <Navigation />

      <main className="home-main">
        <div className="hero-section">
          <h1 className="hero-title">💰 Finanças Pro</h1>
          <p className="hero-subtitle">
            Controle suas finanças de forma inteligente e simplificada
          </p>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h2 className="feature-title">Dashboard Completo</h2>
              <p className="feature-description">
                Visualize todas as suas métricas financeiras em um só lugar com
                gráficos interativos e relatórios detalhados.
              </p>
              <a href="/dashboard" className="feature-link">
                Acessar Dashboard
                <span>→</span>
              </a>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📋</div>
              <h2 className="feature-title">Gestão de Transações</h2>
              <p className="feature-description">
                Adicione, edite e categorize suas receitas e despesas com
                interface intuitiva e busca avançada.
              </p>
              <a href="/transactions" className="feature-link">
                Ver Transações
                <span>→</span>
              </a>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📈</div>
              <h2 className="feature-title">Relatórios Avançados</h2>
              <p className="feature-description">
                Análises detalhadas por categoria, tendências temporais e
                insights para melhorar suas finanças.
              </p>
              <a href="/reports" className="feature-link">
                Ver Relatórios
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
