import React from 'react';
import { Invoice } from '../../types';

interface OwnerHomeScreenProps {
  overdueInvoices: Invoice[];
  onSelectInvoice: (invoice: Invoice) => void;
  onNavigateToContas: () => void;
}

export const OwnerHomeScreen: React.FC<OwnerHomeScreenProps> = ({
  overdueInvoices,
  onSelectInvoice,
  onNavigateToContas,
}) => {
  return (
    <div className="flex flex-col w-full px-4 pt-20 pb-24 max-w-[430px] mx-auto select-none">
      {/* Sub-header & Daily Greeting */}
      <section className="flex flex-col pt-2 pb-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-[#c6c9ae] uppercase tracking-wider font-body">
              Segunda-feira, 03 nov
            </span>
            <h2 className="text-[26px] font-semibold text-white tracking-tight mt-0.5 font-geist">
              Visão geral do dia
            </h2>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#292a2c] border border-[#2A2E37]/60">
            <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse" />
            <span className="text-[11px] font-semibold text-white font-geist">
              Ao vivo
            </span>
          </div>
        </div>
      </section>

      {/* Key Metrics Row */}
      <section className="flex flex-col gap-2.5 pt-1 pb-5">
        {/* Metric 1: Recebido Hoje */}
        <div className="bg-[#181A1F] rounded-xl p-4 flex flex-col justify-between shadow-sm relative overflow-hidden border border-[#2A2E37]/80">
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-[#c6c6c7] font-body">Recebido hoje</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#12231A] text-[#4ADE80] text-[11px] font-semibold font-geist border border-[#4ADE80]/20">
              Liquidado
            </span>
          </div>
          <div className="flex items-baseline justify-between mt-2.5">
            <span className="text-[28px] font-semibold text-white tracking-tight font-geist tabular-nums">
              R$ 3.850,00
            </span>
            <span className="material-symbols-outlined text-[20px] text-[#4ADE80]">
              trending_up
            </span>
          </div>
        </div>

        {/* 2-Column Split for Projected & Overdue */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Metric 2: A receber */}
          <div className="bg-[#181A1F] rounded-xl p-3.5 flex flex-col justify-between shadow-sm border border-[#2A2E37]/80">
            <div className="flex items-center justify-between gap-1">
              <span className="text-[12px] text-[#c6c6c7] truncate font-body">A receber</span>
              <span className="px-2 py-0.5 rounded-full bg-[#141F2E] text-[#60A5FA] text-[10px] font-semibold whitespace-nowrap font-geist border border-[#60A5FA]/20">
                Previsto
              </span>
            </div>
            <div className="mt-3">
              <span className="text-[18px] font-semibold text-white block truncate font-geist tabular-nums">
                R$ 2.400,00
              </span>
              <span className="text-[11px] text-[#c6c6c7] mt-0.5 block font-body">
                Hoje
              </span>
            </div>
          </div>

          {/* Metric 3: Atrasado */}
          <div className="bg-[#181A1F] rounded-xl p-3.5 flex flex-col justify-between shadow-sm border border-[#2A2E37]/80">
            <div className="flex items-center justify-between gap-1">
              <span className="text-[12px] text-[#c6c6c7] truncate font-body">Atrasado</span>
              <span className="px-2 py-0.5 rounded-full bg-[#2E1517] text-[#F87171] text-[10px] font-semibold whitespace-nowrap font-geist border border-[#F87171]/20">
                Atrasado
              </span>
            </div>
            <div className="mt-3">
              <span className="text-[18px] font-semibold text-white block truncate font-geist tabular-nums">
                R$ 1.950,00
              </span>
              <span className="text-[11px] text-[#F87171] mt-0.5 block font-body font-medium">
                {overdueInvoices.length} faturas
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Overdue Charges Section */}
      <section className="flex flex-col pt-1">
        <div className="flex items-center justify-between pb-2 px-1">
          <div className="flex items-center gap-1.5">
            <h3 className="text-[16px] font-semibold text-white font-geist">
              Cobranças Atrasadas
            </h3>
            <span className="text-[13px] text-[#c6c6c7] font-medium font-body">
              ({overdueInvoices.length})
            </span>
          </div>
          <button
            type="button"
            onClick={onNavigateToContas}
            className="text-[12px] text-[#c6c6c7] hover:text-white transition-colors flex items-center gap-1 cursor-pointer font-body"
          >
            <span>Filtrar</span>
            <span className="material-symbols-outlined text-[16px]">tune</span>
          </button>
        </div>

        {/* Charges List */}
        <div className="bg-[#181A1F] rounded-xl overflow-hidden shadow-sm flex flex-col divide-y divide-[#1F2228] border border-[#2A2E37]/80">
          {overdueInvoices.map((inv) => (
            <div
              key={inv.id}
              onClick={() => onSelectInvoice(inv)}
              className="group flex items-center justify-between min-h-[58px] px-4 py-3 hover:bg-[#1F2228] active:bg-[#1F2228] transition-colors cursor-pointer select-none"
              role="button"
              tabIndex={0}
            >
              <div className="flex flex-col min-w-0 pr-3">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[14px] text-white font-medium truncate font-body">
                    {inv.clientName}
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-[#292a2c] text-[#e3e2e5] text-[10px] font-semibold tracking-wider uppercase font-mono">
                    {inv.plate}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#c6c6c7] font-body">
                  <span>Vencimento</span>
                  <span className="text-[#F87171] font-medium">{inv.dueDate}</span>
                  <span className="text-[#2A2E37]">•</span>
                  <span>{inv.type}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0 text-right">
                <div className="flex flex-col items-end">
                  <span className="text-[14px] text-white font-semibold font-geist tabular-nums">
                    {inv.amountFormatted}
                  </span>
                  <span className="text-[11px] text-[#c6c6c7] font-body">
                    {inv.overdueText || `${inv.daysLate} dias atrás`}
                  </span>
                </div>
                <span className="material-symbols-outlined text-[20px] text-[#c6c6c7] group-hover:text-white transition-colors">
                  chevron_right
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick action indicator */}
        <div className="flex items-center justify-between mt-3 px-2 py-1 text-[#c6c6c7]">
          <span className="text-[11px] flex items-center gap-1.5 font-body">
            <span className="material-symbols-outlined text-[16px] text-[#c6c6c7]">info</span>
            Toque na cobrança para detalhes em Contas
          </span>
          <span className="text-[11px] font-body">Somente leitura</span>
        </div>
      </section>

      {/* Empty State / Reassurance Banner */}
      <section className="mt-5 pt-1">
        <div className="bg-[#1b1c1e] rounded-xl p-4 flex items-center gap-3.5 border border-[#2A2E37]/60">
          <div className="w-10 h-10 rounded-full bg-[#292a2c] flex items-center justify-center flex-shrink-0">
            <span
              className="material-symbols-outlined text-[#c6c6c7] text-[22px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] text-white font-medium font-geist">
              Fluxo sob controle
            </span>
            <span className="text-[11px] text-[#c6c6c7] font-body leading-tight">
              Quando quitadas, as pendências desaparecem automaticamente.
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
