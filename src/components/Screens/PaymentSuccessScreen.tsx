import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Invoice } from '../../types';

interface PaymentSuccessScreenProps {
  invoice: Invoice;
  onReturnHome: () => void;
}

export const PaymentSuccessScreen: React.FC<PaymentSuccessScreenProps> = ({
  invoice,
  onReturnHome,
}) => {
  const [copiedId, setCopiedId] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const transactionId = invoice.transactionId || 'E92817401928';

  useEffect(() => {
    // Launch celebratory confetti burst
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#d0f03b', '#4ADE80', '#ffffff'],
    });
  }, []);

  const handleCopyId = () => {
    navigator.clipboard?.writeText(transactionId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleDownloadPdf = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      // Create and trigger download of receipt text
      const receiptContent = `=========================================
BLACKCAR LOCADORA DE VEÍCULOS S/A
COMPROVANTE DE QUITAÇÃO DE FATURA
=========================================
STATUS: LIQUIDADO
DATA/HORA: 03 nov às 14:32
VALOR: ${invoice.amountFormatted}
VEÍCULO: ${invoice.plate} (${invoice.vehicleModel})
PERÍODO: ${invoice.period}
CONTRATO: ${invoice.contractId}
MÉTODO: PIX INSTANTÂNEO
ID TRANSAÇÃO: ${transactionId}
AUTENTICAÇÃO: BC-AUT-9841280
=========================================
Assinado digitalmente por BlackCar Mobility Platform
Ambiente de Liquidação 100% Criptografado
=========================================`;

      const blob = new Blob([receiptContent], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `comprovante-blackcar-${invoice.plate}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 800);
  };

  return (
    <div className="flex flex-col w-full px-4 pt-10 pb-12 max-w-[410px] mx-auto min-h-screen justify-between select-none">
      <div>
        {/* Top Celebration Block */}
        <div className="flex flex-col items-center text-center mt-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-[#12231A] border border-[#4ADE80]/30 flex items-center justify-center mb-4 shadow-sm">
            <span
              className="material-symbols-outlined text-[#4ADE80] text-[32px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
          </div>

          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#4ADE80] bg-[#12231A] border border-[#4ADE80]/20 px-3.5 py-1 rounded-full mb-2 font-geist">
            Operação Confirmada
          </span>

          <h1 className="text-[20px] font-semibold text-[#e3e2e5] font-geist">
            Fatura paga
          </h1>

          <div className="mt-2 mb-1">
            <span className="text-[32px] font-semibold text-white tracking-tight font-geist tabular-nums">
              {invoice.amountFormatted}
            </span>
          </div>

          <p className="text-[12px] text-[#c6c6c7] font-body">
            03 nov às 14:32
          </p>
        </div>

        {/* Invoice Receipt Spec Card */}
        <div className="flex flex-col w-full bg-[#181A1F] rounded-xl p-4 shadow-md mb-4 border border-[#2A2E37]/80">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#1F2228]">
            <span className="text-[12px] text-[#c6c6c7] font-body">Status</span>
            <span className="text-[11px] font-semibold text-[#4ADE80] bg-[#12231A] border border-[#4ADE80]/20 px-2.5 py-0.5 rounded font-geist">
              Liquidado
            </span>
          </div>

          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#1F2228]">
            <span className="text-[12px] text-[#c6c6c7] font-body">Veículo / Placa</span>
            <span className="text-[14px] text-white font-mono font-medium">{invoice.plate}</span>
          </div>

          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#1F2228]">
            <span className="text-[12px] text-[#c6c6c7] font-body">Período de locação</span>
            <span className="text-[13px] text-[#e3e2e5] font-body">Semana {invoice.period}</span>
          </div>

          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#1F2228]">
            <span className="text-[12px] text-[#c6c6c7] font-body">Método de pagamento</span>
            <span className="text-[13px] text-[#e3e2e5] flex items-center gap-1.5 font-body">
              <span className="material-symbols-outlined text-[16px] text-[#c6c6c7]">
                account_balance_wallet
              </span>
              PIX Instantâneo
            </span>
          </div>

          <div className="flex flex-col pt-1">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] text-[#c6c6c7] font-body">ID da transação</span>
              <button
                type="button"
                onClick={handleCopyId}
                className="flex items-center gap-1 text-[11px] font-medium text-[#d0f03b] hover:opacity-80 transition-opacity cursor-pointer font-geist"
              >
                <span className="material-symbols-outlined text-[14px]">content_copy</span>
                <span>{copiedId ? 'Copiado!' : 'Copiar'}</span>
              </button>
            </div>
            <div className="bg-[#121316] rounded-lg p-2.5 flex items-center justify-between border border-[#2A2E37]/60">
              <code className="text-[12px] text-[#c6c6c7] font-mono tracking-wider select-all">
                {transactionId}
              </code>
              <span className="material-symbols-outlined text-[#c6c6c7] text-[16px]">
                fingerprint
              </span>
            </div>
          </div>
        </div>

        {/* Digital Receipt Download Card */}
        <div className="flex items-center justify-between bg-[#121316] border border-[#2A2E37]/80 rounded-xl p-3.5 mb-6">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-[#181A1F] flex items-center justify-center shrink-0 border border-[#2A2E37]/60">
              <span className="material-symbols-outlined text-[#c6c6c7] text-[20px]">
                receipt_long
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[14px] text-[#e3e2e5] font-medium truncate font-body">
                Comprovante de quitação
              </span>
              <span className="text-[11px] text-[#c6c6c7] font-body">PDF digital assinado</span>
            </div>
          </div>
          <button
            type="button"
            aria-label="Baixar Comprovante"
            onClick={handleDownloadPdf}
            className="w-10 h-10 rounded-lg bg-[#181A1F] hover:bg-[#292a2c] flex items-center justify-center text-white active:scale-95 transition-transform shrink-0 border border-[#2A2E37] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">
              {downloading ? 'sync' : 'download'}
            </span>
          </button>
        </div>
      </div>

      {/* Return to Home CTA */}
      <div className="w-full mt-auto">
        <button
          type="button"
          onClick={onReturnHome}
          className="w-full h-[52px] bg-[#d0f03b] text-[#181e00] font-semibold text-[16px] rounded-xl flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-transform hover:brightness-105 cursor-pointer font-geist"
        >
          <span>Voltar ao início</span>
          <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};
