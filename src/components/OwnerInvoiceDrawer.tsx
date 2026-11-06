import React from 'react';
import { Invoice } from '../types';

interface OwnerInvoiceDrawerProps {
  invoice: Invoice | null;
  isOpen: boolean;
  onClose: () => void;
}

export const OwnerInvoiceDrawer: React.FC<OwnerInvoiceDrawerProps> = ({
  invoice,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !invoice) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm transition-opacity duration-300 flex items-end justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-[390px] bg-[#1F2228] rounded-t-2xl p-6 shadow-2xl flex flex-col gap-4 animate-in slide-in-from-bottom duration-300 border-t border-[#2A2E37]">
        {/* Drag Bar Cue */}
        <div className="w-12 h-1 bg-[#343537] rounded-full mx-auto -mt-2 mb-1" />

        {/* Drawer Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-medium uppercase tracking-wider text-[#c6c6c7] font-body">
                Detalhes da Cobrança
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-[#292a2c] text-[#c6c6c7] font-geist">
                <span className="material-symbols-outlined text-[13px]">visibility</span>
                Somente Leitura
              </span>
            </div>
            <h2 className="text-[22px] font-semibold text-white tracking-tight font-geist">
              {invoice.clientName}
            </h2>
          </div>
          <button
            type="button"
            aria-label="Fechar gaveta"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#181A1F] flex items-center justify-center text-[#c6c6c7] hover:text-white transition-colors cursor-pointer border border-[#2A2E37]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Detail Grid */}
        <div className="grid grid-cols-2 gap-3 bg-[#181A1F] p-4 rounded-xl shadow-sm border border-[#2A2E37]/60">
          <div>
            <span className="text-[11px] text-[#c6c6c7] block font-body">Contrato</span>
            <span className="text-[14px] text-white font-mono">{invoice.contractId}</span>
          </div>
          <div>
            <span className="text-[11px] text-[#c6c6c7] block font-body">Veículo / Placa</span>
            <span className="text-[14px] text-white font-mono font-medium">{invoice.plate}</span>
          </div>
          <div>
            <span className="text-[11px] text-[#c6c6c7] block font-body">Período de Locação</span>
            <span className="text-[13px] text-white">{invoice.period}</span>
          </div>
          <div>
            <span className="text-[11px] text-[#c6c6c7] block font-body">Vencimento</span>
            <span className="text-[13px] text-white font-medium">{invoice.dueDate}</span>
          </div>
          <div>
            <span className="text-[11px] text-[#c6c6c7] block font-body">Contato / Suporte</span>
            <span className="text-[13px] text-white font-mono">{invoice.phone || '(11) 98***-**42'}</span>
          </div>
          <div>
            <span className="text-[11px] text-[#c6c6c7] block font-body">Status / Atraso</span>
            {invoice.status === 'atrasada' ? (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#2E1517] text-[#F87171] mt-0.5 font-geist">
                {invoice.overdueText || 'Atrasada'}
              </span>
            ) : invoice.status === 'paga' ? (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#12231A] text-[#4ADE80] mt-0.5 font-geist">
                Liquidado
              </span>
            ) : (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#2A2415] text-[#FACC15] mt-0.5 font-geist">
                {invoice.overdueText || 'A vencer'}
              </span>
            )}
          </div>
        </div>

        {/* Value Card */}
        <div className="flex items-center justify-between p-4 bg-[#1f2022] rounded-xl border border-[#2A2E37]/60">
          <div className="flex flex-col">
            <span className="text-[11px] font-medium text-[#c6c6c7] uppercase tracking-wider font-body">
              Valor da Cobrança
            </span>
            <span className="text-[12px] text-[#c6c6c7]">Sem juros adicionais</span>
          </div>
          <span className="text-[24px] font-semibold text-white tracking-tight font-geist tabular-nums">
            {invoice.amountFormatted}
          </span>
        </div>

        {/* Warning Notice (Somente leitura sem baixa manual) */}
        <div className="flex items-start gap-2 bg-[#292a2c]/60 p-3 rounded-lg text-[#c6c6c7] border border-[#2A2E37]">
          <span className="material-symbols-outlined text-[16px] text-[#d0f03b] mt-0.5 shrink-0">lock</span>
          <p className="text-[12px] leading-tight text-[#c6c6c7]">
            Cobrança vinculada à rotina automática. Baixas manuais desabilitadas para proprietários.
          </p>
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="w-full py-3 px-4 rounded-xl bg-[#292a2c] hover:bg-[#343537] text-white font-medium text-[14px] transition-colors cursor-pointer flex items-center justify-center gap-2 active:scale-98 font-geist"
        >
          <span>Fechar</span>
        </button>
      </div>
    </div>
  );
};
