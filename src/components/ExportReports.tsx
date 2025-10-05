// src/components/ExportReports.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  FileText,
  PieChart,
  BarChart3,
  X,
  Calendar,
  FileSpreadsheet,
  TrendingUp,
  Check,
} from "lucide-react";

const ExportReports = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState<"pdf" | "excel" | "csv">(
    "pdf"
  );
  const [reportType, setReportType] = useState<
    "summary" | "detailed" | "analytics"
  >("summary");
  const [period, setPeriod] = useState<"30d" | "90d" | "1y" | "custom">("30d");

  const exportOptions = [
    {
      value: "pdf",
      label: "PDF Document",
      description: "Relatório formatado para impressão e compartilhamento",
      icon: FileText,
      features: ["Layout profissional", "Pronto para impressão", "Grátis"],
    },
    {
      value: "excel",
      label: "Excel Spreadsheet",
      description: "Dados completos em planilha editável",
      icon: FileSpreadsheet,
      features: ["Dados editáveis", "Fórmulas incluídas", "Análise avançada"],
    },
    {
      value: "csv",
      label: "CSV Data",
      description: "Dados brutos para análise externa",
      icon: PieChart,
      features: ["Formato universal", "Leve e rápido", "Compatível"],
    },
  ];

  const reportTypes = [
    {
      value: "summary",
      label: "Resumo Executivo",
      description: "Visão geral das finanças com KPIs principais",
      icon: BarChart3,
      details: "Métricas resumidas, gráficos principais, insights",
    },
    {
      value: "detailed",
      label: "Relatório Detalhado",
      description: "Todas as transações com análises completas",
      icon: FileText,
      details: "Transações completas, categorias, tendências",
    },
    {
      value: "analytics",
      label: "Análises Avançadas",
      description: "Métricas detalhadas e projeções",
      icon: TrendingUp,
      details: "Análise preditiva, comparações, insights",
    },
  ];

  const periods = [
    {
      value: "30d",
      label: "Últimos 30 Dias",
      description: "Análise do mês atual",
    },
    { value: "90d", label: "Últimos 90 Dias", description: "Visão trimestral" },
    { value: "1y", label: "Último Ano", description: "Análise anual completa" },
    {
      value: "custom",
      label: "Período Personalizado",
      description: "Selecione datas específicas",
    },
  ];

  const handleExport = () => {
    console.log(
      `Exportando ${reportType} em formato ${exportFormat} para período ${period}`
    );
    setIsOpen(false);
    // Aqui você implementaria a lógica real de exportação
  };

  return (
    <div className="export-reports">
      <button onClick={() => setIsOpen(true)} className="export-trigger-btn">
        <Download className="btn-icon" />
        <span>Exportar Relatório</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="export-modal"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="modal-header">
                <div className="header-content">
                  <div className="header-icon">
                    <Download className="icon" />
                  </div>
                  <div className="header-text">
                    <h3 className="modal-title">Exportar Relatório</h3>
                    <p className="modal-subtitle">
                      Selecione as opções para gerar seu relatório personalizado
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="modal-close-btn"
                >
                  <X className="icon" />
                </button>
              </div>

              <div className="modal-content">
                {/* Formato de Exportação */}
                <div className="export-section">
                  <div className="section-header">
                    <h4 className="section-title">Formato do Arquivo</h4>
                    <p className="section-description">
                      Escolha o formato que melhor atende suas necessidades
                    </p>
                  </div>
                  <div className="format-grid">
                    {exportOptions.map((option) => {
                      const Icon = option.icon;
                      const isActive = exportFormat === option.value;

                      return (
                        <motion.button
                          key={option.value}
                          onClick={() => setExportFormat(option.value as any)}
                          className={`format-card ${isActive ? "active" : ""}`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="format-card-content">
                            <div className="format-header">
                              <div
                                className={`format-icon ${isActive ? "active" : ""}`}
                              >
                                <Icon className="icon" />
                              </div>
                              {isActive && (
                                <motion.div
                                  className="active-badge"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                >
                                  <Check className="check-icon" />
                                </motion.div>
                              )}
                            </div>

                            <div className="format-body">
                              <h5 className="format-label">{option.label}</h5>
                              <p className="format-description">
                                {option.description}
                              </p>

                              <div className="features-list">
                                {option.features.map((feature, index) => (
                                  <span key={index} className="feature-tag">
                                    {feature}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Tipo de Relatório */}
                <div className="export-section">
                  <div className="section-header">
                    <h4 className="section-title">Tipo de Relatório</h4>
                    <p className="section-description">
                      Selecione o nível de detalhe desejado
                    </p>
                  </div>
                  <div className="report-type-grid">
                    {reportTypes.map((type) => {
                      const Icon = type.icon;
                      const isActive = reportType === type.value;

                      return (
                        <motion.button
                          key={type.value}
                          onClick={() => setReportType(type.value as any)}
                          className={`report-type-card ${isActive ? "active" : ""}`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="report-type-content">
                            <div className="report-type-header">
                              <div
                                className={`report-type-icon ${isActive ? "active" : ""}`}
                              >
                                <Icon className="icon" />
                              </div>
                              {isActive && (
                                <div className="selection-indicator" />
                              )}
                            </div>

                            <div className="report-type-body">
                              <h5 className="report-type-label">
                                {type.label}
                              </h5>
                              <p className="report-type-description">
                                {type.description}
                              </p>
                              <div className="report-details">
                                <span className="details-text">
                                  {type.details}
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Período */}
                <div className="export-section">
                  <div className="section-header">
                    <h4 className="section-title">Período de Análise</h4>
                    <p className="section-description">
                      Defina o intervalo de tempo para o relatório
                    </p>
                  </div>
                  <div className="period-grid">
                    {periods.map((periodOption) => {
                      const isActive = period === periodOption.value;

                      return (
                        <motion.button
                          key={periodOption.value}
                          onClick={() => setPeriod(periodOption.value as any)}
                          className={`period-card ${isActive ? "active" : ""}`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="period-card-content">
                            <div className="period-icon">
                              <Calendar className="icon" />
                            </div>
                            <div className="period-info">
                              <span className="period-label">
                                {periodOption.label}
                              </span>
                              <span className="period-description">
                                {periodOption.description}
                              </span>
                            </div>
                            {isActive && (
                              <motion.div
                                className="period-indicator"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                              />
                            )}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="modal-footer">
                <div className="footer-content">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="btn btn-secondary"
                  >
                    Cancelar
                  </button>
                  <motion.button
                    onClick={handleExport}
                    className="btn btn-primary"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Download className="btn-icon" />
                    <span>Gerar Relatório</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExportReports;
