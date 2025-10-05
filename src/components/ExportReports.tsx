// src/components/ExportReports.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, FileText, PieChart, BarChart3, X } from "lucide-react";

const ExportReports = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState<"pdf" | "excel" | "csv">(
    "pdf"
  );
  const [reportType, setReportType] = useState<
    "summary" | "detailed" | "analytics"
  >("summary");

  const exportOptions = [
    {
      value: "pdf",
      label: "PDF",
      description: "Relatório formatado para impressão",
      icon: FileText,
    },
    {
      value: "excel",
      label: "Excel",
      description: "Dados em planilha editável",
      icon: BarChart3,
    },
    {
      value: "csv",
      label: "CSV",
      description: "Dados brutos para análise",
      icon: PieChart,
    },
  ];

  const reportTypes = [
    {
      value: "summary",
      label: "Resumo Executivo",
      description: "Visão geral das finanças",
    },
    {
      value: "detailed",
      label: "Relatório Detalhado",
      description: "Todas as transações com análises",
    },
    {
      value: "analytics",
      label: "Análises Avançadas",
      description: "Métricas e tendências",
    },
  ];

  const handleExport = () => {
    console.log(`Exportando ${reportType} em formato ${exportFormat}`);
    setIsOpen(false);
    // Aqui você implementaria a lógica real de exportação
  };

  return (
    <div className="export-reports">
      <button onClick={() => setIsOpen(true)} className="export-trigger">
        <Download className="w-4 h-4" />
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
              <div className="modal-header">
                <h3 className="modal-title">Exportar Relatório</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="modal-close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="modal-content">
                {/* Formato de Exportação */}
                <div className="export-section">
                  <h4 className="section-title">Formato do Arquivo</h4>
                  <div className="format-grid">
                    {exportOptions.map((option) => {
                      const Icon = option.icon;
                      return (
                        <button
                          key={option.value}
                          onClick={() => setExportFormat(option.value as any)}
                          className={`format-option ${exportFormat === option.value ? "active" : ""}`}
                        >
                          <div className="format-icon">
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="format-content">
                            <span className="format-label">{option.label}</span>
                            <span className="format-description">
                              {option.description}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Tipo de Relatório */}
                <div className="export-section">
                  <h4 className="section-title">Tipo de Relatório</h4>
                  <div className="report-type-grid">
                    {reportTypes.map((type) => (
                      <button
                        key={type.value}
                        onClick={() => setReportType(type.value as any)}
                        className={`report-type ${reportType === type.value ? "active" : ""}`}
                      >
                        <div className="report-type-content">
                          <span className="report-type-label">
                            {type.label}
                          </span>
                          <span className="report-type-description">
                            {type.description}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Período */}
                <div className="export-section">
                  <h4 className="section-title">Período</h4>
                  <div className="period-selector">
                    <select className="period-select">
                      <option value="30d">Últimos 30 dias</option>
                      <option value="90d">Últimos 90 dias</option>
                      <option value="1y">Último ano</option>
                      <option value="custom">Personalizado</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  onClick={() => setIsOpen(false)}
                  className="btn-secondary"
                >
                  Cancelar
                </button>
                <button onClick={handleExport} className="btn-primary">
                  <Download className="w-4 h-4" />
                  Exportar Relatório
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExportReports;
