import React, { useState } from 'react';

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  period?: string;
  amount?: string;
  date?: string;
  transactionId?: string;
  vehicle?: string;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  isOpen,
  onClose,
  period = '18 out – 25 out',
  amount = 'R$ 550,00',
  date = '18 out',
  transactionId = 'E27491028472910',
  vehicle = 'Fiat Cronos Drive 1.3 (BRA2E19)',
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleShare = () => {
    navigator.clipboard?.writeText(
      `Comprovante BlackCar: Locação ${period} - ${amount} - Transação ${transactionId}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-md transition-opacity duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-[390px] bg-[#1F2228] rounded-t-2xl p-6 shadow-2xl flex flex-col gap-4 animate-in slide-in-from-bottom duration-300 relative border-t border-[#2A2E37]">
        {/* Grab Handle */}
        <div className="w-10 h-1 bg-[#343537] rounded-full mx-auto -mt-2 mb-2" />

        {/* Header row */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#12231A] text-[#4ADE80] uppercase tracking-wider flex items-center gap-1 font-geist">
            <span className="material-symbols-outlined text-[14px]">check_circle</span>
            Transação Concluída
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="w-8 h-8 rounded-full bg-[#181A1F] flex items-center justify-center text-[#c6c6c7] hover:text-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Hero Value */}
        <div className="text-center py-1">
          <span className="text-[11px] font-medium text-[#c6c6c7] uppercase tracking-wider font-body">
            Comprovante de Pagamento
          </span>
          <div className="text-[28px] font-semibold text-white tracking-tight mt-1 font-geist tabular-nums">
            {amount}
          </div>
          <span className="text-[12px] text-[#4ADE80] font-body">
            Pago em {date}
          </span>
        </div>

        {/* Details List */}
        <div className="bg-[#181A1F] rounded-xl p-4 flex flex-col gap-3 text-[14px] border border-[#2A2E37]/60">
          <div className="flex justify-between items-center py-0.5">
            <span className="text-[#c6c6c7] text-[13px]">Período de locação</span>
            <span className="text-[#e3e2e5] font-medium text-[13px]">{period}</span>
          </div>
          <div className="flex justify-between items-center py-0.5">
            <span className="text-[#c6c6c7] text-[13px]">Método</span>
            <span className="text-[#e3e2e5] font-medium text-[13px] flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-[#d0f03b]">qr_code_2</span>
              Pix Automático
            </span>
          </div>
          <div className="flex justify-between items-center py-0.5">
            <span className="text-[#c6c6c7] text-[13px]">ID da Transação</span>
            <span className="text-[#e3e2e5] font-mono text-[12px] tracking-tight">{transactionId}</span>
          </div>
          <div className="flex justify-between items-center py-0.5">
            <span className="text-[#c6c6c7] text-[13px]">Veículo Vinculado</span>
            <span className="text-[#e3e2e5] font-medium text-[13px]">{vehicle}</span>
          </div>
        </div>

        {/* Toast note if copied */}
        {copied && (
          <div className="bg-[#12231A] text-[#4ADE80] text-[12px] px-3 py-1.5 rounded-lg text-center flex items-center justify-center gap-1.5 font-medium">
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
            Comprovante copiado para a área de transferência!
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-1">
          <button
            type="button"
            onClick={handleShare}
            className="flex-1 min-h-[48px] bg-[#181A1F] border border-[#2A2E37] text-[#e3e2e5] font-medium text-[14px] rounded-lg flex items-center justify-center gap-2 hover:bg-[#292a2c] transition-colors active:scale-95 cursor-pointer font-geist"
          >
            <span className="material-symbols-outlined text-[18px]">share</span>
            <span>Compartilhar</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 min-h-[48px] bg-white text-[#121315] font-semibold text-[14px] rounded-lg flex items-center justify-center transition-all active:scale-95 hover:bg-white/95 cursor-pointer font-geist shadow-md"
          >
            <span>Concluir</span>
          </button>
        </div>
      </div>
    </div>
  );
};
